import { NpsInfiniteTreeSelect } from "@namphuongtechnologi/nps-ui";
import { ComponentDoc } from "../../../components/docs/ComponentDoc";
import type { ExampleConfig, ApiProp } from "../../../components/docs/types";
import { useTranslation } from "react-i18next";
import { SEO } from "../../../components/docs/SEO";

interface MockTreeNode {
  id: string;
  name: string;
  children?: MockTreeNode[];
}

// Generate some mock hierarchical tree data (40 root items)
const mockTreeDatabase: MockTreeNode[] = Array.from({ length: 40 }, (_, i) => {
  const rootId = `root-${i + 1}`;
  return {
    id: rootId,
    name: `Node Gốc ${i + 1} (Root)`,
    children: [
      {
        id: `${rootId}-child-1`,
        name: `Node Con ${i + 1}.1`,
        children: [
          {
            id: `${rootId}-child-1-sub-1`,
            name: `Node Cháu ${i + 1}.1.1`,
          },
          {
            id: `${rootId}-child-1-sub-2`,
            name: `Node Cháu ${i + 1}.1.2`,
          },
        ],
      },
      {
        id: `${rootId}-child-2`,
        name: `Node Con ${i + 1}.2`,
      },
    ],
  };
});

// Mock pagination tree query function
const mockTreeQueryFn = async (
  params: { keyword?: string; pageIndex?: number; pageSize?: number },
  options?: { signal?: AbortSignal }
) => {
  // Simulating latency
  await new Promise((resolve) => {
    if (options?.signal?.aborted) return;
    const timer = setTimeout(resolve, 500);
    options?.signal?.addEventListener("abort", () => {
      clearTimeout(timer);
    });
  });

  const { keyword = "", pageIndex = 1, pageSize = 10 } = params;

  // Filter root items by search keyword (match roots, children or grandchildren)
  const filtered = mockTreeDatabase.filter((item) => {
    const matchRoot = item.name.toLowerCase().includes(keyword.toLowerCase());
    const matchChild = item.children?.some(
      (c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase()) ||
        c.children?.some((sub) =>
          sub.name.toLowerCase().includes(keyword.toLowerCase())
        )
    );
    return matchRoot || matchChild;
  });

  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;
  const data = filtered.slice(start, end);

  return {
    data,
    totalRecord: filtered.length,
  };
};

export function InfiniteTreeSelectPage() {
  const { t } = useTranslation("infiniteTreeSelect");

  const examples: ExampleConfig[] = [
    {
      id: "ex-basic",
      title: t("examples.basic.title"),
      desc: t("examples.basic.desc"),
      preview: (
        <NpsInfiniteTreeSelect
          queryKey={["tree-select-basic"]}
          queryFn={mockTreeQueryFn}
          pageSize={10}
          placeholder="Chọn mục từ cấu trúc cây..."
          style={{ width: "100%", maxWidth: 320 }}
          allowClear
          treeDefaultExpandAll
        />
      ),
      code: `import { NpsInfiniteTreeSelect } from "@namphuongtechnologi/nps-ui";

// Hàm fetch API của bạn
const fetchTreeData = async ({ keyword, pageIndex, pageSize }) => {
  const response = await fetch(
    \`/api/categories?keyword=\${keyword}&pageIndex=\${pageIndex}&pageSize=\${pageSize}\`
  );
  return response.json();
};

export default function Demo() {
  return (
    <NpsInfiniteTreeSelect
      queryKey={["tree-categories"]}
      queryFn={fetchTreeData}
      pageSize={10}
      placeholder="Chọn danh mục..."
      style={{ width: 300 }}
      allowClear
    />
  );
}`,
    },
    {
      id: "ex-check-tree",
      title: t("examples.checkTree.title"),
      desc: t("examples.checkTree.desc"),
      preview: (
        <NpsInfiniteTreeSelect
          queryKey={["tree-select-checkbox"]}
          queryFn={mockTreeQueryFn}
          pageSize={10}
          placeholder="Chọn nhiều mục..."
          style={{ width: "100%", maxWidth: 400 }}
          treeCheckable
          showCheckedStrategy={NpsInfiniteTreeSelect.SHOW_PARENT}
          allowClear
          treeDefaultExpandAll
        />
      ),
      code: `import { NpsInfiniteTreeSelect } from "@namphuongtechnologi/nps-ui";

export default function CheckboxDemo() {
  return (
    <NpsInfiniteTreeSelect
      queryKey={["tree-categories-multi"]}
      queryFn={fetchTreeData}
      pageSize={10}
      placeholder="Chọn nhiều danh mục..."
      style={{ width: 400 }}
      treeCheckable
      showCheckedStrategy={NpsInfiniteTreeSelect.SHOW_PARENT}
      allowClear
    />
  );
}`,
    },
  ];

  const customApiData: ApiProp[] = [
    {
      property: "queryKey",
      type: "unknown[]",
      required: true,
      description: t("api.queryKey"),
    },
    {
      property: "queryFn",
      type: "(params: NpsBaseSchema, options?: { signal?: AbortSignal }) => Promise<unknown>",
      required: true,
      description: t("api.queryFn"),
    },
    {
      property: "pageSize",
      type: "number",
      default: "20",
      description: t("api.pageSize"),
    },
    {
      property: "getResponse",
      type: "(response: unknown) => T[]",
      default: "(response) => response.data",
      description: t("api.getResponse"),
    },
    {
      property: "getTotalRecord",
      type: "(response: unknown) => number",
      default: "(response) => response.TotalRecord || response.totalRecord || 0",
      description: t("api.getTotalRecord"),
    },
    {
      property: "getLabel",
      type: "(item: T) => ReactNode",
      default: 'item => String(item.label || item.name || "")',
      description: t("api.getLabel"),
    },
    {
      property: "getValue",
      type: "(item: T) => string | number",
      default: 'item => String(item.value || item.id || "")',
      description: t("api.getValue"),
    },
    {
      property: "getChildren",
      type: "(item: T) => T[] | undefined",
      default: 'item => item.children',
      description: t("api.getChildren"),
    },
    {
      property: "editId",
      type: "string | number | (string | number)[]",
      description: t("api.editId"),
    },
    {
      property: "getEditQueryParams",
      type: "(editId: string | number | (string | number)[]) => NpsBaseSchema",
      default:
        "editId => (Array.isArray(editId) ? { ids: editId, pageIndex: 1, pageSize: editId.length } : { keyword: String(editId), pageIndex: 1, pageSize: 1 })",
      description: t("api.getEditQueryParams"),
    },
    {
      property: "getEditResponse",
      type: "(response: unknown) => T[]",
      default: "response => response.data || response",
      description: t("api.getEditResponse"),
    },
    {
      property: "defaultItems",
      type: "{ label: ReactNode; value: string | number }[]",
      default: "[]",
      description: t("api.defaultItems"),
    },
    {
      property: "setFlatData",
      type: "(data: T[]) => void",
      description: t("api.setFlatData"),
    },
    {
      property: "debounceTime",
      type: "number",
      default: "300",
      description: t("api.debounceTime"),
    },
  ];

  return (
    <>
      <SEO title="InfiniteTreeSelect" description={t("description")} />
      <ComponentDoc
        title="InfiniteTreeSelect"
        version="0.0.1"
        description={t("description")}
        importSnippet={`import { NpsInfiniteTreeSelect } from "@namphuongtechnologi/nps-ui";`}
        whenToUse={t("whenToUse.items", { returnObjects: true }) as string[]}
        examples={examples}
        customApiData={customApiData}
        antdDocLink="https://ant.design/components/tree-select"
      />
    </>
  );
}

export const infiniteTreeSelectAnchorItems = [
  { key: "ex-basic", href: "#ex-basic", title: "Basic" },
  { key: "ex-check-tree", href: "#ex-check-tree", title: "Check Tree" },
  { key: "api", href: "#api", title: "API" },
];
