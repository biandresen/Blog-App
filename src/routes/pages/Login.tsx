import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { safeRequest } from "../../lib/auth";
import { getMe, loginUser } from "../../lib/axios";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { userInputValidator, loginPasswordValidator } from "../../validators/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getApiErrorMessage, toastApiError } from "../../lib/apiErrors";

const Login = () => {
  // --------------------------------------------------
  // Local form state
  // --------------------------------------------------
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Inline validation / field errors
  const [input1Valid, setInput1Valid] = useState(true);
  const [errorMsg1, setErrorMsg1] = useState("");

  const [input2Valid, setInput2Valid] = useState(true);
  const [errorMsg2, setErrorMsg2] = useState("");

  // Prevent duplicate submissions while request is in flight
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent welcome toast from showing multiple times on rerenders / language changes
  const hasShownWelcomeToast = useRef(false);

  const navigate = useNavigate();

  const invalidForm = !input1Valid || !input2Valid || !userInput || !password;

  const { setAccessToken, setIsAuthenticated } = useAuth();
  const { setUser, user } = useUser();
  const { language, setLanguage, t, tr, tf } = useLanguage();

  const infoListItems = tr<string[]>("login.infoListItems", []);

  // --------------------------------------------------
  // Redirect logged-in users away from login page
  // Show welcome toast only once for non-authenticated users
  // --------------------------------------------------
  useEffect(() => {
    if (user) {
      navigate("/jokes/daily-joke");
      return;
    }

    if (!hasShownWelcomeToast.current) {
      toast.info(t("login.welcome"));
      hasShownWelcomeToast.current = true;
    }
  }, [user, navigate, t]);

  // --------------------------------------------------
  // Handle login submit
  // --------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Guard against invalid form or repeated submits
    if (invalidForm || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const res = await loginUser({ userInput, password }, language);

      if (res.statusCode !== 200) {
        throw new Error(res.message || t("login.loginFailed"));
      }

      const accessToken = res.data?.accessToken;
      if (typeof accessToken !== "string" || !accessToken) {
        throw new Error(t("login.missingAccessToken"));
      }

      // Use backend preferred language when available
      const preferred =
        res.data?.user?.preferredLanguage === "EN" || res.data?.user?.preferredLanguage === "NO"
          ? res.data.user.preferredLanguage
          : language;

      setLanguage(preferred);

      // Fetch the authenticated user before committing auth state globally
      const meRes = await safeRequest(getMe, accessToken, setAccessToken, preferred);
      const me = meRes?.data;

      if (!me) {
        throw new Error(t("login.loginFailed"));
      }

      // Commit auth state only after all required login steps succeed
      setAccessToken(accessToken);
      setIsAuthenticated(true);
      setUser(me);

      toast.success(tf("login.success", { username: me.username }));
      navigate("/jokes/daily-joke");
    } catch (err: any) {
      const message = getApiErrorMessage(err, t("login.loginFailed"));
      const status =
        err?.status ??
        err?.statusCode ??
        err?.response?.status ??
        err?.response?.data?.statusCode;

      // Expected auth failures: show inline under password field
      if (status === 400 || status === 401) {
        setErrorMsg2(message);
        return;
      }

      // Unexpected/general API errors: toast for visibility
      // Do not force every general error into the password field
      toastApiError(err, t("login.loginFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{t("login.infoHeading")}</h2>
          <div>
            <h3 className="font-medium text-xl">{t("login.infoListHeading")}</h3>
            <hr className="mb-2" />
            <ul>
              {infoListItems.map((list) => (
                <li className="list-disc ml-4 text-lg" key={list}>
                  {list}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="input-container">
        <h2 className="input-heading">{t("login.inputHeading")}</h2>

        <form onSubmit={handleSubmit}>
          <Input
            id="userInput"
            label={t("login.userInputLabel")}
            value={userInput}
            errorMsg={errorMsg1}
            placeholder={t("login.userInputPlaceholder")}
            required
            inputValid={input1Valid}
            onChange={(e) => {
              const value = e.target.value;
              setUserInput(value);

              const validationKey = userInputValidator(value);
              setInput1Valid(!validationKey);
              setErrorMsg1(validationKey ? t(validationKey) : "");
            }}
          />

          <div className="flex relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              label={t("login.passwordLabel")}
              value={password}
              errorMsg={errorMsg2}
              placeholder={t("login.passwordPlaceholder")}
              required
              inputValid={input2Valid}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                const validationKey = loginPasswordValidator(value);
                setInput2Valid(!validationKey);
                setErrorMsg2(validationKey ? t(validationKey) : "");
              }}
            />

            <Button
              type="button"
              aria-label={showPassword ? t("login.hidePassword", "Hide password") : t("login.showPassword", "Show password")}
              label={showPassword ? t("login.hidePassword", "Hide password") : t("login.showPassword", "Show password")}
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

          <Button
            type="submit"
            variant="tertiary"
            className="w-full mt-7"
            label={t("login.button")}
            disabled={invalidForm || isSubmitting}
          >
            {isSubmitting ? t("common.loading") : t("login.button")}
          </Button>

          <div className="text-center flex flex-col">
            <Link to="/register" className="text-[var(--text1)] mt-3">
              {t("login.goToRegister")} <span className="font-bold">{t("login.link")}</span>
            </Link>
            <Link to="/forgotPassword" className="text-[var(--text1)] mt-3">
              {t("login.forgotPassword")} <span className="font-bold">{t("login.link2")}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;