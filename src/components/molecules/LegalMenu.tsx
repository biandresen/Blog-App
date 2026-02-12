import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineDocumentText } from "react-icons/hi2";

export default function LegalMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={rootRef} className="relative inline-block md:ml-[-20px]">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // prevent parent click handlers (mobile nav close)
          setOpen((v) => !v);
        }}
        className="rounded-full p-1 hover:brightness-110"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open legal menu"
        title="Legal"
      >
        <HiOutlineDocumentText size={22} className="text-[var(--text2)]" />
      </button>

      {open && (
        <div
          role="menu"
          className={`
            absolute z-[200] w-52 rounded-xl border border-white/10
            bg-[var(--bg-input)] shadow-xl
            p-2 text-sm text-[var(--text1)]
            // Mobile: open to the RIGHT of the button, aligned to top
            left-full top-0 ml-3
            // Desktop: open BELOW, aligned to right edge
            md:left-auto md:top-full md:ml-0 md:mt-2 md:right-0
          `}
        >
          <div className="px-3 py-2 text-xs opacity-70 border-b border-white/10">
            Legal
          </div>

          <NavLink
            to="/legal/terms"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            Terms of Service
          </NavLink>

          <NavLink
            to="/legal/privacy"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            Privacy Policy
          </NavLink>

          <NavLink
            to="/legal/cookies"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            Cookie Policy
          </NavLink>

          <NavLink
            to="/legal/rules"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 hover:bg-white/5"
            role="menuitem"
          >
            Community Rules
          </NavLink>
        </div>
      )}
    </div>
  );
}
