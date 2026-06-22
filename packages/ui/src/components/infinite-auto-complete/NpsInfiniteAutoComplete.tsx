import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Divider, Select, Spin, Typography } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { NpsInfiniteAutoCompleteProps } from "./types";

const { Text } = Typography;

// Hàm helper để loại bỏ phần tử trùng lặp theo một key
const uniqBy = <I,>(arr: I[], keyGetter: (item: I) => unknown): I[] => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keyGetter(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/**
 * Component NpsInfiniteAutoComplete
 * Ô chọn tự động gợi ý với tính năng cuộn vô hạn, xây dựng trên Select của Ant Design và TanStack Query.
 */
export function NpsInfiniteAutoComplete<T>({
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
}: NpsInfiniteAutoCompleteProps<T>) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, debounceTime);

  // State cục bộ lưu lại các item đã được chọn (để giữ lại nhãn/label hiển thị ngay cả khi chuyển trang hoặc tìm kiếm)
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  // Hàm xử lý parse dữ liệu cho chế độ edit, mặc định dùng getResponse nếu không được truyền
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
    enabled: !!queryFn && editId !== undefined && editId !== null && (Array.isArray(editId) ? editId.length > 0 : true),
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
      const currentRecords = allPages.reduce((total, page) => total + (page.data?.length || 0), 0);
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

  // Dàn phẳng (flatten) dữ liệu từ các trang đã fetch thành một mảng duy nhất
  const flatData = useMemo(() => {
    return infiniteData?.pages.flatMap((page) => page.data || []) || [];
  }, [infiniteData]);

  // Đồng bộ dữ liệu flat đã tải ngược về component cha nếu có callback
  useEffect(() => {
    if (setFlatData) {
      setFlatData(flatData);
    }
  }, [flatData, setFlatData]);

  // Đồng bộ và đưa các item đang được chọn vào state selectedItems dựa trên value hoặc editId
  useEffect(() => {
    const currentValues = Array.isArray(value)
      ? value
      : value !== undefined && value !== null
        ? [value]
        : [];

    const editValues = Array.isArray(editId)
      ? editId
      : editId !== undefined && editId !== null
        ? [editId]
        : [];

    const lookupValues = uniqBy([...currentValues, ...editValues], (v) => v);
    if (lookupValues.length === 0) return;

    const allAvailable = [...flatData, ...(editQuery.data || [])];
    const matching = allAvailable.filter((item) => {
      const itemVal = getValue(item);
      return lookupValues.includes(itemVal);
    });

    if (matching.length > 0) {
      setSelectedItems((prev) => {
        const merged = [...prev, ...matching];
        return uniqBy(merged, getValue);
      });
    }
  }, [flatData, editQuery.data, value, editId, getValue]);

  // Xây dựng danh sách options cho Select component
  const options = useMemo(() => {
    const allRawData = [
      ...selectedItems,
      ...(editQuery.data || []),
      ...flatData,
    ];

    const mapped = allRawData.map((item) => ({
      label: getLabel(item),
      value: getValue(item),
      dataRef: item, // Giữ lại tham chiếu dữ liệu gốc cho callback
    }));

    const uniqOptions = uniqBy(mapped, (opt) => opt.value);

    // Thêm các defaultItems vào đầu danh sách nếu không có từ khóa tìm kiếm
    if (!debouncedSearch && defaultItems && defaultItems.length > 0) {
      return uniqBy([...defaultItems, ...uniqOptions], (opt) => opt.value);
    }

    return uniqOptions;
  }, [selectedItems, editQuery.data, flatData, getLabel, getValue, debouncedSearch, defaultItems]);

  // Xử lý sự kiện khi thay đổi giá trị hoặc chọn option
  const handleChange = (val: unknown, option?: DefaultOptionType | DefaultOptionType[]) => {
    if (option) {
      const optionsArray = Array.isArray(option) ? option : [option];
      const newSelected = optionsArray
        .map((opt) => (opt as Record<string, unknown>).dataRef)
        .filter(Boolean) as T[];

      if (newSelected.length > 0) {
        setSelectedItems((prev) => {
          const merged = [...prev, ...newSelected];
          return uniqBy(merged, getValue);
        });
      }
    }

    if (onChange) {
      onChange(val, option);
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

      // Tự động load trang tiếp theo khi cuộn gần đến cuối danh sách (cách đáy 50px)
      if (scrollHeight - scrollTop <= clientHeight + 50 && hasNextPage && !isFetchingNextPage) {
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
    <Select
      showSearch
      filterOption={false}
      {...props}
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      options={options}
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

interface PopupFooterProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  hasData: boolean;
}

function PopupFooter({ isFetchingNextPage, hasNextPage, hasData }: PopupFooterProps) {
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
