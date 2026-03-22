import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../components/atoms/Button";
import { verifyEmail } from "../../lib/axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { getApiErrorMessage } from "../../lib/apiErrors";

const VerifyEmail = () => {
  const { t } = useLanguage();
  const { token } = useParams<{ token: string }>();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const run = async () => {
      if (!token) {
        setErrorMessage(t("verifyEmail.missingToken", "Missing verification token"));
        setLoading(false);
        return;
      }

      try {
        const res = await verifyEmail(token);

        if (res.statusCode !== 200) {
          throw new Error(res.message || t("verifyEmail.failed", "Email verification failed"));
        }

        setVerified(true);
        toast.success(res.message || t("verifyEmail.success", "Email verified successfully"));
      } catch (err: any) {
        const message = getApiErrorMessage(
          err,
          t("verifyEmail.failed", "Email verification failed")
        );
        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [token, t]);

  return (
    <div className="container py-8">
      <div className="single-container max-w-100 mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">
          {t("verifyEmail.heading")}
        </h1>

        {loading && <p>{t("common.loading")}</p>}

        {!loading && verified && (
          <div className="space-y-4">
            <p>{t("verifyEmail.success")}</p>
            <Link to="/login">
              <Button variant="tertiary" label={t("verifyEmail.goToLogin")}>
                {t("verifyEmail.goToLogin")}
              </Button>
            </Link>
          </div>
        )}

        {!loading && !verified && (
          <div className="space-y-4">
            <p>{errorMessage}</p>
            <Link to="/resend-verification">
              <Button
                variant="tertiary"
                label={t("verifyEmail.resend")}
              >
                {t("verifyEmail.resend")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;