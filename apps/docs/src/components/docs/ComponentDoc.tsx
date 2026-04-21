import type { ReactNode } from "react";
import { Divider, Tag, Typography } from "antd";
import { CodeBlock } from "./CodeBlock";
import { ApiTable, type ApiProp } from "./ApiTable";
import type { DocsAnchorItem } from "./DocsLayout";

const { Title, Paragraph, Text } = Typography;

export interface ExampleConfig {
  id: string;
  title: string;
  desc: string;
  preview: ReactNode;
  code: string;
}

interface ComponentDocProps {
  title: string;
  version?: string;
  description: ReactNode;
  importSnippet: string;
  whenToUse: string[];
  examples: ExampleConfig[];
  customApiData?: ApiProp[];
  antdDocLink?: string;
}

/**
 * Helper to generate anchors automatically from examples
 */
export function generateAnchors(
  examples: ExampleConfig[],
  hasApi = true,
): DocsAnchorItem[] {
  const anchors: DocsAnchorItem[] = [
    { key: "overview", href: "#overview", title: "Overview" },
    { key: "when-to-use", href: "#when-to-use", title: "When to Use" },
    { key: "examples", href: "#examples", title: "Examples" },
  ];

  examples.forEach((ex) => {
    anchors.push({ key: ex.id, href: `#${ex.id}`, title: `· ${ex.title}` });
  });

  if (hasApi) {
    anchors.push({ key: "api", href: "#api", title: "API" });
  }

  return anchors;
}

export function ComponentDoc({
  title,
  version,
  description,
  importSnippet,
  whenToUse,
  examples,
  customApiData,
  antdDocLink,
}: ComponentDocProps) {
  return (
    <div className="space-y-12">
      {/* ─── Overview ─── */}
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
            {title}
          </Title>
          {version && (
            <Tag color="blue" style={{ marginTop: 4 }}>
              v{version}
            </Tag>
          )}
        </div>
        <div style={{ fontSize: 16, color: "#475569", maxWidth: 640 }}>
          {description}
        </div>

        <div className="mt-5">
          <CodeBlock code={importSnippet} lang="tsx" />
        </div>
      </section>

      <Divider style={{ margin: 0 }} />

      {/* ─── When to Use ─── */}
      <section id="when-to-use" className="docs-section">
        <Title
          level={2}
          style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}
        >
          When to Use
        </Title>
        <ul className="docs-list">
          {whenToUse.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <Divider style={{ margin: 0 }} />

      {/* ─── Examples ─── */}
      <section id="examples" className="docs-section">
        <Title
          level={2}
          style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}
        >
          Examples
        </Title>
        <Paragraph style={{ color: "#64748b", fontSize: 14 }}>
          Mẫu ví dụ sử dụng thành phần {title}.
        </Paragraph>
      </section>

      {examples.map((ex) => (
        <section key={ex.id} id={ex.id} className="docs-section">
          <Title
            level={3}
            style={{ fontSize: 16, marginBottom: 4, fontWeight: 600 }}
          >
            {ex.title}
          </Title>
          <Paragraph
            style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}
          >
            {ex.desc}
          </Paragraph>
          <div className="docs-example-card">
            <div className="docs-preview-surface">{ex.preview}</div>
            <div className="docs-example-code">
              <CodeBlock code={ex.code} lang="tsx" />
            </div>
          </div>
        </section>
      ))}

      {/* ─── API ─── */}
      {(customApiData || antdDocLink) && (
        <>
          <Divider style={{ margin: 0 }} />
          <section id="api" className="docs-section">
            <Title
              level={2}
              style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}
            >
              API
            </Title>

            {customApiData && (
              <>
                <Paragraph
                  style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}
                >
                  Bảng liệt kê các thuộc tính tùy chỉnh (props) của{" "}
                  <Text code>Nps{title}</Text>.
                </Paragraph>
                <ApiTable data={customApiData} />
              </>
            )}

            {antdDocLink && (
              <div className="docs-ant-ref-callout mt-8">
                <div className="docs-ant-ref-callout-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="docs-ant-ref-callout-body">
                  <p className="docs-ant-ref-callout-title">
                    Inherited props từ Ant Design {title}
                  </p>
                  <p className="docs-ant-ref-callout-desc">
                    Thành phần này kế thừa đầy đủ các thuộc tính từ Ant Design.
                  </p>
                  <a
                    href={antdDocLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="docs-ant-ref-link"
                  >
                    Xem tài liệu Ant Design {title} API
                  </a>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
