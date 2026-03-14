import FeaturedPostTemplate from "./FeaturedPostTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function FastestGrowing() {
  const { t } = useLanguage();

  return (
    <FeaturedPostTemplate
      slug="fastest-growing"
      title={t("featured.fastestGrowing.title")}
      subtitle={t("featured.fastestGrowing.subtitle")}
    />
  );
}