import { useEffect } from "react";
import { refreshAccessToken } from "../lib/auth";
import { useAuth } from "../contexts/AuthContext";

export const useAuthInitializer = () => {
  const { setAccessToken } = useAuth();

  useEffect(() => {
    const tryRefresh = async () => {
      await refreshAccessToken(setAccessToken);
    };

    tryRefresh();
  }, [setAccessToken]);
};
