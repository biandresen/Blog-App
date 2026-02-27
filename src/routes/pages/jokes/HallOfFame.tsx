import { useEffect, useState } from "react";
import type { HallOfFameRow } from "../../../types/hallOfFame.types";
import { getHallOfFameUsers } from "../../../lib/axios";
import Spinner from "../../../components/atoms/Spinner";
import AvatarWithBadges from "../../../components/atoms/AvatarWithBadges";

const HallOfFame = () => {
  const [period, setPeriod] = useState<"week" | "month" | "all">("month");
  const [items, setItems] = useState<HallOfFameRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getHallOfFameUsers(period, 25);
        setItems(res.data ?? []);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load Hall of Fame");
      } finally {
        setLoading(false);
      }
    })();
  }, [period]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-[var(--text1)]">{error}</div>;

  return (
    <div className="container max-w-150 md:mt-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-4xl font-bold text-[var(--text1)] lg:text-4xl">
          Hall of Fame
        </h2>

        <select
          className="w-full lg:w-auto rounded-lg border border-white/10 bg-[var(--primary)] px-3 py-2 text-[var(--text2)]"
          value={period}
          onChange={(e) => setPeriod(e.target.value as any)}
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="all">All-time</option>
        </select>
      </div>

      {items.length === 0 ? (
        <div className="text-[var(--text1)] opacity-70">No rankings yet.</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[var(--bg-input)] overflow-x-hidden overflow-y-visible">
          <div className="min-w-[360px]">
            {/* header row */}
          <div
            className="
              grid grid-cols-[32px_minmax(0,1fr)] lg:grid-cols-[48px_1fr_90px_80px_80px]
              gap-3 px-3 py-3 lg:px-4 bg-[var(--primary)] text-lg text-[var(--text2)]
            "
          >
            <div>#</div>
            <div>User</div>

            {/* desktop only */}
            <div className="hidden lg:block text-right">Wins</div>
            <div className="hidden lg:block text-right">Streak</div>
            <div className="hidden lg:block text-right">Likes</div>
          </div>

            {/* rows */}
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
                  <div title={row.user.username} className="font-semibold">{row.user.username}</div>
                </div>

                {/* desktop only */}
                <div className="hidden lg:block text-right font-semibold">{row.winsTotal}</div>
                <div className="hidden lg:block text-right">{row.dailyStreak}</div>
                <div className="hidden lg:block text-right">{row.likesReceived}</div>

                {/* mobile-only subrow */}
                <div className="lg:hidden col-span-2 -mt-2 text-xs opacity-70">
                  Wins: {row.winsTotal} • Streak: {row.dailyStreak} • Likes: {row.likesReceived}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HallOfFame;