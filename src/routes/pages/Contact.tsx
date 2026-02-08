import contactContent from "../../text-content/contact-page";
import contactImg from "../../assets/img/dad-on-phone.png";
import ContactTemplate from "../../components/organisms/ContactTemplate";

const Contact = () => {
  // const defaultMailto = buildMailto("Contact from DadJokes");

  return (
    <div className="container max-w-150 flex flex-col-reverse lg:flex-row lg:max-w-235 lg:gap-10">
      <img
        className="mx-auto w-[calc(170px+12vw)] mt-[-20px]"
        src={contactImg}
        alt="a dad sitting in a chair laughing while holding a phone"
      />

      <div className="w-full">
        <h2 className="about-heading">{contactContent.heading}</h2>
        <p className="about-paragraph">{contactContent.paragraph1}</p>
        <p className="about-paragraph">
          {contactContent.paragraph2a + " "}
          <span className="underline">{contactContent.paragraph2Span}</span>
          {" " + contactContent.paragraph2b}
        </p>
        <ContactTemplate />
      </div>
    </div>
  );
};

export default Contact;
