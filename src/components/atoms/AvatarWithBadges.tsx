import { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "../atoms/Avatar";
import { getStreakTier, pickPrimaryBadgeFromUser, resolveActiveBadgesFromUser } from "../../lib/badges";
import type { User } from "../../types/context.types";

type Props = {
  avatarUrl?: string | null;
  size: number;
  user?: User | null;
  enableMenu?: boolean;
  username?: string; // allow overriding display
};

export default function AvatarWithBadges({
  user,
  avatarUrl,
  username,
  size,
  enableMenu = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableMenu) return;

    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [enableMenu]);

  const primary = useMemo(() => pickPrimaryBadgeFromUser(user), [user]);
  const activeBadges = useMemo(() => resolveActiveBadgesFromUser(user), [user]);

  const streak = user?.dailyJokeStreak ?? 0;
  const bestStreak = user?.dailyJokeBestStreak ?? 0;

  const streakTier = useMemo(() => getStreakTier(streak), [streak]);

  const streakDisplay = streak > 999 ? "999+" : streak.toString();
  const bestStreakDisplay = bestStreak > 999 ? "999+" : bestStreak.toString();

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        className="relative rounded-full"
        onClick={(e) => {
          if (!enableMenu) return;
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-haspopup={enableMenu ? "menu" : undefined}
        aria-expanded={enableMenu ? open : undefined}
      >
        <Avatar avatarUrl={avatarUrl ?? user?.avatar} size={size} />

        {primary && (
          <span
            className="
              absolute -bottom-1 -right-1
              flex items-center justify-center
              h-[22px] min-w-[22px] px-1
              rounded-full
              border border-white/10
              bg-[var(--primary-shade)]
              text-[0.85rem]
              shadow-lg
            "
            title={primary.label}
            aria-label={primary.label}
          >
            {primary.icon}
          </span>
        )}
      </button>

      {enableMenu && open && (
        <div
          role="menu"
          className={`
            absolute z-[250] w-56 rounded-xl border border-white/10
            bg-[var(--primary-shade)] shadow-xl
            p-2 text-sm text-[var(--text2)]
            left-0 top-16 ml-3
            md:ml-0 md:mt-2 md:right-0
          `}
        >
          <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
            <span className="font-semibold">{username ?? user?.username}</span>
          </div>

          <div className="px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${streakTier.colorClass}`} />
              <span className="opacity-90">Daily streak</span>
            </div>
            <span className="font-semibold">{streak > 0 ? `${streakDisplay} (${bestStreakDisplay})` : "—"}</span>
          </div>

          <div className="px-3 pb-2">
            <div className="text-xs opacity-70 mb-2">Badges</div>

            {activeBadges.length === 0 ? (
              <div className="text-xs opacity-70">No badges yet.</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {activeBadges
                  .sort((a, b) => a.priority - b.priority)
                  .map((b) => (
                    <span
                      key={b.key}
                      className="
                        inline-flex items-center gap-1
                        rounded-full border border-white/10
                        bg-white/5 px-2 py-1
                        text-xs
                      "
                      title={b.label}
                    >
                      <span>{b.icon}</span>
                      <span className="opacity-90">{b.label}</span>
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
