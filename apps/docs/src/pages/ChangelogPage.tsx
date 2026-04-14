import { Tag, Timeline, Typography } from "antd";
import {
  CheckCircleOutlined,
  RocketOutlined,
  BugOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { DocsAnchorItem } from "../components/docs/DocsLayout";

const { Title, Paragraph, Text } = Typography;

export const changelogAnchorItems: DocsAnchorItem[] = [
  { key: "v0-1-0", href: "#v0-1-0", title: "v0.1.0" },
];

interface ChangeEntry {
  type: "added" | "fixed" | "improved" | "breaking";
  text: string;
}

interface VersionEntry {
  version: string;
  date: string;
  status: "current" | "old";
  summary: string;
  changes: ChangeEntry[];
}

const CHANGELOG_DATA: VersionEntry[] = [
  {
    version: "0.1.0",
    date: "2026-04-14",
    status: "current",
    summary: "Initial Release — NpsButton và foundation của thư viện",
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
        text: "Documentation site với Getting Started guide và component demos",
      },
      {
        type: "added",
        text: "Dual CJS/ESM build output via Vite với TypeScript declarations",
      },
      {
        type: "added",
        text: "Published lên npm: @namphuongtechnologi/nps-ui",
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
  return (
    <div className="space-y-16">
      {/* ── Header ─────────────────────────────────── */}
      <section
        id="changelog-header"
        className="docs-section docs-hero"
        style={{ paddingBottom: 0 }}
      >
        <div className="docs-hero-badge">
          <span className="docs-hero-badge-dot" />
          Release History
        </div>
        <Title className="docs-section-title" style={{ fontSize: 36 }}>
          Changelog
        </Title>
        <Paragraph className="docs-section-sub">
          Toàn bộ thay đổi của NPS UI theo từng phiên bản. Format theo{" "}
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
                  href={`https://github.com/namphuongtechnologi/nps-ui/releases/tag/v${entry.version}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="docs-ant-ref-link"
                >
                  View on GitHub ↗
                </a>
                <a
                  href={`https://www.npmjs.com/package/@namphuongtechnologi/nps-ui/v/${entry.version}`}
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
