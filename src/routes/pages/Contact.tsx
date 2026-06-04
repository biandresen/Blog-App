import contactImg from "../../assets/img/dad-on-phone.png";
import ContactForm from "../../components/molecules/ContactForm";
import { useLanguage } from "../../contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="container max-w-150 flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start lg:max-w-235 lg:gap-10">
      <div className="w-full lg:w-1/2 lg:max-w-[420px]">
        <img
          className="mx-auto h-fit w-[calc(170px+12vw)] mt-[-20px]"
          src={contactImg}
          alt="a dad sitting in a chair laughing while holding a phone"
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="about-heading">{t("contact.heading")}</h2>
        <p className="about-paragraph">{t("contact.paragraph1")}</p>
        <p className="about-paragraph">
          {t("contact.paragraph2a") + " "}
          <a href="mailto:contact@pundad.app" className="text-[var(--text1)] hover:underline">
            <span className="underline">{t("contact.paragraph2Span")}</span>
          </a>
          {" " + t("contact.paragraph2b")}
        </p>

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
