import contactContent from "../../text-content/contact-page";

const Contact = () => {
  return (
    <div className="container max-w-180">
      <h2 className="about-heading">{contactContent.heading}</h2>
      <p className="about-paragraph">{contactContent.paragraph1}</p>
      <p className="about-paragraph">
        {contactContent.paragraph2a}
        <span className="underline">{contactContent.paragraph2Span}</span>
        {contactContent.paragraph2b}
      </p>
    </div>
  );
};

export default Contact;
