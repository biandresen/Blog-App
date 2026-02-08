import Button from "../../components/atoms/Button";
import contactContent from "../../text-content/contact-page";
import contactImg from "../../assets/img/dad-on-phone.png";

const Contact = () => {
  return (
    <div className="container max-w-150 flex flex-col-reverse lg:flex-row lg:max-w-235 lg:gap-10">
      <img
        className="mx-auto w-[calc(170px+12vw)]"
        src={contactImg}
        alt="a dad sitting in a chair laughing"
      />
      <div>
        <h2 className="about-heading">{contactContent.heading}</h2>
        <p className="about-paragraph">{contactContent.paragraph1}</p>
        <p className="about-paragraph">
          {contactContent.paragraph2a+" "}
          <span className="underline">{contactContent.paragraph2Span}</span>
          {" "+contactContent.paragraph2b}
        </p>
        <a href="mailto:kontakt@andresensolutions.no?subject=Contact%20from%20Dadjokes">
            <Button label="email">
            Email us here
            </Button>
        </a>
      </div>
    </div>
  );
};

export default Contact;