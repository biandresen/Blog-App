import axios from "axios";
import BLOG_API from "../api/blog-api";
import { jwtDecode } from "jwt-decode";
import { type token, type User } from "../types/context.types";

type SetAccessToken = (token: token | null) => void;
type SetUser = (user: User | null) => void;

export async function refreshAccessToken(setAccessToken: SetAccessToken, setUser?: SetUser) {
  try {
    const res = await axios.post(
      `${BLOG_API.BASE}/auth/refresh`,
      {},
      { withCredentials: true } // For sending refresh cookie
    );

    if (res.data.statusCode === 200) {
      const newAccessToken = res.data.data;
      setAccessToken(newAccessToken);

      // Optionally decode and set the user
      if (setUser) {
        const decoded: User = jwtDecode(newAccessToken);
        setUser(decoded);
      }

      return newAccessToken;
    }

    return null;
  } catch (err) {
    console.error("❌ Failed to refresh token:", err);
    setAccessToken(null);
    if (setUser) setUser(null);
    return null;
  }
}

// Generic API call wrapper that safely refreshes if 401 is returned
export async function safeRequest<T>(
  apiFunc: (accessToken: token, ...args: any[]) => Promise<T>,
  accessToken: token,
  setAccessToken: SetAccessToken,
  ...args: any[]
): Promise<T> {
  try {
    // 1️⃣ Try the original request
    return await apiFunc(accessToken, ...args);
  } catch (err: any) {
    // 2️⃣ If unauthorized, try refreshing
    if (err?.response?.status === 401) {
      const newToken = await refreshAccessToken(setAccessToken);
      if (!newToken) {
        // Optionally clear auth state
        setAccessToken(null);
        throw new Error("Session expired. Please log in again.");
      }

      return await apiFunc(newToken, ...args);
    }

    // 4️⃣ Re-throw other errors
    throw err;
  }
}
