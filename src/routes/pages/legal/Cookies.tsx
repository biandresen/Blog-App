import cookiesContent from "../../../text-content/legal-cookies";

const Cookies = () => {
  return (
    <div className="container max-w-150 lg:max-w-235 text-[var(--text1)]">
      <h2 className="about-heading">{cookiesContent.heading}</h2>

      <p className="text-sm opacity-80 mb-6">
        Version {cookiesContent.version} • Last updated: {cookiesContent.lastUpdated}
      </p>

      <p className="about-paragraph">{cookiesContent.intro}</p>

      <div className="mt-6 flex flex-col gap-6">
        {cookiesContent.sections.map((s) => (
          <section key={s.title} className="rounded-xl border border-[var(--text1)]/30 p-4">
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>

            {s.paragraphs?.map((p) => (
              <p key={p} className="about-paragraph">
                {p}
              </p>
            ))}

            {s.bullets?.length ? (
              <ul className="mt-2 ml-5 list-disc opacity-90">
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

export default Cookies;
