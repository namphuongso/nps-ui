import { Space } from "antd";
import { NpsButton } from "@namphuongtechnologi/nps-ui";
import { ComponentDoc } from "../../../components/docs/ComponentDoc";
import type { ExampleConfig, ApiProp } from "../../../components/docs/types";
import { useTranslation } from "react-i18next";
import { SEO } from "../../../components/docs/SEO";

export function ButtonPage() {
  const { t } = useTranslation("button");

  const examples: ExampleConfig[] = [
    {
      id: "ex-basic",
      title: t("examples.basic.title"),
      desc: t("examples.basic.desc"),
      preview: (
        <Space wrap size={[12, 12]}>
          <NpsButton type="primary">Primary</NpsButton>
          <NpsButton>Default</NpsButton>
          <NpsButton type="dashed">Dashed</NpsButton>
          <NpsButton type="text">Text</NpsButton>
          <NpsButton type="link">Link</NpsButton>
        </Space>
      ),
      code: `<NpsButton type="primary">Primary</NpsButton>
<NpsButton>Default</NpsButton>
<NpsButton type="dashed">Dashed</NpsButton>
<NpsButton type="text">Text</NpsButton>
<NpsButton type="link">Link</NpsButton>`,
    },
    {
      id: "ex-rounded",
      title: t("examples.rounded.title"),
      desc: t("examples.rounded.desc"),
      preview: (
        <Space wrap size={[12, 12]}>
          <NpsButton type="primary" rounded="full">
            Primary
          </NpsButton>
          <NpsButton rounded="full">Default</NpsButton>
          <NpsButton type="dashed" rounded="full">
            Dashed
          </NpsButton>
        </Space>
      ),
      code: `<NpsButton type="primary" rounded="full">Primary</NpsButton>
<NpsButton rounded="full">Default</NpsButton>
<NpsButton type="dashed" rounded="full">Dashed</NpsButton>`,
    },
    {
      id: "ex-danger",
      title: t("examples.danger.title"),
      desc: t("examples.danger.desc"),
      preview: (
        <Space wrap size={[12, 12]}>
          <NpsButton type="primary" danger>
            Primary Danger
          </NpsButton>
          <NpsButton danger>Default Danger</NpsButton>
        </Space>
      ),
      code: `<NpsButton type="primary" danger>Primary Danger</NpsButton>
<NpsButton danger>Default Danger</NpsButton>`,
    },
    {
      id: "ex-size",
      title: t("examples.size.title"),
      desc: t("examples.size.desc"),
      preview: (
        <Space wrap align="center" size={[12, 12]}>
          <NpsButton type="primary" size="large">
            Large
          </NpsButton>
          <NpsButton type="primary">Default</NpsButton>
          <NpsButton type="primary" size="small">
            Small
          </NpsButton>
        </Space>
      ),
      code: `<NpsButton type="primary" size="large">Large</NpsButton>
<NpsButton type="primary">Default</NpsButton>
<NpsButton type="primary" size="small">Small</NpsButton>`,
    },
    {
      id: "ex-loading",
      title: t("examples.loading.title"),
      desc: t("examples.loading.desc"),
      preview: (
        <Space wrap size={[12, 12]}>
          <NpsButton type="primary" loading>
            Loading
          </NpsButton>
          <NpsButton loading>Loading</NpsButton>
        </Space>
      ),
      code: `<NpsButton type="primary" loading>Loading</NpsButton>
<NpsButton loading>Loading</NpsButton>`,
    },
  ];

  const customApiData: ApiProp[] = [
    {
      property: "rounded",
      description: t("rounded.desc", {
        defaultValue: "Sets the border-radius of the button.",
      }),
      type: '"default" | "md" | "lg" | "full"',
      default: '"default"',
      version: "0.0.1",
    },
  ];

  return (
    <>
      <SEO title="Button" description={t("description")} />
      <ComponentDoc
        title="Button"
        version="0.0.1"
        description={t("description")}
        importSnippet={`import { NpsButton } from "@namphuongtechnologi/nps-ui";`}
        whenToUse={t("whenToUse.items", { returnObjects: true }) as string[]}
        examples={examples}
        customApiData={customApiData}
        antdDocLink="https://ant.design/components/button#api"
      />
    </>
  );
}

export const buttonAnchorItems = [
  { key: "ex-basic", href: "#ex-basic", title: "Basic" },
  { key: "ex-rounded", href: "#ex-rounded", title: "Rounded" },
  { key: "ex-danger", href: "#ex-danger", title: "Danger" },
  { key: "ex-size", href: "#ex-size", title: "Sizes" },
  { key: "ex-loading", href: "#ex-loading", title: "Loading" },
];
