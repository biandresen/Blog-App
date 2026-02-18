import { Link } from "react-router-dom";
import termsContent from "../../../text-content/legal-terms";

const Terms = () => {
  return (
    <div className="container max-w-235 text-[var(--text1)]">
      <h2 className="about-heading">{termsContent.heading}</h2>

      <p className="text-sm opacity-70">
        Version {termsContent.version} • Last updated: {termsContent.lastUpdated}
      </p>

      <p className="about-paragraph mt-4">{termsContent.intro}</p>

      {/* NEW: quick “Related policies” block */}
      <section className="rounded-xl border border-[var(--text1)]/30 p-4">
        <p className="text-sm font-semibold">Related policies</p>
        <ul className="mt-2 flex flex-col gap-1 text-sm">
          {termsContent.incorporatedPolicies.map((p) => (
            <li key={p.path}>
              <Link className="underline opacity-90 hover:opacity-100" to={p.path}>
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex flex-col gap-6">
        {termsContent.sections.map((section) => (
          <section key={section.title} className="rounded-xl border border-[var(--text1)]/30 p-4">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="mt-2 flex flex-col gap-2">
              {section.paragraphs.map((p) => (
                <p key={p} className="about-paragraph">
                  {p}
                </p>
              ))}
            </div>

            {/* Optional: show links directly under the incorporation section */}
            {section.title.startsWith("2.") && (
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {termsContent.incorporatedPolicies.map((p) => (
                  <Link
                    key={p.path}
                    to={p.path}
                    className="rounded-full border border-[var(--text1)]/30 bg-[var(--primary)] px-3 py-1 underline opacity-90 hover:opacity-100 text-[var(--text2)]"
                  >
                    {p.label}
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
