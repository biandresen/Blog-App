import aboutContent from "../../text-content/about-page";
import aboutImg from "../../assets/img/dad-in-chair.png";

const About = () => {
  return (
    <div className="container max-w-150 flex flex-col-reverse lg:flex-row lg:max-w-235 lg:gap-10 lg:justify-self-center">
      <img
        className="mx-auto w-[calc(170px+12vw)] mt-[-20px]"
        src={aboutImg}
        alt="a dad sitting in a chair laughing"
      />
      <div>
        <h2 className="about-heading">{aboutContent.heading}</h2>
        <p className="about-paragraph">{aboutContent.paragraph1}</p>
        <p className="about-paragraph">{aboutContent.paragraph2}</p>
        <p className="about-paragraph">{aboutContent.paragraph3}</p>
        <p className="about-paragraph">{aboutContent.paragraph4}</p>
      </div>
    </div>
  );
};

export default About;
