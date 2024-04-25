import { t } from "i18next";

export const categories = () => {
  return [
    {
      title: t("category.all"),
      value: "All",
    },
    {
      title: "İslami İçerikler",
      value: "Islam",
    },
    {
      title: t("category.technology"),
      value: "Technology",
    },
    {
      title: t("category.software"),
      value: "Software",
    },
    {
      title: t("category.hardware"),
      value: "Hardware",
    },
    {
      title: t("category.other"),
      value: "Other",
    },
  ];
};
