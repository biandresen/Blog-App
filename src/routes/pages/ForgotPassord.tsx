import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { emailValidator } from "../../validators/auth";
import { resetPassword } from "../../lib/axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { getApiErrorMessage, toastApiError } from "../../lib/apiErrors";

const RESEND_COOLDOWN_SECONDS = 60;

const ForgotPassword = () => {
  // --------------------------------------------------
  // Translation helpers
  // --------------------------------------------------
  const { t, tr, tf } = useLanguage();

  // --------------------------------------------------
  // Form state
  // --------------------------------------------------
  const [email, setEmail] = useState<string>("");

  // Whether a reset email was successfully requested
  const [emailSent, setEmailSent] = useState<boolean>(false);

  // Cooldown before allowing another request
  const [newLinkCounter, setNewLinkCounter] = useState<number>(0);

  // Prevent duplicate submits while request is in flight
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Inline validation state
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const infoListItems = tr<string[]>("forgotPassword.infoListItems", []);

  const invalidForm = !input1Valid || !email;
  const cooldownActive = emailSent && newLinkCounter > 0;

  // --------------------------------------------------
  // Prevent repeated welcome toasts on rerender / language changes
  // --------------------------------------------------
  const hasShownWelcomeToast = useRef(false);

  useEffect(() => {
    if (!hasShownWelcomeToast.current) {
      toast.info(t("forgotPassword.welcome"));
      hasShownWelcomeToast.current = true;
    }
  }, [t]);

  // --------------------------------------------------
  // Countdown effect
  // Starts only after a successful request
  // --------------------------------------------------
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

  // --------------------------------------------------
  // Handle forgot-password submit
  // --------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent invalid or repeated submissions
    if (invalidForm || isSubmitting || cooldownActive) return;

    try {
      setIsSubmitting(true);

      await resetPassword({ email });

      // Only start cooldown after a successful request
      setEmailSent(true);
      setNewLinkCounter(RESEND_COOLDOWN_SECONDS);

      toast.success(tf("forgotPassword.success", { email }));
    } catch (err: any) {
      const message = getApiErrorMessage(err, t("forgotPassword.failed"));
      const status =
        err?.status ??
        err?.statusCode ??
        err?.response?.status ??
        err?.response?.data?.statusCode;

      // If the backend returns an email-specific client error,
      // it is reasonable to show it inline under the field.
      if (status === 400) {
        setErrorMsg1(message);
      }

      toastApiError(err, t("forgotPassword.failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{t("forgotPassword.infoHeading")}</h2>

          <div>
            <h3 className="font-medium text-xl">{t("forgotPassword.infoListHeading")}</h3>
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
        <h2 className="input-heading">{t("forgotPassword.inputHeading")}</h2>

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label={t("forgotPassword.emailLabel")}
            value={email}
            errorMsg={errorMsg1}
            placeholder={t("forgotPassword.emailPlaceholder")}
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
            label={t("forgotPassword.button")}
          >
            {isSubmitting ? t("common.loading") : t("forgotPassword.button")}
          </Button>

          <div className="text-center flex flex-col">
            <p className="text-[var(--text1)] mt-3">
              {t("forgotPassword.newLink")}{" "}
              {cooldownActive ? (
                <span className="font-bold block">
                  {tf("forgotPassword.retryIn", { seconds: String(newLinkCounter) })}
                </span>
              ) : (
                <span className="font-bold">{t("forgotPassword.retryNow")}</span>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;