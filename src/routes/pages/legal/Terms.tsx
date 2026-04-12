import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

type IncorporatedPolicy = {
  label: string;
  path: string;
};

type TermsSection = {
  title: string;
  paragraphs: string[];
};

const Terms = () => {
  const { t, tr } = useLanguage();

  const incorporatedPolicies = tr<IncorporatedPolicy[]>("terms.incorporatedPolicies", []);
  const sections = tr<TermsSection[]>("terms.sections", []);

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6 md:py-10 text-[var(--text1)]">
      <header className="mb-8">
        <h1 className="text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
          {t("terms.heading")}
        </h1>

        <p className="mt-5 text-xs uppercase tracking-wide opacity-70 md:text-sm">
          {t("terms.versionText")} {t("terms.version")} • {t("terms.lastUpdatedText")}:{" "}
          {t("terms.lastUpdated")}
        </p>

        <p className="mt-4 text-base leading-8 md:text-lg">{t("terms.intro")}</p>
      </header>

      <div className="flex flex-col gap-5 md:gap-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-[var(--text1)]/20 bg-[var(--background)]/30 px-4 py-4 md:px-5 md:py-5"
          >
            <h2 className="text-lg font-semibold leading-7 md:text-xl">{section.title}</h2>

            <div className="mt-3 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 opacity-95 md:text-base">
                  {paragraph}
                  <div className="mt-3">
                    {paragraph.includes("contact@pundad.app") && (
                      <Link
                        to={"/contact"}
                        className="rounded-full border border-[var(--text1)]/25 bg-[var(--primary)]/25 px-3 py-1.5 text-sm  transition-opacity opacity-90 hover:opacity-100"
                      >
                        {"Contact"}
                      </Link>
                    )}
                  </div>
                </p>
              ))}
            </div>

            {section.title.startsWith("2.") && (
              <div className="mt-4 flex flex-wrap gap-2 md:gap-3">
                {incorporatedPolicies.map((policy) => (
                  <Link
                    key={policy.path}
                    to={policy.path}
                    className="rounded-full border border-[var(--text1)]/25 bg-[var(--primary)]/25 px-3 py-1.5 text-sm  transition-opacity opacity-90 hover:opacity-100"
                  >
                    {policy.label}
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Terms;
