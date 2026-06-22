import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Divider, Spin, TreeSelect, Typography } from "antd";
import type { TreeSelectProps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { NpsInfiniteTreeSelectProps } from "./types";

type TreeDataType = NonNullable<TreeSelectProps['treeData']>[number];

const { Text } = Typography;

const uniqBy = <I,>(arr: I[], keyGetter: (item: I) => unknown): I[] => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keyGetter(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const extractValues = (val: unknown): (string | number)[] => {
  if (val === undefined || val === null) return [];
  if (Array.isArray(val)) {
    return val.flatMap(extractValues);
  }
  if (typeof val === "object") {
    const valObj = val as Record<string, unknown>;
    if (
      "value" in valObj &&
      (typeof valObj.value === "string" || typeof valObj.value === "number")
    ) {
      return [valObj.value];
    }
  }
  return [val as string | number];
};


/**
 * Component NpsInfiniteTreeSelect
 * Ô chọn dạng cây phân cấp (Tree Select) với tính năng cuộn vô hạn, được xây dựng trên TreeSelect của Ant Design và TanStack Query.
 */
export function NpsInfiniteTreeSelect<T>({
  queryKey,
  queryFn,
  pageSize = 20,
  getResponse = (response: unknown) => {
    const resObj = response as Record<string, unknown>;
    return (resObj?.data ?? (Array.isArray(response) ? response : [])) as T[];
  },
  getTotalRecord = (response: unknown) => {
    const resObj = response as Record<string, unknown>;
    return Number(resObj?.TotalRecord ?? resObj?.totalRecord ?? 0);
  },
  getLabel = (item: T) => {
    const itemObj = item as Record<string, unknown>;
    return String(itemObj?.label ?? itemObj?.name ?? "");
  },
  getValue = (item: T) => {
    const itemObj = item as Record<string, unknown>;
    return (itemObj?.value ?? itemObj?.id ?? "") as string | number;
  },
  getChildren = (item: T) => {
    const itemObj = item as Record<string, unknown>;
    return itemObj?.children as T[] | undefined;
  },
  editId,
  getEditQueryParams = (id) => {
    if (Array.isArray(id)) {
      return { ids: id, pageIndex: 1, pageSize: id.length };
    }
    return { keyword: String(id), pageIndex: 1, pageSize: 1 };
  },
  getEditResponse,
  defaultItems = [],
  setFlatData,
  debounceTime = 300,
  value,
  onChange,
  ...props
}: NpsInfiniteTreeSelectProps<T>) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, debounceTime);

  // State cục bộ lưu lại các item đã được chọn (để giữ lại nhãn hiển thị khi lọc/phân trang)
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  // Hàm xử lý parse dữ liệu cho chế độ edit
  const resolveEditResponse = getEditResponse || getResponse;

  // 1. Query lấy dữ liệu khi edit (khi truyền editId và cần hiển thị giá trị ban đầu)
  const editQuery = useQuery({
    queryKey: [...(queryKey || []), "edit", editId],
    queryFn: async ({ signal }) => {
      if (!queryFn) return [];
      const response = await queryFn(getEditQueryParams(editId!), { signal });
      const data = resolveEditResponse(response);
      return Array.isArray(data) ? data : [];
    },
    enabled:
      !!queryFn &&
      editId !== undefined &&
      editId !== null &&
      (Array.isArray(editId) ? editId.length > 0 : true),
  });

  // 2. Query vô hạn dùng để load dữ liệu phân trang theo vị trí cuộn
  const infiniteQuery = useInfiniteQuery({
    queryKey: [...(queryKey || []), "list", debouncedSearch, pageSize],
    queryFn: async ({ signal, pageParam = 1 }) => {
      if (!queryFn) return { data: [], totalRecord: 0 };
      const response = await queryFn(
        {
          keyword: debouncedSearch || undefined,
          pageIndex: pageParam as number,
          pageSize,
        },
        { signal }
      );
      const data = getResponse(response);
      const totalRecord = getTotalRecord(response) || 0;
      return {
        data: Array.isArray(data) ? data : [],
        totalRecord,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalRecords = lastPage.totalRecord || 0;
      const currentRecords = allPages.reduce(
        (total, page) => total + (page.data?.length || 0),
        0
      );
      return currentRecords < totalRecords ? allPages.length + 1 : undefined;
    },
    enabled: !!queryFn,
  });

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = infiniteQuery;

  // Dàn phẳng dữ liệu từ các trang đã fetch
  const flatData = useMemo(() => {
    return infiniteData?.pages.flatMap((page) => page.data || []) || [];
  }, [infiniteData]);

  // Đồng bộ dữ liệu flat đã tải ngược về component cha nếu có callback
  useEffect(() => {
    if (setFlatData) {
      setFlatData(flatData);
    }
  }, [flatData, setFlatData]);

  // Hàm đệ quy thu thập tất cả các nodes (bao gồm cả children) thành một danh sách phẳng
  // để so khớp và lấy ra item được chọn từ bất cứ cấp nào trong cây.
  const flattenTreeItems = useCallback(
    (items: T[]): T[] => {
      const result: T[] = [];
      const traverse = (nodes: T[]) => {
        for (const node of nodes) {
          result.push(node);
          const childs = getChildren(node);
          if (Array.isArray(childs) && childs.length > 0) {
            traverse(childs);
          }
        }
      };
      traverse(items);
      return result;
    },
    [getChildren]
  );

  // Đồng bộ và đưa các item đang được chọn vào state selectedItems dựa trên value hoặc editId
  useEffect(() => {
    const currentValues = extractValues(value);
    const editValues = extractValues(editId);
    const lookupValues = uniqBy([...currentValues, ...editValues], (v) => v);

    setSelectedItems((prev) => {
      // Lọc bỏ những phần tử không còn nằm trong tập giá trị hiện tại
      const filtered = prev.filter((item) => lookupValues.includes(getValue(item)));

      const allAvailable = flattenTreeItems([
        ...flatData,
        ...(editQuery.data || []),
      ]);

      const matching = allAvailable.filter((item) => {
        const itemVal = getValue(item);
        return lookupValues.includes(itemVal);
      });

      const merged = [...filtered, ...matching];
      return uniqBy(merged, getValue);
    });
  }, [flatData, editQuery.data, value, editId, getValue, flattenTreeItems]);

  // Hàm đệ quy map từ kiểu T sang dạng TreeDataNode của Ant Design
  const mapToTreeData = useCallback(
    (items: T[]): TreeDataType[] => {
      return items.map((item) => {
        const val = getValue(item);
        const label = getLabel(item);
        const childrenRaw = getChildren(item);
        const childrenMapped = Array.isArray(childrenRaw)
          ? mapToTreeData(childrenRaw)
          : undefined;

        return {
          value: val,
          title: label,
          label: label,
          children: childrenMapped,
          dataRef: item,
        };
      });
    },
    [getValue, getLabel, getChildren]
  );

  // Xây dựng danh sách treeData cho TreeSelect component
  const treeData = useMemo(() => {
    const allRawData = [
      ...selectedItems,
      ...(editQuery.data || []),
      ...flatData,
    ];

    // Thu thập tất cả các ID node con (descendants) để lọc bỏ chúng khỏi cấp ngoài cùng
    const descendantIds = new Set<string | number>();
    const collectDescendantIds = (items: T[]) => {
      for (const item of items) {
        const childs = getChildren(item);
        if (Array.isArray(childs) && childs.length > 0) {
          for (const child of childs) {
            descendantIds.add(getValue(child));
          }
          collectDescendantIds(childs);
        }
      }
    };
    collectDescendantIds(allRawData);

    // Chỉ giữ lại những node không phải là con của bất kỳ node nào khác trong danh sách gốc
    const rootRawData = allRawData.filter((item) => !descendantIds.has(getValue(item)));

    const mapped = mapToTreeData(rootRawData);
    const uniqOptions = uniqBy(mapped, (opt) => opt.value);

    // Thêm các defaultItems vào đầu danh sách nếu ô tìm kiếm trống
    if (!debouncedSearch && defaultItems && defaultItems.length > 0) {
      const mappedDefault: TreeDataType[] = defaultItems.map((item) => ({
        value: item.value,
        title: item.label,
        label: item.label,
      }));
      return uniqBy([...mappedDefault, ...uniqOptions], (opt) => opt.value);
    }

    return uniqOptions;
  }, [
    selectedItems,
    editQuery.data,
    flatData,
    mapToTreeData,
    debouncedSearch,
    defaultItems,
    getChildren,
    getValue,
  ]);

  // Xử lý khi thay đổi giá trị hoặc chọn node trong cây
  const handleChange = (
    val: unknown,
    labelList: ReactNode[],
    extra: Parameters<NonNullable<TreeSelectProps['onChange']>>[2]
  ) => {
    let newSelected: T[] = [];
    if (extra) {
      const extraObj = extra as unknown as Record<string, unknown>;
      if (Array.isArray(extraObj.allCheckedNodes)) {
        newSelected = extraObj.allCheckedNodes
          .map((n) => {
            const node = (n as Record<string, unknown>)?.node as Record<string, unknown> | undefined;
            const props = node?.props as Record<string, unknown> | undefined;
            return (node?.dataRef || props?.dataRef) as T | undefined;
          })
          .filter(Boolean) as T[];
      } else {
        const triggerNode = extraObj.triggerNode as Record<string, unknown> | undefined;
        const triggerProps = triggerNode?.props as Record<string, unknown> | undefined;
        if (triggerProps?.dataRef) {
          newSelected = [triggerProps.dataRef as T];
        } else if (triggerNode?.dataRef) {
          newSelected = [triggerNode.dataRef as T];
        }
      }
    }

    if (newSelected.length > 0) {
      setSelectedItems((prev) => {
        const merged = [...prev, ...newSelected];
        return uniqBy(merged, getValue);
      });
    }

    if (onChange) {
      onChange(val, labelList, extra);
    }
  };

  const handleSearch = (searchText: string) => {
    setSearchValue(searchText);
  };

  const handlePopupScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { target } = e;
      const element = target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = element;

      // Kích hoạt fetch trang tiếp theo khi cuộn gần đến cuối danh sách (cách đáy 50px)
      if (
        scrollHeight - scrollTop <= clientHeight + 50 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const dropdownRender = useCallback(
    (menu: React.ReactElement) => (
      <div>
        {menu}
        <PopupFooter
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          hasData={flatData.length > 0}
        />
      </div>
    ),
    [hasNextPage, isFetchingNextPage, flatData]
  );

  const isInitialLoading = isFetching && flatData.length === 0;

  return (
    <TreeSelect
      showSearch
      filterTreeNode={false}
      {...props}
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      treeData={treeData}
      dropdownRender={dropdownRender}
      onPopupScroll={handlePopupScroll}
      notFoundContent={
        isInitialLoading ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <Spin size="small" />
            <Text type="secondary" className="text-xs">
              Đang tải dữ liệu...
            </Text>
          </div>
        ) : (
          props.notFoundContent
        )
      }
    />
  );
}

NpsInfiniteTreeSelect.SHOW_PARENT = TreeSelect.SHOW_PARENT;
NpsInfiniteTreeSelect.SHOW_ALL = TreeSelect.SHOW_ALL;
NpsInfiniteTreeSelect.SHOW_CHILD = TreeSelect.SHOW_CHILD;

interface PopupFooterProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  hasData: boolean;
}

function PopupFooter({
  isFetchingNextPage,
  hasNextPage,
  hasData,
}: PopupFooterProps) {
  if (isFetchingNextPage) {
    return (
      <>
        <Divider className="my-1" style={{ margin: "4px 0" }} />
        <div className="flex flex-col items-center gap-1 py-2 text-center">
          <Spin size="small" />
          <Text type="secondary" style={{ fontSize: "11px" }}>
            Đang tải thêm...
          </Text>
        </div>
      </>
    );
  }

  if (hasNextPage && hasData) {
    return (
      <>
        <Divider className="my-1" style={{ margin: "4px 0" }} />
        <div className="py-1 text-center">
          <Text type="secondary" style={{ fontSize: "11px", display: "block" }}>
            Cuộn xuống để tải thêm
          </Text>
        </div>
      </>
    );
  }

  return null;
}
