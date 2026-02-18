import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { safeRequest } from "../../../lib/auth";
import { BADGE_CATALOG } from "../../../lib/badges";
import { getMyBadgeHistory, getMyCurrentBadges } from "../../../lib/axios";
import type { BadgeAward, CurrentUserBadge } from "../../../types/context.types";
import { Link } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";

const HISTORY_LIMIT = 2;

const Badges = () => {
  const { accessToken, setAccessToken } = useAuth();

  const [current, setCurrent] = useState<CurrentUserBadge[]>([]);
  const [currentLoading, setCurrentLoading] = useState(true);

  // History (paged)
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


  // Current badges (simple fetch)
  useEffect(() => {
    (async () => {
      setCurrentLoading(true);
      try {
        const currentRes = await safeRequest(getMyCurrentBadges, accessToken, setAccessToken);
        setCurrent((currentRes.data ?? []) as CurrentUserBadge[]);
      } finally {
        setCurrentLoading(false);
      }
    })();
  }, [accessToken, setAccessToken]);

  const loading = currentLoading || historyLoading;
  if (loading) return <div className="text-[var(--text1)] text-center">Loading...</div>;

  return (
    <div className="container max-w-150">
      <h2 className="text-3xl font-bold text-[var(--text1)] mb-6">Badges</h2>

      {/* Current badges */}
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-xl font-semibold text-[var(--text1)]">Current</h3>
          <p className="text-sm opacity-70 text-[var(--text1)]">Active badges</p>
        </div>

        {current.length === 0 ? (
          <p className="text-[var(--text1)] opacity-70">No active badges yet.</p>
        ) : (
          <ul className="space-y-3">
            {current.map((b) => {
              const meta = BADGE_CATALOG[b.badge];
              return (
                <li key={b.id} className="rounded-xl border border-white/10 bg-[var(--bg-input)] p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-[var(--text1)]">
                      {meta?.icon} {meta?.label ?? b.badge}
                    </div>
                    <div className="text-sm opacity-70 text-[var(--text1)]">
                      Since {new Date(b.since).toLocaleDateString()}
                    </div>
                  </div>

                  {b.context?.postId && (
                    <div className="text-sm mt-2 opacity-80 text-[var(--text1)]">
                      Related post:{" "}
                      <Link to={`/jokes/${b.context.postId}`} className="underline font-semibold hover:opacity-90">
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

      {/* History */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="text-xl font-semibold text-[var(--text1)]">History</h3>
          <p className="text-sm opacity-70 text-[var(--text1)]">All awards (newest first)</p>
        </div>

        {history.length === 0 ? (
          <p className="text-[var(--text1)] opacity-70">No badge history yet.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {history.map((a) => {
                const meta = BADGE_CATALOG[a.badge];
                return (
                  <li key={a.id} className="rounded-xl border border-white/10 bg-[var(--bg-input)] p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[var(--text1)]">
                        {meta?.icon} {meta?.label ?? a.badge}
                      </div>
                      <div className="text-sm opacity-70 text-[var(--text1)]">
                        {new Date(a.awardedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {(a.validFrom || a.validTo) && (
                      <div className="text-sm mt-2 opacity-80 text-[var(--text1)]">
                        Valid{" "}
                        {a.validFrom ? `from ${new Date(a.validFrom).toLocaleDateString()}` : ""}
                        {a.validTo ? ` to ${new Date(a.validTo).toLocaleDateString()}` : ""}
                      </div>
                    )}

                    {a.context?.postId && (
                      <div className="text-sm mt-2 opacity-80 text-[var(--text1)]">
                        Related post:{" "}
                        <Link to={`/jokes/${a.context.postId}`} className="underline font-semibold hover:opacity-90">
                          #{a.context.postId}
                        </Link>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Pagination controls (correctly disabled) */}
            <div className="flex items-center justify-end gap-3 mt-6">
              {meta && (
                <div className="mr-auto text-sm opacity-70 text-[var(--text1)]">
                  Page {meta.page} of {meta.totalPages} • Total {meta.total}
                </div>
              )}

              <button
                className="rounded-lg border border-white/10 px-3 py-2 text-[var(--text1)] disabled:opacity-50"
                disabled={!canPrev}
                onClick={prev}
              >
                Prev
              </button>
              <button
                className="rounded-lg border border-white/10 px-3 py-2 text-[var(--text1)] disabled:opacity-50"
                disabled={!canNext}
                onClick={next}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Badges;
