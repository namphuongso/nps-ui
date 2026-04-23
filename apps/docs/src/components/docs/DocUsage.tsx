import { Typography } from "antd";

const { Title } = Typography;

interface DocUsageProps {
  title?: string;
  items: string[];
}

export function DocUsage({ title = "When to Use", items }: DocUsageProps) {
  return (
    <section id="when-to-use" className="docs-section">
      <Title
        level={2}
        style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}
      >
        {title}
      </Title>
      <ul className="docs-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
