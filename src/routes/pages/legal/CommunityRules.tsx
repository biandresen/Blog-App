import { useLanguage } from "../../../contexts/LanguageContext";

type RulesSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const CommunityRules = () => {
  const { t, tr } = useLanguage();

  const sections = tr<RulesSection[]>("rules.sections", []);

  return (
    <div className="container max-w-150 lg:max-w-235 text-[var(--text1)]">
      <h2 className="about-heading">{t("rules.heading")}</h2>

      <p className="text-sm opacity-80 mb-6">
        {t("rules.versionText", "Version")} {t("rules.version")} •{" "}
        {t("rules.lastUpdatedText", "Last updated")} {t("rules.lastUpdated")}
      </p>

      <p className="about-paragraph">{t("rules.intro")}</p>

      <div className="mt-6 flex flex-col gap-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-[var(--text1)]/30 p-4"
          >
            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="about-paragraph">
                {paragraph}
              </p>
            ))}

            {section.bullets?.length ? (
              <ul className="mt-2 ml-5 list-disc opacity-90">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="mt-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
};

export default CommunityRules;