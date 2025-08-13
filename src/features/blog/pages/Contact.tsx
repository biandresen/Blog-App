const Contact = () => {
  const contactHeading = "CONTACT US";

  return (
    <div className="container max-w-180">
      <h2 className="text-[var(--text1)] text-3xl md:text-4xl text-center mt-3 mb-5">{contactHeading}</h2>
      <p className="text-[var(--text1)] text-lg md:text-xl mb-4">
        Contact us for any inquiries, feedback, or support related to our blog platform. We value your input
        and are here to assist you.
      </p>
      <p className="text-[var(--text1)] text-lg md:text-xl mb-4">
        You can reach us via email at <span className="underline">info@bloggy.com</span> or through our social
        media channels. We strive to respond to all messages within 24-48 hours.
      </p>
    </div>
  );
};

export default Contact;
