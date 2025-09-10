import { createContext, useContext, useState, type ReactNode } from "react";

import { type User, type UserContextType } from "../types/context.types";

// Dummy user for testing purposes
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
