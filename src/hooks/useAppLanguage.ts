import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useLanguage } from "../contexts/LanguageContext";
import type { AppLanguage } from "../i18n/translations";
import { normalizeLanguage } from "../lib/utils";

export function useAppLanguage() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const setAppLanguage = useCallback(
    (lang: AppLanguage) => {
      const normalized = normalizeLanguage(lang);

      // Update app state
      setLanguage(normalized);

      // Update current URL query using React Router
      const params = new URLSearchParams(location.search);
      params.set("lang", normalized.toLowerCase());

      navigate(
        {
          pathname: location.pathname,
          search: `?${params.toString()}`,
          hash: location.hash,
        },
        { replace: true },
      );
    },
    [setLanguage, location.pathname, location.search, location.hash, navigate],
  );

  return {
    language,
    setAppLanguage,
  };
}
