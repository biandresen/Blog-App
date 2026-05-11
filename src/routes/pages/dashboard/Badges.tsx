import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { safeRequest } from "../../../lib/auth";
import { BADGE_CATALOG } from "../../../lib/badges";
import { getMyBadgeHistory, getMyCurrentBadges } from "../../../lib/axios";
import { usePagination } from "../../../hooks/usePagination";

import Spinner from "../../../components/atoms/Spinner";

import type { BadgeAward, CurrentUserBadge } from "../../../types/context.types";

const HISTORY_LIMIT = 15;

const Badges = () => {
  const { accessToken, setAccessToken } = useAuth();
  const { t } = useLanguage();

  const [current, setCurrent] = useState<CurrentUserBadge[]>([]);
  const [currentLoading, setCurrentLoading] = useState(true);

  const {
    items: history,
    meta,
    loading: historyLoading,
    canPrev,
    canNext,
    prev,
    next,
  } = usePagination<BadgeAward>(getMyBadgeHistory, {
    accessToken,
    setAccessToken,
    limit: HISTORY_LIMIT,
    mode: "paged",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchCurrentBadges = async () => {
      if (!accessToken) {
        if (isMounted) {
          setCurrent([]);
          setCurrentLoading(false);
        }
        return;
      }

      setCurrentLoading(true);

      try {
        const res = await safeRequest(getMyCurrentBadges, accessToken, setAccessToken);

        if (isMounted) {
          setCurrent((res.data ?? []) as CurrentUserBadge[]);
        }
      } finally {
        if (isMounted) {
          setCurrentLoading(false);
        }
      }
    };

    fetchCurrentBadges();

    return () => {
      isMounted = false;
    };
  }, [accessToken, setAccessToken]);

  const loading = currentLoading || historyLoading;

  if (loading && history.length === 0 && current.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="container max-w-150">
      <h2 className="text-3xl font-bold text-[var(--text1)] mb-6">
        {t("badges.heading")}
      </h2>

      {/* CURRENT BADGES */}

      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-xl font-semibold text-[var(--text1)]">
            {t("badges.current.heading")}
          </h3>

          <p className="text-sm opacity-70 text-[var(--text1)]">
            {t("badges.current.subheading")}
          </p>
        </div>

        {current.length === 0 ? (
          <p className="text-[var(--text1)] opacity-70">
            {t("badges.current.empty")}
          </p>
        ) : (
          <ul className="space-y-3">
            {current.map((b) => {
              const badgeMeta = BADGE_CATALOG[b.badge];

              return (
                <li
                  key={b.id}
                  className="rounded-xl border border-white/10 bg-[var(--bg-input)] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-[var(--text1)]">
                      {badgeMeta?.icon ?? "🏅"}{" "}
                      {badgeMeta?.label ?? b.badge}
                    </div>

                    <div className="text-sm opacity-70 text-[var(--text1)]">
                      {t("badges.current.since")}{" "}
                      {new Date(b.since).toLocaleDateString()}
                    </div>
                  </div>

                  {b.context?.postId && (
                    <div className="text-sm mt-2 opacity-80 text-[var(--text1)]">
                      {t("badges.relatedPost")}:{" "}
                      <Link
                        to={`/jokes/${b.context.postId}`}
                        className="underline font-semibold hover:opacity-90"
                      >
                        #{b.context.postId}
                      </Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* BADGE HISTORY */}

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-xl font-semibold text-[var(--text1)]">
            {t("badges.history.heading")}
          </h3>

          <p className="text-sm opacity-70 text-[var(--text1)]">
            {t("badges.history.subheading")}
          </p>
        </div>

        {history.length === 0 ? (
          <p className="text-[var(--text1)] opacity-70">
            {t("badges.history.empty")}
          </p>
        ) : (
          <>
            <ul className="space-y-3">
              {history.map((a) => {
                const badgeMeta = BADGE_CATALOG[a.badge];

                return (
                  <li
                    key={a.id}
                    className="rounded-xl border border-white/10 bg-[var(--bg-input)] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[var(--text1)]">
                        {badgeMeta?.icon ?? "🏅"}{" "}
                        {badgeMeta?.label ?? a.badge}
                      </div>

                      <div className="text-sm opacity-70 text-[var(--text1)]">
                        {new Date(a.awardedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {(a.validFrom || a.validTo) && (
                      <div className="text-sm mt-2 opacity-80 text-[var(--text1)]">
                        {t("badges.history.valid")}{" "}
                        {a.validFrom
                          ? `${t("badges.history.from")} ${new Date(
                              a.validFrom
                            ).toLocaleDateString()}`
                          : ""}
                        {a.validTo
                          ? ` ${t("badges.history.to")} ${new Date(
                              a.validTo
                            ).toLocaleDateString()}`
                          : ""}
                      </div>
                    )}

                    {a.context?.postId && (
                      <div className="text-sm mt-2 opacity-80 text-[var(--text1)]">
                        {t("badges.relatedPost")}:{" "}
                        <Link
                          to={`/jokes/${a.context.postId}`}
                          className="underline font-semibold hover:opacity-90"
                        >
                          #{a.context.postId}
                        </Link>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-end gap-3 mt-6">
              {meta && (
                <div className="mr-auto text-sm opacity-70 text-[var(--text1)]">
                  {t("badges.page")} {meta.page} {t("badges.of")}{" "}
                  {meta.totalPages} • {t("badges.total")} {meta.total}
                </div>
              )}

              <button
                type="button"
                className="rounded-lg border border-[var(--text0]/10 px-3 py-2 text-[var(--text1)] disabled:opacity-50"
                disabled={!canPrev || historyLoading}
                onClick={prev}
              >
                {t("badges.prev")}
              </button>

              <button
                type="button"
                className="rounded-lg border border-[var(--text0]/10 px-3 py-2 text-[var(--text1)] disabled:opacity-50"
                disabled={!canNext || historyLoading}
                onClick={next}
              >
                {t("badges.next")}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Badges;