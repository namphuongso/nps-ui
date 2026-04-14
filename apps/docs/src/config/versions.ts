export type VersionStatus = "current" | "old" | "next";

export interface VersionConfig {
  version: string;
  label: string;
  date: string;
  status: VersionStatus;
  url: string;
}

export const VERSIONS: VersionConfig[] = [
  {
    version: "0.1.0",
    label: "v0.1.0",
    date: "2026-04-14",
    status: "current",
    url: "/",
  },
];

export const CURRENT_VERSION = VERSIONS.find((v) => v.status === "current")!;
