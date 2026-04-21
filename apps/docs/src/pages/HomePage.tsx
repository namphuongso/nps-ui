import { NpsButton } from "nps-ui";
import { Typography, Space, Tag } from "antd";
import { CodeBlock } from "../components/docs/CodeBlock";
import type { DocsAnchorItem } from "../components/docs/DocsLayout";

const { Title, Paragraph, Text } = Typography;

const installSnippet = `npm install @namphuongso/nps-ui antd`;

const usageSnippet = `import { ConfigProvider } from "antd";
import { NpsButton } from "@namphuongso/nps-ui";
import "antd/dist/reset.css";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#003a78",
          borderRadius: 8,
        },
      }}
    >
      <NpsButton type="primary">Save</NpsButton>
    </ConfigProvider>
  );
}`;

export const homeAnchorItems: DocsAnchorItem[] = [
  { key: "hero", href: "#hero", title: "Overview" },
  { key: "features", href: "#features", title: "Features" },
  { key: "quickstart", href: "#quickstart", title: "Quick Start" },
];

const features = [
  {
    icon: "🧩",
    title: "Ant Design Compatible",
    desc: "Kế thừa toàn bộ props và token từ ConfigProvider của Ant Design. Không cần wrapper riêng.",
  },
  {
    icon: "⚡",
    title: "Lightweight",
    desc: "Wrapper mỏng, không thêm dependency ngoài Ant Design. Cài xong dùng ngay.",
  },
  {
    icon: "🎨",
    title: "Fully Themeable",
    desc: "Tự nhận token theme từ project host. Không áp đặt style riêng, không conflict CSS.",
  },
  {
    icon: "🔷",
    title: "TypeScript First",
    desc: "Type-safe với đầy đủ props, generic type exports và declaration files (.d.ts).",
  },
  {
    icon: "📦",
    title: "Tree-shakeable",
    desc: "Dual ESM/CJS build. Import component nào, bundle chỉ chứa component đó.",
  },
  {
    icon: "🚀",
    title: "Production Ready",
    desc: "Đã publish lên npm. Version-controlled, changelog rõ ràng, semantic versioning.",
  },
];

export function HomePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────── */}
      <section id="hero" className="docs-section docs-home-hero">
        <div className="docs-home-hero-badge-row">
          <span className="docs-hero-badge">
            <span className="docs-hero-badge-dot" />
            Ant Design Compatible · React · TypeScript
          </span>
        </div>

        <Title className="docs-home-hero-title">
          Build faster with <span className="docs-home-hero-brand">NPS UI</span>
        </Title>

        <Paragraph className="docs-hero-sub">
          Thư viện React component được xây dựng trên nền Ant Design. Dùng quen
          như Ant, mở rộng thêm khi cần — và luôn tương thích với{" "}
          <Text code>ConfigProvider</Text> của dự án bạn.
        </Paragraph>

        <div className="docs-hero-actions">
          <NpsButton
            id="hero-btn-started"
            type="primary"
            size="large"
            href="/guide/getting-started"
            style={{
              background: "#003a78",
              borderColor: "#003a78",
              height: 44,
              paddingInline: 28,
              fontWeight: 600,
            }}
          >
            Get Started →
          </NpsButton>
          <NpsButton
            id="hero-btn-components"
            size="large"
            href="/components/button"
            style={{ height: 44, paddingInline: 24 }}
          >
            View Components
          </NpsButton>
        </div>

        {/* Stats row */}
        <div className="docs-home-stats-row">
          {[
            { value: "1+", label: "Components" },
            { value: "MIT", label: "License" },
            { value: "TypeScript", label: "First-class" },
            { value: "Ant v5", label: "Compatible" },
          ].map((stat) => (
            <div key={stat.label} className="docs-home-stat-item">
              <span className="docs-home-stat-value">{stat.value}</span>
              <span className="docs-home-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Preview ─────────────────────────────── */}
      <section className="docs-home-preview-section">
        <div className="docs-home-preview-label">Live Preview</div>
        <div
          className="docs-preview-surface"
          style={{ justifyContent: "center", minHeight: 80 }}
        >
          <Space wrap size={[12, 12]}>
            <NpsButton type="primary">Primary</NpsButton>
            <NpsButton>Default</NpsButton>
            <NpsButton type="dashed">Dashed</NpsButton>
            <NpsButton type="primary" danger>
              Danger
            </NpsButton>
            <NpsButton rounded="full" type="primary">
              Rounded Full
            </NpsButton>
            <NpsButton disabled>Disabled</NpsButton>
          </Space>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section
        id="features"
        className="docs-section"
        style={{ paddingTop: 48 }}
      >
        <Title level={2} className="docs-section-title">
          Why NPS UI?
        </Title>
        <Paragraph className="docs-section-sub">
          Được thiết kế để mở rộng Ant Design một cách tự nhiên, không phá vỡ
          design system hiện có.
        </Paragraph>

        <div className="docs-feature-grid">
          {features.map((f) => (
            <div key={f.title} className="docs-feature-card">
              <div className="docs-feature-icon">{f.icon}</div>
              <p className="docs-feature-title">{f.title}</p>
              <p className="docs-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Start ───────────────────────────────── */}
      <section
        id="quickstart"
        className="docs-section"
        style={{ paddingTop: 48, paddingBottom: 48 }}
      >
        <Title level={2} className="docs-section-title">
          Quick Start
        </Title>
        <Paragraph className="docs-section-sub">
          Cài đặt và dùng ngay trong project Ant Design đang có sẵn của bạn.
        </Paragraph>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <Text strong className="docs-quickstart-step-label">
              1. Install
            </Text>
            <div style={{ marginTop: 8 }}>
              <CodeBlock code={installSnippet} lang="bash" />
            </div>
          </div>
          <div>
            <Text strong className="docs-quickstart-step-label">
              2. Import & Use
            </Text>
            <div style={{ marginTop: 8 }}>
              <CodeBlock code={usageSnippet} lang="tsx" />
            </div>
          </div>
        </div>

        <div className="docs-home-cta-row">
          <NpsButton
            id="home-cta-guide"
            type="primary"
            size="large"
            href="/guide/getting-started"
            style={{
              background: "#003a78",
              borderColor: "#003a78",
              height: 40,
              paddingInline: 24,
            }}
          >
            Read the full guide →
          </NpsButton>
        </div>
      </section>
    </div>
  );
}
