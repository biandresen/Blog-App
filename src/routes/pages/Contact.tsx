import contactContent from "../../text-content/contact-page";

const Contact = () => {
  return (
    <div className="container max-w-180">
      <h2 className="about-heading">{contactContent.heading}</h2>
      <p className="about-paragraph">{contactContent.paragraph1}</p>
      <p className="about-paragraph">
        {contactContent.paragraph2a+" "}
        <a href={`mailto:${contactContent.paragraph2Span}`} className="underline">{contactContent.paragraph2Span}</a>
        {" "+contactContent.paragraph2b}
      </p>
    </div>
  );
};

export default Contact;
