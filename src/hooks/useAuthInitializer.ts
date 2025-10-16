import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../lib/auth";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { type User } from "../types/context.types";

export const useAuthInitializer = () => {
  const { setAccessToken, setIsAuthenticated, setLoading } = useAuth();
  const { setUser } = useUser();

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const newToken = await refreshAccessToken(setAccessToken);

        if (newToken) {
          // Decode the token to extract user info
          const payload: User = jwtDecode(newToken);
          setUser({
            id: payload.id,
            username: payload.username,
            email: payload.email,
            avatar: payload.avatar,
            role: payload.role,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
          });

          setIsAuthenticated(true);
          console.log("✅ Auto-login successful for", payload.username);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          console.log("❌ No valid refresh token found");
        }
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    tryRefresh();
  }, [setAccessToken, setIsAuthenticated, setLoading, setUser]);
};
