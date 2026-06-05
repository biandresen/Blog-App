import FeaturedJokeTemplate from "./FeaturedJokeTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function TrendingWeek() {
  const { t } = useLanguage();

  return (
    <FeaturedJokeTemplate
      slug="trending-week"
      title={t("featured.trendingWeek.title")}
      subtitle={t("featured.trendingWeek.subtitle")}
    />
  );
}