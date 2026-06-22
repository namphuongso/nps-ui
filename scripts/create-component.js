const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { execSync } = require("child_process");

const ROOT_DIR = path.resolve(__dirname, "..");

// Helper to convert names
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .replace(/-+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (c) => c.toUpperCase());
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`\x1b[36m${question}\x1b[0m`, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function start() {
  console.log("\n📦  NPS UI Component Scaffolder\n");

  let componentInput = process.argv[2];
  if (!componentInput) {
    componentInput = await ask(
      "Nhập tên component mới (Ví dụ: Table hoặc date-picker): ",
    );
  }

  if (!componentInput) {
    console.error("❌ Lỗi: Tên component không được để trống.");
    process.exit(1);
  }

  const kebabName = toKebabCase(componentInput);
  const pascalName = toPascalCase(componentInput);
  const camelName = toCamelCase(componentInput);

  console.log(`\n⚙️  Đang tạo component:`);
  console.log(`   - Kebab-case: ${kebabName}`);
  console.log(`   - PascalCase: ${pascalName}`);
  console.log(`   - camelCase:  ${camelName}\n`);

  // Define paths
  const compDir = path.join(ROOT_DIR, "packages/ui/src/components", kebabName);
  const docDir = path.join(
    ROOT_DIR,
    "apps/docs/src/pages/components",
    kebabName,
  );

  // 1. Check folder existence
  if (fs.existsSync(compDir)) {
    console.error(
      `❌ Lỗi: Thư mục component đã tồn tại tại packages/ui/src/components/${kebabName}`,
    );
    process.exit(1);
  }

  // 2. Create directories
  fs.mkdirSync(compDir, { recursive: true });
  fs.mkdirSync(docDir, { recursive: true });

  // 3. Write Component files
  const filesToCreate = [
    // Component source files
    {
      filePath: path.join(compDir, `Nps${pascalName}.tsx`),
      content: `import { twMerge } from "tailwind-merge";
import type { Nps${pascalName}Props } from "./types";

export function Nps${pascalName}({ className, children, ...props }: Nps${pascalName}Props) {
  return (
    <div
      className={twMerge("nps-${kebabName}", className)}
      {...props}
    >
      {children || "Nps${pascalName} Component"}
    </div>
  );
}
`,
    },
    {
      filePath: path.join(compDir, "types.ts"),
      content: `import type { HTMLAttributes } from "react";

// Thay đổi thành interface nếu bạn cần mở rộng props sau này để tránh cảnh báo ESLint empty interface
export type Nps${pascalName}Props = HTMLAttributes<HTMLDivElement>;
`,
    },
    {
      filePath: path.join(compDir, `Nps${pascalName}.test.tsx`),
      content: `import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nps${pascalName} } from "./index";

describe("Nps${pascalName}", () => {
  it("renders correctly", () => {
    render(<Nps${pascalName} />);
    expect(screen.getByText("Nps${pascalName} Component")).toBeInTheDocument();
  });
});
`,
    },
    {
      filePath: path.join(compDir, "index.ts"),
      content: `export * from "./Nps${pascalName}";
export * from "./types";
`,
    },
    // Documentation page files
    {
      filePath: path.join(docDir, "locales.ts"),
      content: `export const ${camelName}Locales = {
  en: {
    description: "Nps${pascalName} component description.",
    whenToUse: {
      title: "When to Use",
      items: [
        "Use this component to display ${pascalName} details.",
      ],
    },
    examples: {
      title: "Examples",
      subtitle: "Example usage of the ${pascalName} component.",
      basic: {
        title: "Basic",
        desc: "Basic usage of Nps${pascalName}.",
      },
    },
  },
  vi: {
    description: "Mô tả cho component Nps${pascalName}.",
    whenToUse: {
      title: "Khi nào cần sử dụng",
      items: [
        "Sử dụng component này để hiển thị chi tiết ${pascalName}.",
      ],
    },
    examples: {
      title: "Ví dụ",
      subtitle: "Ví dụ thực tế sử dụng component Nps${pascalName}.",
      basic: {
        title: "Cơ bản",
        desc: "Cách sử dụng cơ bản của Nps${pascalName}.",
      },
    },
  },
};
`,
    },
    {
      filePath: path.join(docDir, "index.tsx"),
      content: `import { Nps${pascalName} } from "@namphuongtechnologi/nps-ui";
import { ComponentDoc } from "../../../components/docs/ComponentDoc";
import type { ExampleConfig, ApiProp } from "../../../components/docs/types";
import { useTranslation } from "react-i18next";
import { SEO } from "../../../components/docs/SEO";

export function ${pascalName}Page() {
  const { t } = useTranslation("${camelName}");

  const examples: ExampleConfig[] = [
    {
      id: "ex-basic",
      title: t("examples.basic.title"),
      desc: t("examples.basic.desc"),
      preview: (
        <Nps${pascalName} />
      ),
      code: \`<Nps${pascalName} />\`,
    },
  ];

  const customApiData: ApiProp[] = [
    // Bổ sung API của các props tùy chỉnh tại đây
  ];

  return (
    <>
      <SEO title="${pascalName}" description={t("description")} />
      <ComponentDoc
        title="${pascalName}"
        version="0.0.1"
        description={t("description")}
        importSnippet={\`import { Nps${pascalName} } from "@namphuongtechnologi/nps-ui";\`}
        whenToUse={t("whenToUse.items", { returnObjects: true }) as string[]}
        examples={examples}
        customApiData={customApiData}
      />
    </>
  );
}

export const ${camelName}AnchorItems = [
  { key: "ex-basic", href: "#ex-basic", title: "Basic" },
];
`,
    },
  ];

  for (const file of filesToCreate) {
    fs.writeFileSync(file.filePath, file.content, "utf8");
    console.log(`📄 Đã tạo: ${path.relative(ROOT_DIR, file.filePath)}`);
  }

  // 4. Update index.ts of packages/ui
  const uiIndexFile = path.join(ROOT_DIR, "packages/ui/src/index.ts");
  if (fs.existsSync(uiIndexFile)) {
    let content = fs.readFileSync(uiIndexFile, "utf8");
    const exportStatement = `export * from "./components/${kebabName}";`;
    if (!content.includes(exportStatement)) {
      content = content.trim() + `\n${exportStatement}\n`;
      fs.writeFileSync(uiIndexFile, content, "utf8");
      console.log(`🔗 Đã cập nhật export trong packages/ui/src/index.ts`);
    }
  }

  // 5. Update apps/docs/src/config/navigation.ts
  const navFile = path.join(ROOT_DIR, "apps/docs/src/config/navigation.ts");
  if (fs.existsSync(navFile)) {
    let content = fs.readFileSync(navFile, "utf8");
    const buttonNavTarget = `key: "/components/infinite-auto-complete",`;

    // Inject the new nav link right before the button nav
    const newNav = `key: "/components/${kebabName}",
    label: "${pascalName}",
    path: "/components/${kebabName}",
  },
  {
    key: "/components/infinite-auto-complete",`;

    if (
      content.includes(buttonNavTarget) &&
      !content.includes(`key: "/components/${kebabName}"`)
    ) {
      content = content.replace(buttonNavTarget, newNav);
      fs.writeFileSync(navFile, content, "utf8");
      console.log(
        `🔗 Đã cập nhật navigation trong apps/docs/src/config/navigation.ts`,
      );
    } else {
      console.warn(
        `⚠️ Cảnh báo: Không tự động cập nhật được navigation. Vui lòng thêm thủ công vào ${path.relative(ROOT_DIR, navFile)}`,
      );
    }
  }

  // 6. Update apps/docs/src/App.tsx
  const appFile = path.join(ROOT_DIR, "apps/docs/src/App.tsx");
  if (fs.existsSync(appFile)) {
    let content = fs.readFileSync(appFile, "utf8");
    const importTarget = `import {
  InfiniteAutoCompletePage,
  infiniteAutoCompleteAnchorItems,
} from "./pages/components/infinite-auto-complete";`;
    const importReplacement = `${importTarget}\nimport { ${pascalName}Page, ${camelName}AnchorItems } from "./pages/components/${kebabName}";`;

    const routeTarget = `"/components/infinite-auto-complete": {`;
    const routeReplacement = `"/components/${kebabName}": {
    path: "/components/${kebabName}",
    anchorItems: ${camelName}AnchorItems,
    content: <${pascalName}Page />,
  },
  "/components/infinite-auto-complete": {`;

    let updated = false;
    if (
      content.includes(importTarget) &&
      !content.includes(`import { ${pascalName}Page,`)
    ) {
      content = content.replace(importTarget, importReplacement);
      updated = true;
    }
    if (
      content.includes(routeTarget) &&
      !content.includes(`content: <${pascalName}Page />`)
    ) {
      content = content.replace(routeTarget, routeReplacement);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(appFile, content, "utf8");
      console.log(`🔗 Đã cập nhật routes trong apps/docs/src/App.tsx`);
    } else {
      console.warn(
        `⚠️ Cảnh báo: Không tự động cập nhật được routes trong App.tsx. Vui lòng cập nhật thủ công.`,
      );
    }
  }

  // 7. Update apps/docs/src/i18n/index.ts
  const i18nFile = path.join(ROOT_DIR, "apps/docs/src/i18n/index.ts");
  if (fs.existsSync(i18nFile)) {
    let content = fs.readFileSync(i18nFile, "utf8");
    const importTarget = `import { infiniteAutoCompleteLocales } from "../pages/components/infinite-auto-complete/locales";`;
    const importReplacement = `import { infiniteAutoCompleteLocales } from "../pages/components/infinite-auto-complete/locales";\nimport { ${camelName}Locales } from "../pages/components/${kebabName}/locales";`;

    const enTarget = `infiniteAutoComplete: infiniteAutoCompleteLocales.en,`;
    const enReplacement = `infiniteAutoComplete: infiniteAutoCompleteLocales.en,\n        ${camelName}: ${camelName}Locales.en,`;

    const viTarget = `infiniteAutoComplete: infiniteAutoCompleteLocales.vi,`;
    const viReplacement = `infiniteAutoComplete: infiniteAutoCompleteLocales.vi,\n        ${camelName}: ${camelName}Locales.vi,`;

    let updated = false;
    if (
      content.includes(importTarget) &&
      !content.includes(`import { ${camelName}Locales }`)
    ) {
      content = content.replace(importTarget, importReplacement);
      updated = true;
    }
    if (
      content.includes(enTarget) &&
      !content.includes(`${camelName}: ${camelName}Locales.en`)
    ) {
      content = content.replace(enTarget, enReplacement);
      updated = true;
    }
    if (
      content.includes(viTarget) &&
      !content.includes(`${camelName}: ${camelName}Locales.vi`)
    ) {
      content = content.replace(viTarget, viReplacement);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(i18nFile, content, "utf8");
      console.log(
        `🔗 Đã cập nhật đa ngôn ngữ trong apps/docs/src/i18n/index.ts`,
      );
    } else {
      console.warn(
        `⚠️ Cảnh báo: Không tự động cập nhật được cấu hình i18n. Vui lòng cấu hình thủ công.`,
      );
    }
  }

  // 8. Run prettier formatting
  try {
    console.log(`\n🧹 Đang định dạng mã nguồn bằng Prettier...`);
    execSync(
      `npx prettier --write packages/ui/src/components/${kebabName} apps/docs/src/pages/components/${kebabName} packages/ui/src/index.ts apps/docs/src/config/navigation.ts apps/docs/src/App.tsx apps/docs/src/i18n/index.ts`,
      {
        cwd: ROOT_DIR,
        stdio: "ignore",
      },
    );
    console.log("✅ Đã tự động định dạng các tệp tin mới và thay đổi.");
  } catch (err) {
    console.warn(
      "⚠️ Cảnh báo: Không chạy được Prettier để định dạng. Bạn hãy chạy `npm run format` sau.",
    );
  }

  console.log(
    `\n🎉 Thành công! Đã tạo và thiết lập component mới "${pascalName}" thành công.`,
  );
  console.log(
    `👉 Bạn có thể bắt đầu phát triển logic tại packages/ui/src/components/${kebabName}/Nps${pascalName}.tsx`,
  );
  console.log(
    `👉 Khởi chạy docs với lệnh "npm run dev:docs" để xem thành quả.`,
  );
}

start().catch((err) => {
  console.error("❌ Đã xảy ra lỗi ngoài ý muốn:", err);
  process.exit(1);
});
