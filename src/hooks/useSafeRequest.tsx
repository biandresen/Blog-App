import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { safeRequest } from "../lib/auth";
import type { token } from "../types/context.types";

interface UseSafeRequestResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  toast: string;
  refetch: (...newArgs: any[]) => Promise<void>;
  setToast: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Custom hook for safely calling an API function that requires authentication.
 * It automatically handles token refresh when expired.
 */
export function useSafeRequest<T>(
  apiFunc: (accessToken: token, ...args: any[]) => Promise<T>,
  ...initialArgs: any[]
): UseSafeRequestResult<T> {
  const { accessToken, setAccessToken } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<string>("");

  const fetchData = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      try {
        const res = await safeRequest(apiFunc, accessToken, setAccessToken, ...args);
        setData(res);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, accessToken, setAccessToken]
  );

  // Automatically call it once on mount
  useEffect(() => {
    fetchData(...initialArgs);
  }, [fetchData, ...initialArgs]);

  return { data, error, loading, toast, refetch: fetchData, setToast };
}
