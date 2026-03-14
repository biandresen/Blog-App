import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { TbLayoutSidebar, TbLayoutSidebarRight } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

import Navbar from "./Navbar";
import DadJokesIcon from "../../assets/img/laughing-dad-c.png";
import Button from "../atoms/Button";
import MobileNavHint from "../molecules/MobileNavHint";

import { type HeaderProps } from "../../types/components.types";
import { useLanguage } from "../../contexts/LanguageContext";

const NAV_HINT_KEY = "dadjokes_seen_nav_hint";

const Header = ({ setSidebars }: HeaderProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [showNavHint, setShowNavHint] = useState(false);

  const leftBtnWrapRef = useRef<HTMLSpanElement | null>(null);
  const rightBtnWrapRef = useRef<HTMLSpanElement | null>(null);

  const location = useLocation();
  const { t } = useLanguage();

  const showLeftSidebarBtn =
    location.pathname.includes("/jokes") || location.pathname.includes("/dashboard");
  const showRightSidebarBtn = location.pathname.includes("/jokes");

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    if (!showLeftSidebarBtn && !showRightSidebarBtn) return;

    const hasSeen = localStorage.getItem(NAV_HINT_KEY) === "1";
    if (!hasSeen) setShowNavHint(true);
  }, [location.pathname, showLeftSidebarBtn, showRightSidebarBtn]);

  const dismissNavHint = () => {
    localStorage.setItem(NAV_HINT_KEY, "1");
    setShowNavHint(false);
  };

  const handleLeftSidebar = () => {
    setSidebars((prev) => {
      if (window.innerWidth >= 768) return { ...prev, left: !prev.left };

      if (!prev.left && prev.right) {
        return { left: true, right: false };
      }

      return { ...prev, left: !prev.left };
    });
  };

  const handleRightSidebar = () => {
    setSidebars((prev) => {
      if (window.innerWidth >= 768) return { ...prev, right: !prev.right };

      if (!prev.right && prev.left) {
        return { left: false, right: true };
      }

      return { ...prev, right: !prev.right };
    });
  };

  return (
    <header className="bg-[var(--primary)] h-[3.8rem]">
      <section className="flex items-center justify-between h-full px-[var(--space-s)] lg:px-[var(--space-lg)] relative">
        <Link to="/" className="flex items-end w-full text-[var(--text2)]">
          <img src={DadJokesIcon} alt="DadJokes icon" className="w-[38px]" />
          <h2 className="pr-1 mb-2.5 font-medium text-[1.5rem] md:text-[1.8rem] md:mb-[7px]">
            {t("header.brand")}
          </h2>
          <span className="text-[var(--button5)] absolute left-14 lg:left-18">
            {t("header.beta")}
          </span>
        </Link>

        <div className="flex items-center gap-1 mr-4">
          {showLeftSidebarBtn && (
            <span ref={leftBtnWrapRef} className="inline-flex">
              <Button
                className="p-1.5 md:absolute md:top-18 md:left-6 z-45 text-[var(--text2)]!"
                size="zero"
                label={t("header.actions.toggleNavMenu")}
                title={t("header.actions.toggleMenu")}
                aria-controls="mobile-menu"
                onClick={() => {
                  dismissNavHint();
                  handleLeftSidebar();
                }}
              >
                <TbLayoutSidebar size={30} />
              </Button>
            </span>
          )}

          {showRightSidebarBtn && (
            <span ref={rightBtnWrapRef} className="inline-flex">
              <Button
                className="p-1.5 md:absolute md:top-18 md:right-6 z-45 text-[var(--text2)]!"
                size="zero"
                label={t("header.actions.toggleNavMenu")}
                title={t("header.actions.toggleMenu")}
                aria-controls="mobile-menu"
                onClick={() => {
                  dismissNavHint();
                  handleRightSidebar();
                }}
              >
                <TbLayoutSidebarRight size={30} />
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Button
            className="bg-transparent"
            size="zero"
            label={t("header.actions.toggleNavMenu")}
            aria-controls="mobile-menu"
            aria-expanded={menuIsOpen}
            onClick={() => setMenuIsOpen((prev) => !prev)}
          >
            {menuIsOpen ? <RxCross2 className="ml-2.5" size={35} /> : <IoMenu size={45} />}
          </Button>
        </div>

        <Navbar isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />

        <MobileNavHint
          open={showNavHint}
          onDismiss={dismissNavHint}
          leftAnchor={leftBtnWrapRef.current}
          rightAnchor={rightBtnWrapRef.current}
        />
      </section>
    </header>
  );
};

export default Header;