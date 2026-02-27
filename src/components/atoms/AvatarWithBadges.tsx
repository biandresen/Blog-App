import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Avatar from "../atoms/Avatar";
import {
  getStreakTier,
  pickPrimaryBadgeFromUser,
  resolveActiveBadgesFromUser,
} from "../../lib/badges";
import type { User } from "../../types/context.types";

type Props = {
  avatarUrl?: string | null;
  size: number;
  user?: User | null;
  enableMenu?: boolean;
  username?: string;
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

  // viewport-positioned menu (prevents clipping by overflow containers)
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);

  const primary = useMemo(() => pickPrimaryBadgeFromUser(user), [user]);
  const activeBadges = useMemo(() => resolveActiveBadgesFromUser(user), [user]);

  const streak = user?.dailyJokeStreak ?? 0;
  const bestStreak = user?.dailyJokeBestStreak ?? 0;
  const streakTier = useMemo(() => getStreakTier(streak), [streak]);

  const streakDisplay = streak > 999 ? "999+" : String(streak);
  const bestStreakDisplay = bestStreak > 999 ? "999+" : String(bestStreak);

  const computeMenuPos = useCallback(() => {
    const btn = rootRef.current?.querySelector("button");
    if (!btn) return;

    const r = btn.getBoundingClientRect();

    // Align left under avatar; clamp to viewport so it doesn't go off-screen
    const width = 224; // w-56 = 14rem = 224px
    const padding = 8;

    const left = Math.min(
      Math.max(padding, r.left),
      window.innerWidth - width - padding
    );

    const top = r.bottom + 8;

    setMenuPos({ top, left });
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setMenuPos(null);
  }, []);

  const openMenu = useCallback(() => {
    computeMenuPos();
    setOpen(true);
  }, [computeMenuPos]);

  // close on outside click
  useEffect(() => {
    if (!enableMenu) return;

    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) closeMenu();
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [enableMenu, closeMenu]);

  // keep menu anchored while scrolling/resize (works with nested scroll containers)
  useEffect(() => {
    if (!enableMenu) return;
    if (!open) return;

    const onReposition = () => computeMenuPos();

    window.addEventListener("scroll", onReposition, true); // capture: catches outlet scroll
    window.addEventListener("resize", onReposition);

    return () => {
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [enableMenu, open, computeMenuPos]);

  // ESC to close
  useEffect(() => {
    if (!enableMenu) return;
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enableMenu, open, closeMenu]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        className="relative rounded-full"
        onClick={(e) => {
          if (!enableMenu) return;
          e.stopPropagation();
          if (open) closeMenu();
          else openMenu();
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

      {enableMenu && open && menuPos && (
        <div
          role="menu"
          className="
            fixed z-[9999] w-56 rounded-xl border border-white/10
            bg-[var(--primary-shade)] shadow-xl
            p-2 text-sm text-[var(--text2)]
          "
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
            <span className="font-semibold">{username ?? user?.username}</span>
          </div>

          <div className="px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${streakTier.colorClass}`} />
              <span className="opacity-90">Daily streak</span>
            </div>
            <span className="font-semibold">
              {streak > 0 ? `${streakDisplay} (${bestStreakDisplay})` : "—"}
            </span>
          </div>

          <div className="px-3 pb-2">
            <div className="text-xs opacity-70 mb-2">Badges</div>

            {activeBadges.length === 0 ? (
              <div className="text-xs opacity-70">No badges yet.</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {activeBadges
                  .slice()
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