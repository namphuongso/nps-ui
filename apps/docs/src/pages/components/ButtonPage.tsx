import type { ReactNode } from "react";
import { Divider, Space, Tag, Typography } from "antd";
import { NpsButton } from "nps-ui";
import { CodeBlock } from "../../components/docs/CodeBlock";
import { ApiTable, type ApiProp } from "../../components/docs/ApiTable";
import type { DocsAnchorItem } from "../../components/docs/DocsLayout";

const { Title, Paragraph, Text } = Typography;

// ─── Code snippets ────────────────────────────────────────────
const importSnippet = `import { NpsButton } from "@namphuongtechnologi/nps-ui";`;

const basicSnippet = `<NpsButton type="primary">Primary</NpsButton>
<NpsButton>Default</NpsButton>
<NpsButton type="dashed">Dashed</NpsButton>
<NpsButton type="text">Text</NpsButton>
<NpsButton type="link">Link</NpsButton>`;

const roundedSnippet = `<NpsButton type="primary" rounded="full">Primary</NpsButton>
<NpsButton rounded="full">Default</NpsButton>
<NpsButton type="dashed" rounded="full">Dashed</NpsButton>`;

const dangerSnippet = `<NpsButton type="primary" danger>Primary Danger</NpsButton>
<NpsButton danger>Default Danger</NpsButton>
<NpsButton type="dashed" danger>Dashed Danger</NpsButton>
<NpsButton type="text" danger>Text Danger</NpsButton>`;

const sizeSnippet = `<NpsButton type="primary" size="large">Large</NpsButton>
<NpsButton type="primary">Default</NpsButton>
<NpsButton type="primary" size="small">Small</NpsButton>`;

const loadingSnippet = `<NpsButton type="primary" loading>Loading</NpsButton>
<NpsButton loading>Loading</NpsButton>`;

const disabledSnippet = `<NpsButton type="primary" disabled>Primary (Disabled)</NpsButton>
<NpsButton disabled>Default (Disabled)</NpsButton>
<NpsButton type="dashed" disabled>Dashed (Disabled)</NpsButton>`;

const blockSnippet = `<NpsButton type="primary" block>Block Button</NpsButton>
<NpsButton block>Block Button</NpsButton>`;

// ─── API Table: chỉ props riêng của NPS UI ───────────────────
// Chỉ document props NPS UI tự thêm vào — không lặp lại Ant Design
const customApiData: ApiProp[] = [
  {
    property: "rounded",
    description:
      "Bo tròn hoàn toàn button (pill shape). Dùng twMerge để merge an toàn với className khác.",
    type: '"default" | "md" | "lg" | "full"',
    default: '"default"',
    version: "0.1.0",
  },
];

// ─── Anchor ────────────────────────────────────────────────────
export const buttonAnchorItems: DocsAnchorItem[] = [
  { key: "overview", href: "#overview", title: "Overview" },
  { key: "when-to-use", href: "#when-to-use", title: "When to Use" },
  { key: "examples", href: "#examples", title: "Examples" },
  { key: "ex-basic", href: "#ex-basic", title: "· Basic" },
  { key: "ex-rounded", href: "#ex-rounded", title: "· Rounded" },
  { key: "ex-danger", href: "#ex-danger", title: "· Danger" },
  { key: "ex-size", href: "#ex-size", title: "· Sizes" },
  { key: "ex-loading", href: "#ex-loading", title: "· Loading" },
  { key: "ex-disabled", href: "#ex-disabled", title: "· Disabled" },
  { key: "api", href: "#api", title: "API" },
];

// ─── Example Card ──────────────────────────────────────────────
function ExampleCard({
  id,
  title,
  desc,
  preview,
  code,
  lang = "tsx",
}: {
  id: string;
  title: string;
  desc: string;
  preview: ReactNode;
  code: string;
  lang?: string;
}) {
  return (
    <section id={id} className="docs-section">
      <Title
        level={3}
        style={{ fontSize: 16, marginBottom: 4, marginTop: 0, fontWeight: 600 }}
      >
        {title}
      </Title>
      <Paragraph style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
        {desc}
      </Paragraph>
      <div className="docs-example-card">
        <div className="docs-preview-surface">{preview}</div>
        <div className="docs-example-code">
          <CodeBlock code={code} lang={lang} />
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export function ButtonPage() {
  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview" className="docs-section">
        <div className="flex items-center gap-3 mb-3">
          <Title
            style={{
              margin: 0,
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Button
          </Title>
          <Tag color="blue" style={{ marginTop: 4 }}>
            v0.1.0
          </Tag>
        </div>
        <Paragraph
          style={{ fontSize: 16, color: "#475569", maxWidth: 640, margin: 0 }}
        >
          <Text code>NpsButton</Text> là wrapper mỏng trên{" "}
          <Text code>Button</Text> của Ant Design. Component kế thừa gần như
          toàn bộ <Text code>ButtonProps</Text> — bạn dùng quen như Ant trong
          khi vẫn có thể mở rộng thêm nhẹ khi cần.
        </Paragraph>

        <div className="mt-5">
          <CodeBlock code={importSnippet} lang="tsx" />
        </div>
      </section>

      <Divider style={{ margin: 0 }} />

      {/* When to use */}
      <section id="when-to-use" className="docs-section">
        <Title
          level={2}
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 12,
            marginTop: 0,
          }}
        >
          When to Use
        </Title>
        <ul
          style={{
            color: "#475569",
            fontSize: 14,
            lineHeight: 2,
            paddingLeft: 24,
            margin: 0,
          }}
        >
          <li>
            Khi bạn cần trigger một hành động hoặc sự kiện (submit form, mở
            modal, huỷ thao tác…).
          </li>
          <li>
            Dùng <Text code>type=&quot;primary&quot;</Text> cho hành động chính,{" "}
            <Text code>type=&quot;default&quot;</Text> cho hành động phụ.
          </li>
          <li>
            Dùng <Text code>danger</Text> cho các thao tác có tính phá huỷ (xoá,
            reset…).
          </li>
          <li>
            Dùng <Text code>rounded=&quot;full&quot;</Text> khi muốn button mềm mại, bo
            tròn hoàn toàn.
          </li>
          <li>
            Dùng <Text code>loading</Text> để phản hồi trạng thái đang xử lý
            (async action).
          </li>
        </ul>
      </section>

      <Divider style={{ margin: 0 }} />

      {/* Examples */}
      <section id="examples" className="docs-section">
        <Title
          level={2}
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 4,
            marginTop: 0,
          }}
        >
          Examples
        </Title>
        <Paragraph style={{ color: "#64748b", fontSize: 14, marginBottom: 0 }}>
          Các ví dụ minh hoạ đầy đủ trạng thái của <Text code>NpsButton</Text>.
        </Paragraph>
      </section>

      <ExampleCard
        id="ex-basic"
        title="Basic"
        desc="Năm kiểu button cơ bản: primary, default, dashed, text, và link."
        preview={
          <Space wrap size={[12, 12]}>
            <NpsButton type="primary">Primary</NpsButton>
            <NpsButton>Default</NpsButton>
            <NpsButton type="dashed">Dashed</NpsButton>
            <NpsButton type="text">Text</NpsButton>
            <NpsButton type="link">Link</NpsButton>
          </Space>
        }
        code={basicSnippet}
      />

      <ExampleCard
        id="ex-rounded"
        title="Rounded Full"
        desc='Prop mở rộng riêng của NpsButton. Thêm rounded="full" để bo tròn hoàn toàn.'
        preview={
          <Space wrap size={[12, 12]}>
            <NpsButton type="primary" rounded="full">
              Primary
            </NpsButton>
            <NpsButton rounded="full">Default</NpsButton>
            <NpsButton type="dashed" rounded="full">
              Dashed
            </NpsButton>
          </Space>
        }
        code={roundedSnippet}
      />

      <ExampleCard
        id="ex-danger"
        title="Danger"
        desc="Dùng danger để biểu thị hành động có tính phá huỷ. Kết hợp được với mọi type."
        preview={
          <Space wrap size={[12, 12]}>
            <NpsButton type="primary" danger>
              Primary Danger
            </NpsButton>
            <NpsButton danger>Default Danger</NpsButton>
            <NpsButton type="dashed" danger>
              Dashed Danger
            </NpsButton>
            <NpsButton type="text" danger>
              Text Danger
            </NpsButton>
          </Space>
        }
        code={dangerSnippet}
      />

      <ExampleCard
        id="ex-size"
        title="Sizes"
        desc="Ba kích thước: large, default (middle), và small."
        preview={
          <Space wrap align="center" size={[12, 12]}>
            <NpsButton type="primary" size="large">
              Large
            </NpsButton>
            <NpsButton type="primary">Default</NpsButton>
            <NpsButton type="primary" size="small">
              Small
            </NpsButton>
          </Space>
        }
        code={sizeSnippet}
      />

      <ExampleCard
        id="ex-loading"
        title="Loading State"
        desc="Thêm loading để hiển thị spinner và vô hiệu hóa click trong lúc đang xử lý."
        preview={
          <Space wrap size={[12, 12]}>
            <NpsButton type="primary" loading>
              Loading
            </NpsButton>
            <NpsButton loading>Loading</NpsButton>
          </Space>
        }
        code={loadingSnippet}
      />

      <ExampleCard
        id="ex-disabled"
        title="Disabled"
        desc="Vô hiệu hóa button khi điều kiện chưa đủ để thực hiện hành động."
        preview={
          <Space wrap size={[12, 12]}>
            <NpsButton type="primary" disabled>
              Primary
            </NpsButton>
            <NpsButton disabled>Default</NpsButton>
            <NpsButton type="dashed" disabled>
              Dashed
            </NpsButton>
          </Space>
        }
        code={disabledSnippet}
      />

      <ExampleCard
        id="ex-block"
        title="Block"
        desc="Dùng block để button chiếm toàn bộ chiều rộng container."
        preview={
          <div style={{ width: "100%", maxWidth: 400 }}>
            <Space direction="vertical" style={{ width: "100%" }} size={10}>
              <NpsButton type="primary" block>
                Block Button
              </NpsButton>
              <NpsButton block>Block Button</NpsButton>
            </Space>
          </div>
        }
        code={blockSnippet}
      />

      <Divider style={{ margin: 0 }} />

      {/* API */}
      <section id="api" className="docs-section">
        <Title
          level={2}
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 4,
            marginTop: 0,
          }}
        >
          API
        </Title>
        <Paragraph style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
          <Text code>NpsButton</Text> extends toàn bộ{" "}
          <Text code>ButtonProps</Text> của Ant Design — bảng dưới chỉ liệt kê
          các prop NPS UI <strong>tự thêm</strong>. Với phần còn lại, xem trực
          tiếp tại tài liệu gốc của Ant Design.
        </Paragraph>

        {/* Custom props table */}
        <ApiTable data={customApiData} />

        {/* Link sang Ant Design docs */}
        <section id="api-ant" className="docs-section">
          <div className="docs-ant-ref-callout">
            <div className="docs-ant-ref-callout-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="docs-ant-ref-callout-body">
              <p className="docs-ant-ref-callout-title">
                Inherited props từ Ant Design Button
              </p>
              <p className="docs-ant-ref-callout-desc">
                <Text code>NpsButton</Text> kế thừa toàn bộ{" "}
                <Text code>ButtonProps</Text> từ Ant Design, bao gồm{" "}
                <Text code>type</Text>, <Text code>size</Text>,{" "}
                <Text code>danger</Text>, <Text code>disabled</Text>,{" "}
                <Text code>loading</Text>, <Text code>icon</Text>,{" "}
                <Text code>block</Text>, <Text code>href</Text>,{" "}
                <Text code>onClick</Text>…
              </p>
              <a
                id="link-ant-button-docs"
                href="https://ant.design/components/button#api"
                target="_blank"
                rel="noopener noreferrer"
                className="docs-ant-ref-link"
              >
                Xem đầy đủ Ant Design Button API
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
