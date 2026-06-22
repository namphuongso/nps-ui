export interface NavItem {
  key: string;
  label: string;
  path?: string;
  children?: NavItem[];
}

export const GUIDE_NAV: NavItem[] = [
  {
    key: "/guide/getting-started",
    label: "Getting Started",
    path: "/guide/getting-started",
  },
];

export const COMPONENT_NAV: NavItem[] = [
  {
    key: "/components/infinite-auto-complete",
    label: "InfiniteAutoComplete",
    path: "/components/infinite-auto-complete",
  },
];

export const TOP_NAV = [
  { key: "guide", label: "Guide", path: "/guide/getting-started" },
  {
    key: "components",
    label: "Components",
    path: "/components/infinite-auto-complete",
  },
  { key: "changelog", label: "Changelog", path: "/changelog" },
];

/** Tập hợp tất cả path hợp lệ để resolve trang lỗi */
export const ALL_PATHS = [
  "/",
  ...GUIDE_NAV.map((i) => i.path!),
  ...COMPONENT_NAV.map((i) => i.path!),
  "/changelog",
];
