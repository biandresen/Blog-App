import { useLanguage } from "../../../contexts/LanguageContext";

type CookiesSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const Cookies = () => {
  const { t, tr } = useLanguage();

  const sections = tr<CookiesSection[]>("cookies.sections", []);

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6 md:py-10 text-[var(--text1)]">
      <header className="mb-8">
        <h1 className="text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
          {t("cookies.heading")}
        </h1>

        <p className="mt-5 text-xs uppercase tracking-wide opacity-70 md:text-sm">
          {t("cookies.versionText")} {t("cookies.version")} • {t("cookies.lastUpdatedText")}:{" "}
          {t("cookies.lastUpdated")}
        </p>

        <p className="mt-4 text-base leading-8 md:text-lg">{t("cookies.intro")}</p>
      </header>

      <div className="flex flex-col gap-5 md:gap-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-[var(--text1)]/20 bg-[var(--background)]/30 px-4 py-4 md:px-5 md:py-5"
          >
            <h2 className="text-lg font-semibold leading-7 md:text-xl">{section.title}</h2>

            {section.paragraphs?.length ?
              <div className="mt-3 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 opacity-95 md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            : null}

            {section.bullets?.length ?
              <ul className="mt-4 ml-5 list-disc space-y-2 text-sm leading-7 opacity-95 md:text-base">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            : null}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Cookies;
