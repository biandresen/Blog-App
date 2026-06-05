import FeaturedJokeTemplate from "./FeaturedJokeTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function TrendingWeek() {
  const { t } = useLanguage();

  return (
    <FeaturedJokeTemplate
      slug="top-creator-month"
      title={t("featured.topCreatorMonth.title")}
      subtitle={t("featured.topCreatorMonth.subtitle")}
    />
  );
}