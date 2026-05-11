import { toast } from "react-toastify";
import { logoutUser } from "./axios";
import { type token, type User } from "../types/context.types";

export function logoutAndRedirect(opts: {
  setUser: (u: User | null) => void;
  setAccessToken: (t: token) => void;
  navigate: (path: string) => void;
}) {
  const { setUser, setAccessToken, navigate } = opts;

  setUser(null);
  setAccessToken(null);
  logoutUser(); // server-side logout
  navigate("/login");
  toast.info("You have been logged out.");
}
