import { NpsButton } from "@namphuongtechnologi/nps-ui";
import { Typography, Space } from "antd";
import { CodeBlock } from "../../components/docs/CodeBlock";
import { SEO } from "../../components/docs/SEO";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

const installSnippet = `npm install @namphuongtechnologi/nps-ui antd`;

const usageSnippet = `import { ConfigProvider } from "antd";
import { NpsButton } from "@namphuongtechnologi/nps-ui";
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

export function HomePage() {
  const { t } = useTranslation("home");

  const features = [
    {
      icon: "🧩",
      title: t("features.items.ant.title"),
      desc: t("features.items.ant.desc"),
    },
    {
      icon: "⚡",
      title: t("features.items.performance.title"),
      desc: t("features.items.performance.desc"),
    },
    {
      icon: "🎨",
      title: t("features.items.theme.title"),
      desc: t("features.items.theme.desc"),
    },
    {
      icon: "🔷",
      title: t("features.items.typescript.title"),
      desc: t("features.items.typescript.desc"),
    },
    {
      icon: "📦",
      title: t("features.items.treeShaking.title"),
      desc: t("features.items.treeShaking.desc"),
    },
    {
      icon: "🚀",
      title: t("features.items.production.title"),
      desc: t("features.items.production.desc"),
    },
  ];

  return (
    <div>
      <SEO
        title={t("seo.title", { defaultValue: "Home" })}
        description={t("hero.subtitle")}
      />
      {/* ── Hero ─────────────────────────────────────── */}
      <section id="hero" className="docs-section docs-home-hero">
        <div className="docs-home-hero-badge-row">
          <span className="docs-hero-badge">
            <span className="docs-hero-badge-dot" />
            Ant Design Compatible · React · TypeScript
          </span>
        </div>

        <Title className="docs-home-hero-title">
          {t("hero.title")} <span className="docs-home-hero-brand">NPS UI</span>
        </Title>

        <Paragraph className="docs-hero-sub">{t("hero.subtitle")}</Paragraph>

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
            {t("getStarted", { defaultValue: "Get Started →", ns: "common" })}
          </NpsButton>
          <NpsButton
            id="hero-btn-components"
            size="large"
            href="/components/button"
            style={{ height: 44, paddingInline: 24 }}
          >
            {t("exploreComponents", {
              defaultValue: "Explore Components",
              ns: "common",
            })}
          </NpsButton>
        </div>

        {/* Stats row */}
        <div className="docs-home-stats-row">
          {[
            { value: "1+", label: t("stats.components") },
            { value: "MIT", label: t("stats.license") },
            { value: "TypeScript", label: t("stats.reliable") },
            { value: "Ant v5", label: t("stats.compatible") },
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
        <div className="docs-home-preview-label">
          {t("usage.preview", {
            ns: "gettingStarted",
            defaultValue: "Live Preview",
          })}
        </div>
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
          {t("features.title")}
        </Title>
        <Paragraph className="docs-section-sub">
          {t("features.subtitle")}
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
          {t("quickStart.title")}
        </Title>
        <Paragraph className="docs-section-sub">
          {t("quickStart.subtitle")}
        </Paragraph>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <Text strong className="docs-quickstart-step-label">
              {t("quickStart.install")}
            </Text>
            <div style={{ marginTop: 8 }}>
              <CodeBlock code={installSnippet} lang="bash" />
            </div>
          </div>
          <div>
            <Text strong className="docs-quickstart-step-label">
              {t("quickStart.import")}
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
            {t("readGuide", {
              ns: "common",
              defaultValue: "Read the full guide →",
            })}
          </NpsButton>
        </div>
      </section>
    </div>
  );
}

export const homeAnchorItems = [
  { key: "hero", href: "#hero", title: "Overview" },
  { key: "features", href: "#features", title: "Features" },
  { key: "quickstart", href: "#quickstart", title: "Quick Start" },
];
