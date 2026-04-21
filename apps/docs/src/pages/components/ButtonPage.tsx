import { Space, Typography } from "antd";
import { NpsButton } from "nps-ui";
import {
  ComponentDoc,
  generateAnchors,
  type ExampleConfig,
} from "../../components/docs/ComponentDoc";
import type { ApiProp } from "../../components/docs/ApiTable";

// ─── Examples Config ──────────────────────────────────────────
const examples: ExampleConfig[] = [
  {
    id: "ex-basic",
    title: "Basic",
    desc: "Năm kiểu button cơ bản: primary, default, dashed, text, và link.",
    preview: (
      <Space wrap size={[12, 12]}>
        <NpsButton type="primary">Primary</NpsButton>
        <NpsButton>Default</NpsButton>
        <NpsButton type="dashed">Dashed</NpsButton>
        <NpsButton type="text">Text</NpsButton>
        <NpsButton type="link">Link</NpsButton>
      </Space>
    ),
    code: `<NpsButton type="primary">Primary</NpsButton>
<NpsButton>Default</NpsButton>
<NpsButton type="dashed">Dashed</NpsButton>
<NpsButton type="text">Text</NpsButton>
<NpsButton type="link">Link</NpsButton>`,
  },
  {
    id: "ex-rounded",
    title: "Rounded Full",
    desc: 'Prop mở rộng riêng của NpsButton. Thêm rounded="full" để bo tròn hoàn toàn.',
    preview: (
      <Space wrap size={[12, 12]}>
        <NpsButton type="primary" rounded="full">
          Primary
        </NpsButton>
        <NpsButton rounded="full">Default</NpsButton>
        <NpsButton type="dashed" rounded="full">
          Dashed
        </NpsButton>
      </Space>
    ),
    code: `<NpsButton type="primary" rounded="full">Primary</NpsButton>
<NpsButton rounded="full">Default</NpsButton>
<NpsButton type="dashed" rounded="full">Dashed</NpsButton>`,
  },
  {
    id: "ex-danger",
    title: "Danger",
    desc: "Dùng danger để biểu thị hành động có tính phá huỷ. Kết hợp được với mọi type.",
    preview: (
      <Space wrap size={[12, 12]}>
        <NpsButton type="primary" danger>
          Primary Danger
        </NpsButton>
        <NpsButton danger>Default Danger</NpsButton>
      </Space>
    ),
    code: `<NpsButton type="primary" danger>Primary Danger</NpsButton>
<NpsButton danger>Default Danger</NpsButton>`,
  },
  {
    id: "ex-size",
    title: "Sizes",
    desc: "Ba kích thước: large, default (middle), và small.",
    preview: (
      <Space wrap align="center" size={[12, 12]}>
        <NpsButton type="primary" size="large">
          Large
        </NpsButton>
        <NpsButton type="primary">Default</NpsButton>
        <NpsButton type="primary" size="small">
          Small
        </NpsButton>
      </Space>
    ),
    code: `<NpsButton type="primary" size="large">Large</NpsButton>
<NpsButton type="primary">Default</NpsButton>
<NpsButton type="primary" size="small">Small</NpsButton>`,
  },
  {
    id: "ex-loading",
    title: "Loading State",
    desc: "Thêm loading để hiển thị spinner và vô hiệu hóa click.",
    preview: (
      <Space wrap size={[12, 12]}>
        <NpsButton type="primary" loading>
          Loading
        </NpsButton>
        <NpsButton loading>Loading</NpsButton>
      </Space>
    ),
    code: `<NpsButton type="primary" loading>Loading</NpsButton>
<NpsButton loading>Loading</NpsButton>`,
  },
];

// ─── API Config ───────────────────────────────────────────────
const customApiData: ApiProp[] = [
  {
    property: "rounded",
    description: "Bo tròn hoàn toàn button (pill shape).",
    type: '"default" | "md" | "lg" | "full"',
    default: '"default"',
    version: "0.1.0",
  },
];

// ─── Anchor & Page ───────────────────────────────────────────
export const buttonAnchorItems = generateAnchors(examples);

export function ButtonPage() {
  return (
    <ComponentDoc
      title="Button"
      version="0.1.0"
      description={
        <>
          <Typography.Text code>NpsButton</Typography.Text> là wrapper mỏng trên{" "}
          <Typography.Text code>Button</Typography.Text> của Ant Design.
          Component kế thừa gần như toàn bộ{" "}
          <Typography.Text code>ButtonProps</Typography.Text>.
        </>
      }
      importSnippet={`import { NpsButton } from "@namphuongtechnologi/nps-ui";`}
      whenToUse={[
        "Khi cần trigger một hành động hoặc sự kiện.",
        "Sử dụng type primary cho hành động chính và default cho hành động phụ.",
        "Dùng danger cho các thao tác có tính phá hủy (xóa, reset...).",
      ]}
      examples={examples}
      customApiData={customApiData}
      antdDocLink="https://ant.design/components/button#api"
    />
  );
}
