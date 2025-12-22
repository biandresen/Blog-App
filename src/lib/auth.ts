import axios from "axios";
import BLOG_API from "../api/blog-api";
import { type token} from "../types/context.types";

type SetAccessToken = (token: token | null) => void;

export async function refreshAccessToken(setAccessToken: SetAccessToken) {
  try {
    const res = await axios.post(
      `${BLOG_API.BASE}${BLOG_API.REFRESH}`,
      {},
      { withCredentials: true }
    );

    if (res.data.statusCode === 200) {
      const newAccessToken = res.data.data;
      setAccessToken(newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch (err) {
    console.error("❌ Failed to refresh token:", err);
    setAccessToken(null);
    return null;
  }
}

// const res = await safeRequest(toggleLike, accessToken, setAccessToken, post.id);

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
    if (err?.response?.status === 401 || err?.statusCode === 401) {
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
