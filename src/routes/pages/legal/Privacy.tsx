import privacyContent from "../../../text-content/legal-privacy";

const Privacy = () => {
  return (
    <div className="container max-w-150 lg:max-w-235">
      <h2 className="about-heading">{privacyContent.heading}</h2>

      <p className="text-sm opacity-80 mb-6">
        Version {privacyContent.version} • Last updated: {privacyContent.lastUpdated}
      </p>

      <p className="about-paragraph">{privacyContent.intro}</p>

      <div className="mt-6 flex flex-col gap-6">
        {privacyContent.sections.map((s) => (
          <section key={s.title} className="rounded-xl border border-white/10 p-4">
            <h3 className="text-lg font-semibold mb-2 text-[var(--text1)]">{s.title}</h3>

            {s.paragraphs?.map((p) => (
              <p key={p} className="about-paragraph">
                {p}
              </p>
            ))}

            {s.bullets?.length ? (
              <ul className="mt-2 ml-5 list-disc text-[var(--text1)] opacity-90">
                {s.bullets.map((b) => (
                  <li key={b} className="mt-1">
                    {b}
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

export default Privacy;
