import FeaturedPostTemplate from "./FeaturedPostTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function MostCommentedWeek() {
  const { t } = useLanguage();

  return (
    <FeaturedPostTemplate
      slug="most-commented-week"
      title={t("featured.mostCommentedWeek.title")}
      subtitle={t("featured.mostCommentedWeek.subtitle")}
    />
  );
}