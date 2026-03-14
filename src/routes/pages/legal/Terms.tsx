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
    <div className="container max-w-235 text-[var(--text1)]">
      <h2 className="about-heading">{t("terms.heading")}</h2>

      <p className="text-sm opacity-70">
        {t("terms.versionText")} {t("terms.version")} • {t("terms.lastUpdatedText")}:{" "}
        {t("terms.lastUpdated")}
      </p>

      <p className="about-paragraph mt-4">{t("terms.intro")}</p>

      <section className="rounded-xl border border-[var(--text1)]/30 p-4">
        <p className="text-sm font-semibold">{t("terms.relatedPolicies")}</p>
        <ul className="mt-2 flex flex-col gap-1 text-sm">
          {incorporatedPolicies.map((policy) => (
            <li key={policy.path}>
              <Link className="underline opacity-90 hover:opacity-100" to={policy.path}>
                {policy.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex flex-col gap-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-[var(--text1)]/30 p-4"
          >
            <h3 className="text-lg font-semibold">{section.title}</h3>

            <div className="mt-2 flex flex-col gap-2">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {section.title.startsWith("2.") && (
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {incorporatedPolicies.map((policy) => (
                  <Link
                    key={policy.path}
                    to={policy.path}
                    className="rounded-full border border-[var(--text1)]/30 bg-[var(--primary)] px-3 py-1 underline opacity-90 hover:opacity-100 text-[var(--text2)]"
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