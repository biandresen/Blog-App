import aboutContent from "../../text-content/about-page";

const About = () => {
  return (
    <div className="container max-w-180">
      <h2 className="about-heading">{aboutContent.heading}</h2>
      <p className="about-paragraph">{aboutContent.paragraph1}</p>
      <p className="about-paragraph">{aboutContent.paragraph2}</p>
      <p className="about-paragraph">{aboutContent.paragraph3}</p>
      <p className="about-paragraph">{aboutContent.paragraph4}</p>
    </div>
  );
};

export default About;
