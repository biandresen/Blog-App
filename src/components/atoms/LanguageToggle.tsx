import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useUser } from "../../contexts/UserContext";
import { getApiErrorMessage } from "../../lib/apiErrors";
import { safeRequest } from "../../lib/auth";
import { getMe, updateUser } from "../../lib/axios";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { accessToken, setAccessToken, setIsAuthenticated } = useAuth();
  const { user, setUser } = useUser();

  async function onToggle(lang: "NO" | "EN") {
    if (lang === language) return;

    const previousLanguage = language;

    // Always update local UI and localStorage immediately
    setLanguage(lang);

    // Logged-out mode: local language only
    if (!user || !accessToken) return;

    try {
      await safeRequest(updateUser, accessToken, setAccessToken, user.id, {
        preferredLanguage: lang,
      });

      const me = await safeRequest(getMe, accessToken, setAccessToken, lang);

      if (me?.data) {
        setUser(me.data);
        setLanguage(me.data.preferredLanguage ?? lang);
      }
    } catch (error: any) {
      if (error?.code === "SESSION_EXPIRED") {
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const status =
        error?.status ??
        error?.statusCode ??
        error?.response?.status ??
        error?.response?.data?.statusCode;

      if (status === 429) {
        toast.info(
          "Language changed locally. Account preference could not be updated yet because you made too many requests."
        );
        return;
      }

      setLanguage(previousLanguage);
      console.error("Failed to update user language:", error);
      toast.error(getApiErrorMessage(error, "Failed to update language."));
    }
  }

  return (
    <button
      title="Language"
      aria-label="Toggle language"
      type="button"
      onClick={() => onToggle(language === "NO" ? "EN" : "NO")}
    >
      {language}
    </button>
  );
}