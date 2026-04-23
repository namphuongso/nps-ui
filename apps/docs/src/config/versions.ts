import packageJson from "../../../../packages/ui/package.json";

export interface VersionConfig {
  version: string;
  label: string;
  date: string;
}

export const CURRENT_VERSION: VersionConfig = {
  version: packageJson.version,
  label: `v${packageJson.version}`,
  date: "2026-04-23", // Ngày cập nhật cấu hình
};
