import { Tag, Timeline, Typography } from "antd";
import {
  CheckCircleOutlined,
  RocketOutlined,
  BugOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { DocsAnchorItem } from "../../components/docs/types";
import { EXTERNAL_LINKS } from "../../config/links";
import { SEO } from "../../components/docs/SEO";
import { useTranslation } from "react-i18next";
import type { VersionEntry } from "./types";

const { Title, Paragraph, Text } = Typography;

export const changelogAnchorItems: DocsAnchorItem[] = [
  { key: "v0-0-1", href: "#v0-0-1", title: "v0.0.1" },
];

const CHANGELOG_DATA: VersionEntry[] = [
  {
    version: "0.0.1",
    date: "2026-04-23",
    status: "current",
    summary: "Initial Release — NpsButton and core infrastructure",
    changes: [
      {
        type: "added",
        text: 'NpsButton — Button component built on top of Ant Design Button với prop tùy chỉnh rounded: "default" | "md" | "lg" | "full"',
      },
      {
        type: "added",
        text: "NpsConfigProvider — Optional provider wrapper tương thích với Ant Design ConfigProvider",
      },
      {
        type: "added",
        text: "Monorepo workspace setup (packages/ui + apps/docs)",
      },
      {
        type: "added",
        text: "Documentation site with Getting Started guide and component demos",
      },
      {
        type: "added",
        text: "Dual CJS/ESM build output via Vite with TypeScript declarations",
      },
      {
        type: "added",
        text: "Published to npm: @namphuongtechnologi/nps-ui",
      },
    ],
  },
];

const changeTypeConfig = {
  added: {
    icon: <CheckCircleOutlined />,
    color: "success",
    tagColor: "green",
    label: "Added",
  },
  fixed: {
    icon: <BugOutlined />,
    color: "error",
    tagColor: "red",
    label: "Fixed",
  },
  improved: {
    icon: <ThunderboltOutlined />,
    color: "warning",
    tagColor: "orange",
    label: "Improved",
  },
  breaking: {
    icon: <RocketOutlined />,
    color: "default",
    tagColor: "volcano",
    label: "Breaking",
  },
} as const;

export function ChangelogPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-16">
      <SEO title={t("changelog")} description={t("home:hero.subtitle")} />
      {/* ── Header ─────────────────────────────────── */}
      <section
        id="changelog-header"
        className="docs-section docs-hero"
        style={{ paddingBottom: 0 }}
      >
        <div className="docs-hero-badge">
          <span className="docs-hero-badge-dot" />
          {t("changelog")}
        </div>
        <Title className="docs-section-title" style={{ fontSize: 36 }}>
          {t("changelog")}
        </Title>
        <Paragraph className="docs-section-sub">
          All notable changes to NPS UI will be documented in this file. Format
          based on{" "}
          <a
            href="https://keepachangelog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-changelog-link"
          >
            Keep a Changelog
          </a>{" "}
          và{" "}
          <a
            href="https://semver.org"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-changelog-link"
          >
            Semantic Versioning
          </a>
          .
        </Paragraph>
      </section>

      {/* ── Versions ───────────────────────────────── */}
      <section className="docs-section">
        <div className="docs-changelog-list">
          {CHANGELOG_DATA.map((entry) => (
            <div
              key={entry.version}
              id={`v${entry.version.replace(/\./g, "-")}`}
              className="docs-changelog-entry docs-section"
            >
              {/* Version header */}
              <div className="docs-changelog-version-header">
                <div className="docs-changelog-version-title-row">
                  <Title level={2} className="docs-changelog-version-title">
                    v{entry.version}
                  </Title>
                  {entry.status === "current" && (
                    <Tag color="blue" className="docs-changelog-current-tag">
                      Latest
                    </Tag>
                  )}
                </div>
                <Text className="docs-changelog-date">{entry.date}</Text>
                <Paragraph className="docs-changelog-summary">
                  {entry.summary}
                </Paragraph>
              </div>

              {/* Changes grouped by type */}
              <div className="docs-changelog-changes">
                {(["added", "improved", "fixed", "breaking"] as const).map(
                  (type) => {
                    const items = entry.changes.filter((c) => c.type === type);
                    if (items.length === 0) return null;
                    const config = changeTypeConfig[type];
                    return (
                      <div key={type} className="docs-changelog-type-group">
                        <div className="docs-changelog-type-header">
                          <Tag
                            icon={config.icon}
                            color={config.tagColor}
                            className="docs-changelog-type-tag"
                          >
                            {config.label}
                          </Tag>
                        </div>
                        <Timeline
                          className="docs-changelog-timeline"
                          items={items.map((item) => ({
                            color: config.color as
                              | "success"
                              | "error"
                              | "warning"
                              | "default",
                            children: (
                              <Text className="docs-changelog-timeline-text">
                                {item.text}
                              </Text>
                            ),
                          }))}
                        />
                      </div>
                    );
                  },
                )}
              </div>

              {/* Links */}
              <div className="docs-changelog-entry-links">
                <a
                  href={EXTERNAL_LINKS.GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="docs-ant-ref-link"
                >
                  {t("more")} GitHub ↗
                </a>
                <a
                  href={EXTERNAL_LINKS.NPM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="docs-ant-ref-link"
                >
                  View on npm ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
