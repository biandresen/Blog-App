import FeaturedJokeTemplate from "./FeaturedJokeTemplate";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function FastestGrowing() {
  const { t } = useLanguage();

  return (
    <FeaturedJokeTemplate
      slug="fastest-growing"
      title={t("featured.fastestGrowing.title")}
      subtitle={t("featured.fastestGrowing.subtitle")}
    />
  );
}