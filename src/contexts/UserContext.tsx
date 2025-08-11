import { createContext, useContext, useState, type ReactNode } from "react";

type UserRole = "USER" | "ADMIN";

type User = {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

interface UserContextType {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const user1: User = {
  id: "1",
  username: "John",
  email: "john@gmail.com",
  avatar: ".jpg",
  role: "USER",
  createdAt: "201192",
  updatedAt: "051225",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(user1);

  //TODO Check if user is logged in on initial load
  // This could be done by checking a token in localStorage or making an API call
  // For now, we assume the user is not logged in

  const value = { loggedIn, setLoggedIn, user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
