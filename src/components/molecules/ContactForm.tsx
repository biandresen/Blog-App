import { useMemo, useState, type FormEvent } from "react";
import { toast } from "react-toastify";

import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useAutoResizeTextarea } from "../../hooks/useAutoResizeTextarea";
import { emailValidator } from "../../validators/auth";
import { useLanguage } from "../../contexts/LanguageContext";
import { sendContactMessage } from "../../lib/axios";

const EMAIL = "contact@pundad.app";
const TOPICS = ["BUG", "FEATURE", "SUGGESTION", "FEEDBACK"] as const;
type Topic = (typeof TOPICS)[number];

const buildMailtoHref = (email: string, subject: string, body: string) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
};

const buildMessageBody = (name: string, email: string, message: string, topicLabel: string) =>
  `${topicLabel}\n\nFrom: ${name}\nReply-to: ${email}\n\n${message}`;

const ContactForm = () => {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic>(`FEEDBACK`);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTopics = useMemo(
    () =>
      TOPICS.map((topicOption) => ({
        value: topicOption,
        label: t(`contactTemplate.topics.${topicOption}`),
      })),
    [t],
  );

  const currentSubject = t(`contactTemplate.subjects.${topic}`);
  const currentTopicLabel = t(`contactTemplate.topics.${topic}`);
  const body = buildMessageBody(name.trim(), email.trim(), message.trim(), currentTopicLabel);

  const invalidForm = !name.trim() || !email.trim() || !message.trim() || Boolean(emailValidator(email));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationKey = emailValidator(email);
    setEmailError(validationKey ? t(validationKey) : "");

    if (invalidForm) {
      toast.error(t("contact.form.invalidForm"));
      return;
    }

    try {
      setIsSubmitting(true);
      await sendContactMessage(
        { name: name.trim(), email: email.trim(), topic, message: message.trim() },
        language,
      );
      toast.success(t("contact.form.sendSuccess"));
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error(t("contact.form.sendFail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEmailApp = () => {
    if (invalidForm) {
      toast.error(t("contact.form.invalidForm"));
      return;
    }

    window.location.href = buildMailtoHref(EMAIL, currentSubject, body);
  };

  const handleCopy = async () => {
    const validationKey = emailValidator(email);
    setEmailError(validationKey ? t(validationKey) : "");

    if (invalidForm) {
      toast.error(t("contact.form.invalidForm"));
      return;
    }

    const textToCopy = `To: ${EMAIL}\nSubject: ${currentSubject}\n\n${body}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success(t("contact.form.copySuccess"));
    } catch {
      toast.error(t("contact.form.copyError"));
    }
  };

  const { ref: messageRef, handleInput: handleMessageInput } = useAutoResizeTextarea<HTMLTextAreaElement>(
    message,
    true,
  );

  return (
    <section className="mt-8 w-full max-w-[420px] rounded-xl border border-[var(--text1)]/10 bg-[var(--button1)] p-5 mx-auto">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-[var(--text2)]">{t("contact.form.heading")}</h3>
        <p className="text-sm text-[var(--text2)] opacity-80">{t("contact.form.description")}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input
          className="text-[var(--text2)]"
          id="contactName"
          label={t("contact.form.nameLabel")}
          value={name}
          placeholder={t("contact.form.namePlaceholder")}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          className="text-[var(--text2)]"
          id="contactEmail"
          type="email"
          label={t("contact.form.emailLabel")}
          value={email}
          inputValid={emailError === ""}
          errorMsg={emailError}
          placeholder={t("contact.form.emailPlaceholder")}
          required
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            const validationKey = emailValidator(value);
            setEmailError(validationKey ? t(validationKey) : "");
          }}
        />

        <div className="flex flex-col">
          <label
            htmlFor="contactTopic"
            className="text-[var(--text2)] text-lg font-semibold md:text-2xl my-1"
          >
            {t("contact.form.topicLabel")}
          </label>
          <select
            id="contactTopic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic)}
            className="w-full rounded-3xl border border-transparent bg-[var(--bg)] px-4 py-2 text-base text-xs md:text-sm font-semibold text-[var(--text1)] outline-none transition duration-150 focus:border-[var(--text2)] focus:ring-2 focus:ring-[var(--text2)]/20"
          >
            {availableTopics.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="contactMessage"
            className="text-[var(--text2)] text-lg font-semibold md:text-2xl my-1"
          >
            {t("contact.form.messageLabel")}
          </label>
          <textarea
            id="contactMessage"
            ref={messageRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleMessageInput();
            }}
            placeholder={t("contact.form.messagePlaceholder")}
            required
            className="w-full min-h-[80px] rounded-3xl bg-[var(--bg)] px-4 py-3 text-lg font-semibold text-[var(--text1)] outline-none placeholder:text-[0.9rem]"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:items-center">
          <Button
            type="submit"
            variant="tertiary"
            className="w-full max-w-[320px] mx-auto sm:mx-0"
            disabled={invalidForm || isSubmitting}
            label={t("contact.form.send")}
          >
            {isSubmitting ? t("common.loading") : t("contact.form.send")}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full max-w-[320px] mx-auto sm:w-auto sm:mx-0 text-[var(--text2)] border-[var(--text2)]!"
            onClick={handleOpenEmailApp}
            label={t("contact.form.openEmailApp")}
          >
            {t("contact.form.openEmailApp")}
          </Button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="text-xs underline hover:brightness-110"
          title={t("contact.form.copy")}
        >
          {t("contact.form.copy")}
        </button>

        <p className="text-xs text-[var(--text2)] opacity-80">{t("contact.form.fallbackInfo")}</p>
      </form>
    </section>
  );
};

export default ContactForm;
