import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { passwordValidator } from "../../validators/auth";
import { newPassword } from "../../lib/axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { toastApiError, getApiErrorMessage } from "../../lib/apiErrors";

const ResetPassword = () => {
  // --------------------------------------------------
  // Translation helpers
  // --------------------------------------------------
  const { t, tr } = useLanguage();

  // --------------------------------------------------
  // Navigation + route params
  // --------------------------------------------------
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  // --------------------------------------------------
  // Prevent repeated welcome toasts on rerender / language changes
  // --------------------------------------------------
  const hasShownWelcomeToast = useRef(false);

  useEffect(() => {
    if (!hasShownWelcomeToast.current) {
      toast.info(t("resetPassword.welcome"));
      hasShownWelcomeToast.current = true;
    }
  }, [t]);

  // --------------------------------------------------
  // Static translated content
  // --------------------------------------------------
  const infoListItems = tr<string[]>("resetPassword.infoListItems", []);

  // --------------------------------------------------
  // Form state
  // --------------------------------------------------
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  /**
   * One shared visibility state for both password fields.
   * This is the more common and cleaner UX pattern.
   */
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // --------------------------------------------------
  // Validation / error state
  // --------------------------------------------------
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  // --------------------------------------------------
  // Prevent duplicate submissions while request is in flight
  // --------------------------------------------------
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------------------------------
  // Derived state
  // --------------------------------------------------
  const invalidForm =
    passwordErrors.length > 0 ||
    !input2Valid ||
    !password ||
    !passwordConfirmation;

  // --------------------------------------------------
  // Keep confirm-password validation in sync if the main password changes
  // --------------------------------------------------
  useEffect(() => {
    if (!passwordConfirmation) return;

    const isValid = passwordConfirmation === password;
    setInput2Valid(isValid);
    setErrorMsg2(isValid ? "" : t("resetPassword.passwordsDoNotMatch"));
  }, [password, passwordConfirmation, t]);

  // --------------------------------------------------
  // Handle reset-password submit
  // --------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Guard against repeated submits and invalid form state
    if (invalidForm || isSubmitting) return;

    if (!token) {
      toast.error(t("resetPassword.missingToken"));
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await newPassword(token, password);

      if (res.statusCode !== 200) {
        throw new Error(res.message || t("resetPassword.failed"));
      }

      toast.success(res.message || t("resetPassword.success"));
      navigate("/login");
    } catch (err: any) {
      const message = getApiErrorMessage(err, t("resetPassword.genericError"));

      /**
       * For this page, most failures are general request failures,
       * so a toast is the main feedback channel.
       * If your backend later returns structured field errors here,
       * you can map them similarly to the Register page.
       */
      toastApiError(err, t("resetPassword.genericError"));

      /**
       * Optional:
       * If you want to show token/password-specific API failures inline later,
       * you can add dedicated state for that.
       * For now we keep this page simple and consistent.
       */
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{t("resetPassword.infoHeading")}</h2>

          <div>
            <h3 className="font-medium text-xl">{t("resetPassword.infoListHeading")}</h3>
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
        <h2 className="input-heading">{t("resetPassword.inputHeading")}</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              label={t("resetPassword.passwordLabel")}
              value={password}
              placeholder={t("resetPassword.passwordPlaceholder")}
              required
              inputValid={passwordErrors.length === 0}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                setPasswordErrors(passwordValidator(value));
              }}
            />

            <Button
              type="button"
              aria-label={
                showPassword
                  ? t("resetPassword.hidePassword", "Hide password")
                  : t("resetPassword.showPassword", "Show password")
              }
              label={
                showPassword
                  ? t("resetPassword.hidePassword", "Hide password")
                  : t("resetPassword.showPassword", "Show password")
              }
              size="zero"
              className="bg-transparent absolute left-27 top-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaEye size={20} className="text-[var(--text1)]" />
              ) : (
                <FaEyeSlash size={20} className="text-[var(--text1)]" />
              )}
            </Button>
          </div>

          {passwordErrors.length > 0 && (
            <ul className="text-[0.9rem] text-[var(--error)] my-2">
              {passwordErrors.map((message) => (
                <li key={message}>• {t(message, message)}</li>
              ))}
            </ul>
          )}

          <div className="flex relative">
            <Input
              id="passwordConfirmation"
              type={showPassword ? "text" : "password"}
              label={t("resetPassword.confirmPasswordLabel")}
              value={passwordConfirmation}
              errorMsg={errorMsg2}
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              required
              inputValid={input2Valid}
              onChange={(e) => {
                const value = e.target.value;
                setPasswordConfirmation(value);

                const isValid = value === password;
                setInput2Valid(isValid);
                setErrorMsg2(isValid ? "" : t("resetPassword.passwordsDoNotMatch"));
              }}
            />
          </div>

          <Button
            type="submit"
            variant="tertiary"
            className={`w-full mt-7 ${
              invalidForm || isSubmitting ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={invalidForm || isSubmitting}
            label={t("resetPassword.button")}
          >
            {isSubmitting ? t("common.loading") : t("resetPassword.button")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;