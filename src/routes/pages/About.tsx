import aboutContent from "../../text-content/about-page";
import aboutImg from "../../assets/img/dad-in-chair.png";

const About = () => {
  return (
    <div className="container max-w-150 flex flex-col-reverse lg:flex-row lg:max-w-235 lg:gap-10 lg:justify-self-center">
      <img
        className="mx-auto h-fit w-[calc(170px+12vw)] mt-[-20px]"
        src={aboutImg}
        alt="a dad sitting in a chair laughing"
      />

      <section className="w-full">
        <h2 className="about-heading">{aboutContent.heading}</h2>
        <p className="about-paragraph">{aboutContent.paragraph1}</p>
        <p className="about-paragraph">{aboutContent.paragraph2}</p>
        <p className="about-paragraph">{aboutContent.paragraph3}</p>
        <p className="about-paragraph">{aboutContent.paragraph4}</p>

        {/* Features section */}
        <section className="mt-10">
          <h3 className="text-[var(--text1)] text-2xl font-bold mb-4">
            {aboutContent.featuresHeading}
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutContent.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-[var(--bg-input)] p-4"
              >
                <div className="text-[var(--text1)] font-semibold mb-1">
                  {f.title}
                </div>
                <p className="text-[var(--text1)] opacity-80 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default About;