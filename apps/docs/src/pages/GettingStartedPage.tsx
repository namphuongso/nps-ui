import { Col, Row, Space, Typography } from "antd";
import { NpsButton } from "nps-ui";
import { CodeBlock } from "../components/docs/CodeBlock";
import type { DocsAnchorItem } from "../components/docs/DocsLayout";

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

export const gettingStartedAnchorItems: DocsAnchorItem[] = [
  { key: "overview", href: "#overview", title: "Overview" },
  { key: "installation", href: "#installation", title: "Installation" },
  { key: "usage", href: "#usage", title: "Use with Ant" },
];

const features = [
  {
    icon: "🧩",
    title: "Ant Design Compatible",
    desc: "Kế thừa toàn bộ props và token từ ConfigProvider của Ant.",
  },
  {
    icon: "⚡",
    title: "Lightweight",
    desc: "Wrapper mỏng, không thêm dependency ngoài Ant Design.",
  },
  {
    icon: "🎨",
    title: "Themeable",
    desc: "Tự nhận token theme từ project host, không áp đặt style riêng.",
  },
  {
    icon: "🔷",
    title: "TypeScript First",
    desc: "Type-safe với đầy đủ props và generic type exports.",
  },
];

export function GettingStartedPage() {
  return (
    <div className="space-y-16">
      {/* ── Hero ───────────────────────────────── */}
      <section id="overview" className="docs-section docs-hero">
        <div className="docs-hero-badge">
          <span className="docs-hero-badge-dot" />
          Ant Design Compatible · React · TypeScript
        </div>

        <Title className="docs-hero-title">
          Build faster with
          <br />
          NPS UI
        </Title>

        <Paragraph className="docs-hero-sub">
          Thư viện component xây trên nền Ant Design. Dùng quen như Ant, mở rộng
          thêm khi cần — và luôn tương thích với{" "}
          <Text code>ConfigProvider</Text> của dự án bạn.
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
            Xem Components →
          </NpsButton>
          <NpsButton
            id="hero-btn-install"
            size="large"
            href="#installation"
            style={{ height: 44, paddingInline: 24 }}
          >
            Cài đặt
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
          Installation
        </Title>
        <Paragraph className="docs-section-sub">
          Cài thư viện vào project Ant đang có sẵn của bạn.
        </Paragraph>
        <CodeBlock code={installSnippet} lang="bash" />
      </section>

      {/* ── Usage ──────────────────────────────── */}
      <section id="usage" className="docs-section">
        <Title level={2} className="docs-section-title">
          Use with your Ant project
        </Title>
        <Paragraph className="docs-section-sub">
          Import component và đặt bên trong <Text code>ConfigProvider</Text>{" "}
          hiện có của app. Không cần provider riêng.
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={24} xl={14}>
            <div
              className="docs-card p-5 h-full"
              style={{ border: "1px solid #e2e8f0", borderRadius: 16 }}
            >
              <Text strong className="block text-slate-900 mb-1">
                Live Preview
              </Text>
              <Paragraph className="text-slate-500 text-sm mb-4">
                Đang dùng style mặc định của Ant Design.
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
                Theme Compatibility
              </Text>
              <ul
                className="space-y-2 pl-5 text-sm text-slate-500"
                style={{ lineHeight: 1.7 }}
              >
                <li>Không bắt buộc dùng provider riêng của thư viện.</li>
                <li>
                  Nhận token từ <code>ConfigProvider</code> của project host.
                </li>
                <li>Giữ UI gần Ant nhất để dễ tích hợp.</li>
                <li>Không áp đặt theme hoặc CSS global riêng.</li>
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
