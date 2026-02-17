export type ColorTheme = "light" | "dark";

export interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  toggleTheme: () => void;
}
//--------------------------------------------
export type UserRole = "USER" | "ADMIN";

export const BADGE = {
  ADMIN: "ADMIN",
  TOP_CREATOR_MONTH: "TOP_CREATOR_MONTH",
  JOKE_OF_DAY: "JOKE_OF_DAY",
  TRENDING_WEEK: "TRENDING_WEEK",
  MOST_COMMENTED: "MOST_COMMENTED",
  FASTEST_GROWING: "FASTEST_GROWING",
  STREAK: "STREAK",
} as const;

export type BadgeKey = (typeof BADGE)[keyof typeof BADGE];

export type Badge = {
  key: BadgeKey;
  label: string;
  icon: string;
  priority: number; // lower = higher priority
};

export type UserStatus = {
  role: UserRole;
  streak?: number;
  bestStreak?: number;
  badges?: BadgeKey[]; // active badges (backend)
};

export type CurrentUserBadge = {
  id: string;
  badge: BadgeKey;
  since: string;
  validTo?: string | null;
  context?: any;
};

export type BadgeAward = {
  id: string;
  badge: BadgeKey;
  awardedAt: string;
  validFrom?: string | null;
  validTo?: string | null;
  context?: any;
};

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;

  termsAcceptedAt: string | null;
  termsVersion: string | null;

  dailyJokeStreak: number;
  dailyJokeLastViewedAt: string | null;
  dailyJokeBestStreak: number;

  currentBadges?: CurrentUserBadge[];
  badgeAwards?: BadgeAward[];
};

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
//--------------------------------------------

export type token = string | null;

export interface AuthContextType {
  accessToken: token;
  setAccessToken: (token: token) => void;
}
