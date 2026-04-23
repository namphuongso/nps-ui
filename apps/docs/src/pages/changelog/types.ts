export interface ChangeEntry {
  type: "added" | "fixed" | "improved" | "breaking";
  text: string;
}

export interface VersionEntry {
  version: string;
  date: string;
  status: "current" | "old";
  summary: string;
  changes: ChangeEntry[];
}
