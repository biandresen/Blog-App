import contactImg from "../../assets/img/dad-on-phone.png";
import ContactTemplate from "../../components/organisms/ContactTemplate";
import { useLanguage } from "../../contexts/LanguageContext";

const Contact = () => {
const { t } = useLanguage();

  return (
    <div className="container max-w-150 flex flex-col-reverse lg:flex-row lg:max-w-235 lg:gap-10">
      <img
        className="mx-auto w-[calc(170px+12vw)] mt-[-20px]"
        src={contactImg}
        alt="a dad sitting in a chair laughing while holding a phone"
      />

      <div className="w-full">
        <h2 className="about-heading">{t("contact.heading")}</h2>
        <p className="about-paragraph">{t("contact.paragraph1")}</p>
        <p className="about-paragraph">
          {t("contact.paragraph2a") + " "}
          <span className="underline">{t("contact.paragraph2Span")}</span>
          {" " + t("contact.paragraph2b")}
        </p>
        <ContactTemplate />
      </div>
    </div>
  );
};

export default Contact;
