import { NpsInfiniteAutoComplete } from "@namphuongtechnologi/nps-ui";
import { ComponentDoc } from "../../../components/docs/ComponentDoc";
import type { ExampleConfig, ApiProp } from "../../../components/docs/types";
import { useTranslation } from "react-i18next";
import { SEO } from "../../../components/docs/SEO";
import { mockQueryFn } from "../../../config/mockData";

export function InfiniteAutoCompletePage() {
  const { t } = useTranslation("infiniteAutoComplete");

  const examples: ExampleConfig[] = [
    {
      id: "ex-basic",
      title: t("examples.basic.title"),
      desc: t("examples.basic.desc"),
      preview: (
        <NpsInfiniteAutoComplete
          queryKey={["components-list"]}
          queryFn={mockQueryFn}
          placeholder="Chọn component..."
          style={{ width: "100%", maxWidth: 320 }}
        />
      ),
      code: `import { NpsInfiniteAutoComplete } from "@namphuongtechnologi/nps-ui";

// Hàm gọi API thực tế của bạn
const fetchItems = async ({ keyword, pageIndex, pageSize }) => {
  const response = await fetch(\`/api/items?keyword=\${keyword}&pageIndex=\${pageIndex}&pageSize=\${pageSize}\`);
  return response.json();
};

export default function Demo() {
  return (
    <NpsInfiniteAutoComplete
      queryKey={["items-list"]}
      queryFn={fetchItems}
      placeholder="Tìm kiếm và chọn..."
      style={{ width: 300 }}
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
      property: "editId",
      type: "string | number | (string | number)[]",
      description: t("api.editId"),
    },
    {
      property: "getEditQueryParams",
      type: "(editId: string | number | (string | number)[]) => NpsBaseSchema",
      default: "editId => (Array.isArray(editId) ? { ids: editId, pageIndex: 1, pageSize: editId.length } : { keyword: String(editId), pageIndex: 1, pageSize: 1 })",
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
      <SEO title="InfiniteAutoComplete" description={t("description")} />
      <ComponentDoc
        title="InfiniteAutoComplete"
        version="0.0.1"
        description={t("description")}
        importSnippet={`import { NpsInfiniteAutoComplete } from "@namphuongtechnologi/nps-ui";`}
        whenToUse={t("whenToUse.items", { returnObjects: true }) as string[]}
        examples={examples}
        customApiData={customApiData}
        antdDocLink="https://ant.design/components/select"
      />
    </>
  );
}

export const infiniteAutoCompleteAnchorItems = [
  { key: "ex-basic", href: "#ex-basic", title: "Basic" },
  { key: "api", href: "#api", title: "API" },
];
