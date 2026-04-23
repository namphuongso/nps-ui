import { Divider, Typography } from "antd";
import type { ComponentDocProps } from "./types";
import { DocHero } from "./DocHero";
import { DocUsage } from "./DocUsage";
import { DocExampleSection } from "./DocExampleSection";
import { DocApiSection } from "./DocApiSection";

const { Title, Paragraph } = Typography;

/**
 * Standard Component Documentation Template
 * Aggregates all Doc sub-components into a standard layout.
 */
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
      {/* ─── Hero / Overview ─── */}
      <DocHero
        title={title}
        version={version}
        description={description}
        importSnippet={importSnippet}
      />

      <Divider style={{ margin: 0 }} />

      {/* ─── When to Use ─── */}
      <DocUsage items={whenToUse} />

      <Divider style={{ margin: 0 }} />

      {/* ─── Examples Header ─── */}
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

      {/* ─── Individual Examples ─── */}
      {examples.map((ex) => (
        <DocExampleSection key={ex.id} example={ex} />
      ))}

      <Divider style={{ margin: 0 }} />

      {/* ─── API Section ─── */}
      <DocApiSection
        title={title}
        customApiData={customApiData}
        antdDocLink={antdDocLink}
      />
    </div>
  );
}
