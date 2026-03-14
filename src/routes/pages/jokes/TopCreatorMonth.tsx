import FeaturedPostTemplate from "./FeaturedPostTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function TrendingWeek() {
  const { t } = useLanguage();

  return (
    <FeaturedPostTemplate
      slug="top-creator-month"
      title={t("featured.topCreatorMonth.title")}
      subtitle={t("featured.topCreatorMonth.subtitle")}
    />
  );
}