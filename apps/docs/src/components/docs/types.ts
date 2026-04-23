import { ReactNode } from "react";

export interface ApiProp {
  property: string;
  description: ReactNode;
  type: string;
  default?: string;
  version?: string;
  required?: boolean;
}

export interface ApiTableProps {
  data: ApiProp[];
}

export interface DocsAnchorItem {
  key: string;
  href: string;
  title: string;
}

export interface DocsLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  anchorItems: DocsAnchorItem[];
  children: ReactNode;
}

export interface ExampleConfig {
  id: string;
  title: string;
  desc: string;
  preview: ReactNode;
  code: string;
}

export interface ComponentDocProps {
  title: string;
  version?: string;
  description: ReactNode;
  importSnippet: string;
  whenToUse: string[];
  examples: ExampleConfig[];
  customApiData?: ApiProp[];
  antdDocLink?: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
}

export interface CodeBlockProps {
  code: string;
  lang?: string;
}
