import { useEffect, useState } from "react";

import type { LeaderboardRow } from "../../../types/leaderboard.types";
import { getLeaderboardUsers } from "../../../lib/axios";

import Spinner from "../../../components/atoms/Spinner";
import AvatarWithBadges from "../../../components/atoms/AvatarWithBadges";

import { useLanguage } from "../../../contexts/LanguageContext";

type LeaderboardPeriod = "week" | "month" | "all";

const LIMIT = 25;

const Leaderboard = () => {
  const { t } = useLanguage();

  const [period, setPeriod] = useState<LeaderboardPeriod>("month");
  const [items, setItems] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getLeaderboardUsers(period, LIMIT);

        if (!isActive) return;

        setItems(res.data ?? []);
      } catch (err: any) {
        if (!isActive) return;

        setError(err?.message ?? t("leaderboard.states.failed"));
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => {
      isActive = false;
    };
  }, [period, t]);

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value as LeaderboardPeriod);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-[var(--text1)]">{error}</div>;
  }

  return (
    <div className="container max-w-150 md:mt-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-4xl font-bold text-[var(--text1)] lg:text-4xl">{t("leaderboard.heading")}</h2>

        <select
          className="w-full lg:w-auto rounded-lg border border-white/10 bg-[var(--primary)] px-3 py-2 text-[var(--text2)]"
          value={period}
          onChange={handlePeriodChange}
          aria-label={t("leaderboard.heading")}
          disabled={loading}
        >
          <option value="week">{t("leaderboard.periods.week")}</option>
          <option value="month">{t("leaderboard.periods.month")}</option>
          <option value="all">{t("leaderboard.periods.all")}</option>
        </select>
      </div>

      {items.length === 0 ?
        <div className="text-[var(--text1)] opacity-70">{t("leaderboard.states.empty")}</div>
      : <div className="rounded-2xl border border-white/10 bg-[var(--bg-input)] overflow-x-hidden overflow-y-visible">
          <div className="min-w-[360px]">
            <div
              className="
                grid grid-cols-[32px_minmax(0,1fr)] lg:grid-cols-[48px_1fr_90px_80px_80px]
                gap-3 px-3 py-3 lg:px-4 bg-[var(--primary)] text-lg text-[var(--text2)]
              "
            >
              <div>{t("leaderboard.table.rank")}</div>
              <div>{t("leaderboard.table.user")}</div>
              <div className="hidden lg:block text-right">{t("leaderboard.table.wins")}</div>
              <div className="hidden lg:block text-right">{t("leaderboard.table.streak")}</div>
              <div className="hidden lg:block text-right">{t("leaderboard.table.likes")}</div>
            </div>

            {items.map((row, idx) => (
              <div
                key={row.user.id}
                className="
                  relative grid grid-cols-[32px_minmax(0,1fr)] lg:grid-cols-[48px_1fr_90px_80px_80px]
                  gap-3 px-3 py-3 lg:px-4 border-t border-white/10 text-[var(--text1)]
                  overflow-visible
                "
              >
                <div className="opacity-70">{idx + 1}</div>

                <div className="flex items-center gap-3 min-w-0">
                  <AvatarWithBadges user={row.user} size={60} />
                  <div title={row.user.username} className="font-semibold">
                    {row.user.username}
                  </div>
                </div>

                <div className="hidden lg:block text-right font-semibold">{row.winsTotal}</div>
                <div className="hidden lg:block text-right">{row.dailyStreak}</div>
                <div className="hidden lg:block text-right">{row.likesReceived}</div>

                <div className="lg:hidden col-span-2 -mt-2 text-xs opacity-70">
                  {t("leaderboard.mobileStats.wins")}: {row.winsTotal} • {t("leaderboard.mobileStats.streak")}
                  : {row.dailyStreak} • {t("leaderboard.mobileStats.likes")}: {row.likesReceived}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Leaderboard;
