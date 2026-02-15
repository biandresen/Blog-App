export type ColorTheme = "light" | "dark";

export interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  toggleTheme: () => void;
}
//--------------------------------------------
export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  termsAcceptedAt: string;
  termsVersion: string;
  dailyJokeStreak: number;
  dailyJokeLastViewedAt: string;
  dailyJokeBestStreak: number;
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
