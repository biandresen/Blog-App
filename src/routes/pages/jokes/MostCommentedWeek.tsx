import FeaturedJokeTemplate from "./FeaturedJokeTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function MostCommentedWeek() {
  const { t } = useLanguage();

  return (
    <FeaturedJokeTemplate
      slug="most-commented-week"
      title={t("featured.mostCommentedWeek.title")}
      subtitle={t("featured.mostCommentedWeek.subtitle")}
    />
  );
}