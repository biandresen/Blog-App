import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, type AppLanguage } from "../i18n/translations";
import { getByPath } from "../i18n/getByPath";
import { useUser } from "./UserContext";

type LanguageContextType = {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string, fallback?: string) => string;
  tr: <T = unknown>(key: string, fallback?: T) => T;
  tf: (
    key: string,
    vars?: Record<string, string | number>,
    fallback?: string
  ) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "appLanguage";

function normalizeLanguage(input?: string | null): AppLanguage {
  return String(input ?? "").toUpperCase() === "EN" ? "EN" : "NO";
}

function readLocalLanguage(): AppLanguage {
  if (typeof window === "undefined") return "NO";
  return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();

  // Initial language for logged-out state / first render
  const [language, setLanguageState] = useState<AppLanguage>(() => readLocalLanguage());

  // Sync language when authenticated user preference changes.
  // Logged-in user's preferredLanguage is the source of truth.
  useEffect(() => {
    if (!user?.preferredLanguage) return;

    const preferred = normalizeLanguage(user.preferredLanguage);

    setLanguageState((prev) => (prev === preferred ? prev : preferred));
    localStorage.setItem(LANGUAGE_STORAGE_KEY, preferred);
  }, [user?.preferredLanguage]);

  // Manual language switch for current UI state.
  // Also persists to localStorage so logged-out users keep their choice.
  const setLanguage = (lang: AppLanguage) => {
    const normalized = normalizeLanguage(lang);
    setLanguageState(normalized);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
  };

  const t = useMemo(() => {
    return (key: string, fallback?: string) => {
      const value = getByPath(translations[language], key);
      return typeof value === "string" ? value : (fallback ?? key);
    };
  }, [language]);

  const tr = useMemo(() => {
    return <T,>(key: string, fallback?: T): T => {
      const value = getByPath(translations[language], key);
      return (value ?? fallback) as T;
    };
  }, [language]);

  const tf = useMemo(() => {
    return (
      key: string,
      vars: Record<string, string | number> = {},
      fallback?: string
    ) => {
      const raw = getByPath(translations[language], key);
      if (typeof raw !== "string") return fallback ?? key;

      return raw.replace(/\{\{(\w+)\}\}/g, (_, varName) => String(vars[varName] ?? ""));
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      tr,
      tf,
    }),
    [language, t, tr, tf]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}