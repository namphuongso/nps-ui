import { Tag, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ApiTableProps } from "./types";

export function ApiTable({ data }: ApiTableProps) {
  return (
    <div className="docs-api-table-wrap">
      <table className="docs-api-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.property}>
              <td>
                <code className="docs-api-prop-name">{row.property}</code>
                {row.required && (
                  <span className="docs-api-required" title="Required">
                    *
                  </span>
                )}
              </td>
              <td className="docs-api-desc">
                {row.description}
                {row.version && (
                  <Tooltip title={`Added in v${row.version}`}>
                    <InfoCircleOutlined className="docs-api-info-icon" />
                  </Tooltip>
                )}
              </td>
              <td>
                <code className="docs-api-type">{row.type}</code>
              </td>
              <td>
                {row.default ? (
                  <code className="docs-api-default">{row.default}</code>
                ) : (
                  <span className="docs-api-dash">—</span>
                )}
              </td>
              <td>
                {row.version ? (
                  <Tag color="blue" className="docs-api-version-tag">
                    {row.version}
                  </Tag>
                ) : (
                  <span className="docs-api-dash">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
