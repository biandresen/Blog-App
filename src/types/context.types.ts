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
};

export interface UserContextType {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}
//--------------------------------------------

export type token = string | null;

export interface AuthContextType {
  accessToken: token;
  setAccessToken: (token: token) => void;
}
