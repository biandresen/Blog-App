import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { emailValidator } from "../../validators/auth";
import { resendVerificationEmail } from "../../lib/axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { getApiErrorMessage, toastApiError } from "../../lib/apiErrors";

const RESEND_COOLDOWN_SECONDS = 60;

const ResendVerification = () => {
  const { t, tf, tr } = useLanguage();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [emailSent, setEmailSent] = useState(false);
  const [newLinkCounter, setNewLinkCounter] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [input1Valid, setInput1Valid] = useState(true);
  const [errorMsg1, setErrorMsg1] = useState("");

  const invalidForm = !input1Valid || !email;
  const cooldownActive = emailSent && newLinkCounter > 0;

  const hasShownWelcomeToast = useRef(false);

  const infoListItems = tr<string[]>("resendVerification.infoListItems", []);

  useEffect(() => {
    if (!hasShownWelcomeToast.current) {
      toast.info(t("resendVerification.welcome"));
      hasShownWelcomeToast.current = true;
    }
  }, [t]);

  useEffect(() => {
    if (!cooldownActive) return;

    const timer = window.setInterval(() => {
      setNewLinkCounter((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setEmailSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [cooldownActive]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (invalidForm || isSubmitting || cooldownActive) return;

    try {
      setIsSubmitting(true);
      const normalizedEmail = email.trim().toLowerCase();

      await resendVerificationEmail({ email: normalizedEmail });

      setEmailSent(true);
      setNewLinkCounter(RESEND_COOLDOWN_SECONDS);

      toast.success(tf("resendVerification.success", { email: normalizedEmail }));
    } catch (err: any) {
      const message = getApiErrorMessage(err, t("resendVerification.failed"));
      const status =
        err?.status ??
        err?.statusCode ??
        err?.response?.status ??
        err?.response?.data?.statusCode;

      if (status === 400 || status === 403 || status === 404) {
        setErrorMsg1(message);
      }

      toastApiError(err, t("resendVerification.failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{t("resendVerification.infoHeading")}</h2>

          <div>
            <h3 className="font-medium text-xl">{t("resendVerification.infoListHeading")}</h3>
            <hr className="mb-2" />

            <ol>
              {infoListItems.map((list) => (
                <li className="ml-4 text-lg" key={list}>
                  {list}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <div className="input-container">
        <h2 className="input-heading">{t("resendVerification.inputHeading")}</h2>

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label={t("resendVerification.emailLabel")}
            value={email}
            errorMsg={errorMsg1}
            placeholder={t("resendVerification.emailPlaceholder")}
            required
            inputValid={input1Valid}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);

              const validationKey = emailValidator(value);
              setInput1Valid(!validationKey);
              setErrorMsg1(validationKey ? t(validationKey) : "");
            }}
          />

          <Button
            type="submit"
            variant="tertiary"
            disabled={invalidForm || isSubmitting || cooldownActive}
            className="w-full mt-7 disabled:cursor-not-allowed disabled:opacity-50"
            label={t("resendVerification.button")}
          >
            {isSubmitting ? t("common.loading") : t("resendVerification.button")}
          </Button>

          <div className="text-center flex flex-col">
            <p className="text-[var(--text1)] mt-3">
              {cooldownActive ? (
                <span className="font-bold block">
                  {tf("resendVerification.retryIn", { seconds: String(newLinkCounter) })}
                </span>
              ) : (
                <span className="font-bold">
                  {t("resendVerification.retryNow")}
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResendVerification;