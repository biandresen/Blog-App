import axios from "axios";
import BLOG_API from "../api/blog-api";
import { type token } from "../types/context.types";

// The setter function type (you pass it from useAuth)
type SetAccessToken = (token: token) => void;

// Refresh the access token using the refresh token cookie
export async function refreshAccessToken(setAccessToken: SetAccessToken) {
  try {
    const res = await axios.post(
      `${BLOG_API.BASE}/auth/refresh`,
      {},
      {
        withCredentials: true, // required to send refresh cookie
      }
    );

    console.log("RES:", res);

    if (res.data.statusCode === 200) {
      const newAccessToken = res.data.data; // backend sends access token here
      setAccessToken(newAccessToken);
      return newAccessToken;
    }

    return null; // fallback
  } catch (err) {
    console.error("Failed to refresh token", err);
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
        console.warn("Token refresh failed. User must log in again.");
        throw new Error("Session expired. Please log in again.");
      }

      // 3️⃣ Retry original request with the new token
      return await apiFunc(newToken, ...args);
    }

    // 4️⃣ Re-throw other errors
    throw err;
  }
}
