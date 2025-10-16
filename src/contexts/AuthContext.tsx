import React, { createContext, useContext, useState } from "react";
import { type token } from "../types/context.types";

interface AuthContextType {
  accessToken: token | null;
  setAccessToken: (token: token | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<token | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, isAuthenticated, setIsAuthenticated, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
