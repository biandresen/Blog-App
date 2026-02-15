export type BadgeKey =
  | "admin"
  | "top_creator_month"
  | "joke_of_day"
  | "trending_week"
  | "most_commented"
  | "fastest_growing"
  | "streak";

export type Badge = {
  key: BadgeKey;
  label: string;
  icon: string; // emoji for now; easy to swap to react-icons later
  priority: number; // lower number = higher priority
};

export type UserStatus = {
  role?: "ADMIN" | "USER";
  streak?: number;
  bestStreak?: number;
  badges?: BadgeKey[]; // earned/active badges from backend later
};

export function getStreakTier(streak: number) {
  if (streak >= 365) return { tier: "legend", label: "Legend", colorClass: "bg-purple-500/90" };
  if (streak >= 100) return { tier: "elite", label: "Elite", colorClass: "bg-blue-500/90" };
  if (streak >= 30) return { tier: "gold", label: "Gold", colorClass: "bg-yellow-500/90" };
  if (streak >= 7) return { tier: "hot", label: "Hot", colorClass: "bg-orange-500/90" };
  if (streak >= 1) return { tier: "warm", label: "Warm", colorClass: "bg-orange-400/90" };
  return { tier: "none", label: "None", colorClass: "bg-white/10" };
}

// A single catalog. You can extend later.
export const BADGE_CATALOG: Record<BadgeKey, Omit<Badge, "key">> = {
  admin: { label: "Admin", icon: "🛡️", priority: 0 },
  top_creator_month: { label: "Top Creator (Month)", icon: "🏆", priority: 1 },
  joke_of_day: { label: "Joke of the Day", icon: "👑", priority: 2 },
  trending_week: { label: "Trending (Week)", icon: "🔥", priority: 3 },
  most_commented: { label: "Most Commented", icon: "🎭", priority: 4 },
  fastest_growing: { label: "Fastest Growing", icon: "💥", priority: 5 },
  streak: { label: "Daily Streak", icon: "🔥", priority: 6 },
};

export function resolveActiveBadges(status: UserStatus): Badge[] {
  const keys = new Set<BadgeKey>();

  if (status.role === "ADMIN") keys.add("admin");
  (status.badges ?? []).forEach((k) => keys.add(k));

  // Only treat streak as a “badge” if it’s meaningful (example: >= 7)
  if ((status.streak ?? 0) >= 7) keys.add("streak");

  return Array.from(keys).map((key) => ({ key, ...BADGE_CATALOG[key] }));
}

export function pickPrimaryBadge(status: UserStatus): Badge | null {
  const active = resolveActiveBadges(status);
  if (!active.length) return null;

  // If streak exists, you may want to downgrade it unless no other badge:
  // already handled by priority number.

  return active.sort((a, b) => a.priority - b.priority)[0];
}
