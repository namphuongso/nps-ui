import { ReactNode } from "react";
import { DocsAnchorItem } from "../components/docs/types";

export interface PageConfig {
  path: string;
  anchorItems: DocsAnchorItem[];
  content: ReactNode;
}
