import { Col, Row, Space, Typography } from "antd";
import { NpsButton } from "nps-ui";
import { CodeBlock } from "../../components/docs/CodeBlock";
import { SEO } from "../../components/docs/SEO";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

const installSnippet = `npm install nps-ui antd`;

const usageSnippet = `import { ConfigProvider } from "antd";
import { NpsButton } from "nps-ui";
import "antd/dist/reset.css";

export default function Example() {
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

export function GettingStartedPage() {
  const { t } = useTranslation("gettingStarted");

  const features = [
    {
      icon: "🧩",
      title: t("features.items.ant.title"),
      desc: t("features.items.ant.desc"),
    },
    {
      icon: "⚡",
      title: t("features.items.lightweight.title"),
      desc: t("features.items.lightweight.desc"),
    },
    {
      icon: "🎨",
      title: t("features.items.themeable.title"),
      desc: t("features.items.themeable.desc"),
    },
    {
      icon: "🔷",
      title: t("features.items.typescript.title"),
      desc: t("features.items.typescript.desc"),
    },
  ];

  return (
    <div className="space-y-16">
      <SEO title={t("title")} description={t("subtitle")} />
      {/* ── Hero ───────────────────────────────── */}
      <section id="overview" className="docs-section docs-hero">
        <div className="docs-hero-badge">
          <span className="docs-hero-badge-dot" />
          {t("badge")}
        </div>

        <Title className="docs-hero-title">
          {t("hero.title").split('\n')[0]}
          <br />
          {t("hero.title").split('\n')[1] || "with NPS UI"}
        </Title>

        <Paragraph className="docs-hero-sub">
          {t("hero.subtitle")}
        </Paragraph>

        <div className="docs-hero-actions">
          <NpsButton
            id="hero-btn-components"
            type="primary"
            size="large"
            href="/components/button"
            style={{
              background: "#003a78",
              borderColor: "#003a78",
              height: 44,
              paddingInline: 24,
            }}
          >
            {t("exploreComponents", { ns: "common", defaultValue: "Explore Components →" })}
          </NpsButton>
          <NpsButton
            id="hero-btn-install"
            size="large"
            href="#installation"
            style={{ height: 44, paddingInline: 24 }}
          >
            {t("installation.title")} {t("guide", { ns: "common", defaultValue: "Guide" })}
          </NpsButton>
        </div>

        {/* Feature cards */}
        <div className="docs-feature-grid mt-12">
          {features.map((f) => (
            <div key={f.title} className="docs-feature-card">
              <div className="docs-feature-icon">{f.icon}</div>
              <p className="docs-feature-title">{f.title}</p>
              <p className="docs-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Installation ───────────────────────── */}
      <section id="installation" className="docs-section">
        <Title level={2} className="docs-section-title">
          {t("installation.title")}
        </Title>
        <Paragraph className="docs-section-sub">
          {t("installation.desc")}
        </Paragraph>
        <CodeBlock code={installSnippet} lang="bash" />
      </section>

      {/* ── Usage ──────────────────────────────── */}
      <section id="usage" className="docs-section">
        <Title level={2} className="docs-section-title">
          {t("usage.title")}
        </Title>
        <Paragraph className="docs-section-sub">
          {t("usage.desc")}
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={24} xl={14}>
            <div
              className="docs-card p-5 h-full"
              style={{ border: "1px solid #e2e8f0", borderRadius: 16 }}
            >
              <Text strong className="block text-slate-900 mb-1">
                {t("usage.preview")}
              </Text>
              <Paragraph className="text-slate-500 text-sm mb-4">
                {t("usage.previewDesc")}
              </Paragraph>
              <div className="docs-preview-surface">
                <Space wrap size={[12, 12]}>
                  <NpsButton type="primary">Primary</NpsButton>
                  <NpsButton>Default</NpsButton>
                  <NpsButton type="dashed">Dashed</NpsButton>
                  <NpsButton rounded="full" type="primary">
                    Rounded Full
                  </NpsButton>
                </Space>
              </div>
            </div>
          </Col>

          <Col xs={24} xl={10}>
            <div
              className="docs-card p-5 h-full"
              style={{ border: "1px solid #e2e8f0", borderRadius: 16 }}
            >
              <Text strong className="block text-slate-900 mb-3">
                {t("usage.themeSync")}
              </Text>
              <ul
                className="space-y-2 pl-5 text-sm text-slate-500"
                style={{ lineHeight: 1.7 }}
              >
                {(t("usage.themeSyncItems", { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>

        <div className="mt-4">
          <CodeBlock code={usageSnippet} lang="tsx" />
        </div>
      </section>
    </div>
  );
}

export const gettingStartedAnchorItems = [
  { key: "overview", href: "#overview", title: "Overview" },
  { key: "installation", href: "#installation", title: "Installation" },
  { key: "usage", href: "#usage", title: "Usage" },
];
