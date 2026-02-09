import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "../atoms/Avatar";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { logoutUser } from "../../lib/axios";
import { toast } from "react-toastify";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const { user, setUser } = useUser();
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    logoutUser();
    setOpen(false);
    navigate("/login");
    toast.info("You have been logged out.");
  };

  if (!user) return null;

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // prevent any parent click handlers
          setOpen((v) => !v);
        }}
        className="rounded-full"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar avatarUrl={user.avatar} size={30} />
      </button>

      {open && (
        <div
          role="menu"
          className={`
            absolute z-[200] w-44 rounded-xl border border-white/10
            bg-[var(--bg-input)] shadow-xl
            p-2 text-sm text-[var(--text1)]
            // Mobile: open to the RIGHT of the avatar, aligned to top
            left-full top-0 ml-3
            // Desktop: open BELOW, aligned to right edge
            md:left-auto md:top-full md:ml-0 md:mt-2 md:right-0
          `}
        >
          <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
            Signed in as <span className="font-semibold">{user.username}</span>
          </div>

          <NavLink
            to="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            Profile
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
