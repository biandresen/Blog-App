import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import JokePreviewCard from "./JokePreviewCard";
import Button from "../atoms/Button";

import { getPopularJokes } from "../../lib/axios";
import type { JokeType } from "../../types/joke.types";

import { useLanguage } from "../../contexts/LanguageContext";

type RightSidebarProps = {
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
};

const RightSidebar = ({ setSidebars }: RightSidebarProps) => {
  const { language, t } = useLanguage();

  const [jokes, setJokes] = useState<JokeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchPopularJokes = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getPopularJokes(language);

        if (!isActive) return;

        setJokes(res.data ?? []);
      } catch (err: any) {
        if (!isActive) return;

        const message = err?.message || t("rightSidebar.loading");
        setError(message);
        toast.error(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchPopularJokes();

    return () => {
      isActive = false;
    };
  }, [language, t]);

  const handleReload = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await getPopularJokes(language);
      setJokes(res.data ?? []);
    } catch (err: any) {
      const message = err?.message || t("rightSidebar.loading");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarNavigate = () => {
    if (window.innerWidth < 768) {
      setSidebars((prev) => ({ ...prev, right: false }));
    }
  };

  const showInitialLoading = loading && jokes.length === 0;
  const showEmptyState = !loading && jokes.length === 0 && !error;
  const showJokes = jokes.length > 0;

  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-[calc(100vh-3.8rem)] md:max-w-55 lg:max-w-65 md:static overflow-y-auto z-40">
      <h3 className="text-center text-3xl md:text-2xl mt-8 md:mt-16 text-[var(--text2)]">
        {t("rightSidebar.heading")}
      </h3>

      <div className="flex md:flex-col flex-wrap items-center justify-center px-4 py-8 gap-3">
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        {showInitialLoading && <p className="text-[var(--text2)] opacity-70">{t("rightSidebar.loading")}</p>}

        {showEmptyState && (
          <div className="text-center">
            <h3 className="text-[var(--text2)] font-normal mb-5">{t("rightSidebar.empty.title")}</h3>

            <Button
              onClick={handleReload}
              label={t("rightSidebar.empty.action")}
              type="button"
              variant="primary"
              disabled={loading}
            >
              {loading ? t("rightSidebar.loading") : t("rightSidebar.empty.action")}
            </Button>
          </div>
        )}

        {showJokes &&
          jokes.map((joke) => (
            <JokePreviewCard
              key={joke.id}
              id={joke.id}
              title={joke.title}
              likes={joke.likes.length}
              onNavigate={handleSidebarNavigate}
            />
          ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
