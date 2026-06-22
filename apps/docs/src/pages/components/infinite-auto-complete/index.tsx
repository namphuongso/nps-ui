import { NpsInfiniteAutoComplete } from "@namphuongtechnologi/nps-ui";
import { ComponentDoc } from "../../../components/docs/ComponentDoc";
import type { ExampleConfig, ApiProp } from "../../../components/docs/types";
import { useTranslation } from "react-i18next";
import { SEO } from "../../../components/docs/SEO";

export function InfiniteAutoCompletePage() {
  const { t } = useTranslation("infiniteAutoComplete");

  const examples: ExampleConfig[] = [
    {
      id: "ex-basic",
      title: t("examples.basic.title"),
      desc: t("examples.basic.desc"),
      preview: <NpsInfiniteAutoComplete />,
      code: `<NpsInfiniteAutoComplete />`,
    },
  ];

  const customApiData: ApiProp[] = [
    // Bổ sung API của các props tùy chỉnh tại đây
  ];

  return (
    <>
      <SEO title="InfiniteAutoComplete" description={t("description")} />
      <ComponentDoc
        title="InfiniteAutoComplete"
        version="0.0.1"
        description={t("description")}
        importSnippet={`import { NpsInfiniteAutoComplete } from "@namphuongtechnologi/nps-ui";`}
        whenToUse={t("whenToUse.items", { returnObjects: true }) as string[]}
        examples={examples}
        customApiData={customApiData}
      />
    </>
  );
}

export const infiniteAutoCompleteAnchorItems = [
  { key: "ex-basic", href: "#ex-basic", title: "Basic" },
];
