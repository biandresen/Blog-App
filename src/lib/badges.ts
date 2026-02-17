import type { Badge, BadgeKey, User } from "../types/context.types";

export const BADGE_CATALOG: Record<BadgeKey, Omit<Badge, "key">> = {
  ADMIN: { label: "Admin", icon: "🛡️", priority: 0 },
  TOP_CREATOR_MONTH: { label: "Top Creator (Month)", icon: "🏆", priority: 1 },
  JOKE_OF_DAY: { label: "Joke of the Day", icon: "👑", priority: 2 },
  TRENDING_WEEK: { label: "Trending (Week)", icon: "⚡", priority: 3 },
  MOST_COMMENTED: { label: "Most Commented", icon: "🎭", priority: 4 },
  FASTEST_GROWING: { label: "Fastest Growing", icon: "🚀", priority: 5 },
  STREAK: { label: "Daily Streak", icon: "🔥", priority: 6 },
};

export function resolveActiveBadgesFromUser(user?: User | null): Badge[] {
  if (!user) return [];

  const keys = new Set<BadgeKey>();

  if (user.role === "ADMIN") keys.add("ADMIN");

  // currentBadges from backend (if present)
  (user.currentBadges ?? []).forEach((b) => keys.add(b.badge));
  console.log("user.currentBadges in AvatarWithBadges", user.currentBadges)

  // streak badge rule (example: only >= 7)
  if ((user.dailyJokeStreak ?? 0) >= 7) keys.add("STREAK");

  return Array.from(keys).map((key) => ({ key, ...BADGE_CATALOG[key] }));
}

export function pickPrimaryBadgeFromUser(user?: User | null): Badge | null {
  const active = resolveActiveBadgesFromUser(user);
  if (!active.length) return null;
  return active.sort((a, b) => a.priority - b.priority)[0];
}


export function getStreakTier(streak: number) {
  if (streak >= 365) return { tier: "legend", label: "Legend", colorClass: "bg-purple-500/90" };
  if (streak >= 100) return { tier: "elite", label: "Elite", colorClass: "bg-blue-500/90" };
  if (streak >= 30) return { tier: "gold", label: "Gold", colorClass: "bg-yellow-500/90" };
  if (streak >= 7) return { tier: "hot", label: "Hot", colorClass: "bg-orange-500/90" };
  if (streak >= 1) return { tier: "warm", label: "Warm", colorClass: "bg-orange-400/90" };
  return { tier: "none", label: "None", colorClass: "bg-white/10" };
}
