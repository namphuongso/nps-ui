import { useEffect, useMemo, useState, type ReactNode } from "react";
import { DocsLayout, type DocsAnchorItem } from "./components/docs/DocsLayout";
import {
  GettingStartedPage,
  gettingStartedAnchorItems,
} from "./pages/GettingStartedPage";
import { ButtonPage, buttonAnchorItems } from "./pages/components/ButtonPage";
import { HomePage, homeAnchorItems } from "./pages/HomePage";
import { ChangelogPage, changelogAnchorItems } from "./pages/ChangelogPage";

const BASE_PATH = "/nps-ui";
const DEFAULT_PATH = "/guide/getting-started";

interface PageConfig {
  path: string;
  anchorItems: DocsAnchorItem[];
  content: ReactNode;
}

const pageMap: Record<string, PageConfig> = {
  "/": {
    path: "/",
    anchorItems: homeAnchorItems,
    content: <HomePage />,
  },
  "/guide/getting-started": {
    path: "/guide/getting-started",
    anchorItems: gettingStartedAnchorItems,
    content: <GettingStartedPage />,
  },
  "/components/button": {
    path: "/components/button",
    anchorItems: buttonAnchorItems,
    content: <ButtonPage />,
  },
  "/changelog": {
    path: "/changelog",
    anchorItems: changelogAnchorItems,
    content: <ChangelogPage />,
  },
};

function getCurrentPath() {
  if (typeof window === "undefined") {
    return DEFAULT_PATH;
  }
  // Strip base path for internal routing mapping
  let path = window.location.pathname;
  if (path.startsWith(BASE_PATH)) {
    path = path.slice(BASE_PATH.length);
  }
  return path || "/";
}

function resolvePageConfig(path: string): PageConfig {
  if (pageMap[path]) return pageMap[path];
  if (path === "/") return pageMap["/"];
  return pageMap[DEFAULT_PATH];
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    getCurrentPath(),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const currentPage = useMemo(
    () => resolvePageConfig(currentPath),
    [currentPath],
  );

  const handleNavigate = (path: string) => {
    if (typeof window === "undefined") return;

    const fullPath = BASE_PATH + path;
    if (window.location.pathname !== fullPath) {
      window.history.pushState({}, "", fullPath);
      setCurrentPath(path);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <DocsLayout
      currentPath={currentPage.path}
      onNavigate={handleNavigate}
      anchorItems={currentPage.anchorItems}
    >
      {currentPage.content}
    </DocsLayout>
  );
}
