import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Avatar from "../atoms/Avatar";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { logoutUser } from "../../lib/axios";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const { user, setUser } = useUser();
  const { setAccessToken } = useAuth();
  const { t } = useLanguage();
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
    toast.info(t("userMenu.loggedOut"));
  };

  if (!user) return null;

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
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
          className="
            absolute z-[200] w-44 rounded-xl border border-white/10
            bg-[var(--bg-input)] shadow-xl
            p-2 text-sm text-[var(--text1)]
            left-full top-0 ml-3
            md:left-auto md:top-full md:ml-0 md:mt-2 md:right-0
          "
        >
          <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
            {t("userMenu.signedInAs")} <span className="font-semibold">{user.username}</span>
          </div>

          <NavLink
            to="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            {t("userMenu.profile")}
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            {t("userMenu.logout")}
          </button>
        </div>
      )}
    </div>
  );
}