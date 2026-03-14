import FeaturedPostTemplate from "./FeaturedPostTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function TrendingWeek() {
  const { t } = useLanguage();

  return (
    <FeaturedPostTemplate
      slug="trending-week"
      title={t("featured.trendingWeek.title")}
      subtitle={t("featured.trendingWeek.subtitle")}
    />
  );
}