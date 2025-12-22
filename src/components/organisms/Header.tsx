import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { TbLayoutSidebar } from "react-icons/tb";
import { TbLayoutSidebarRight } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import Navbar from "./Navbar";
import logoImg from "../../assets/img/blogIcon.svg";
import Button from "../atoms/Button";
import { type HeaderProps } from "../../types/components.types";

const heading = "BLOGGY";

const Header = ({ setSidebars }: HeaderProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const location = useLocation();
  const showLeftSidebarBtn = location.pathname.includes("/posts") || location.pathname.includes("/dashboard");
  const showRightSidebarBtn = location.pathname.includes("/posts");

  const handleLeftSidebar = () => {
    setSidebars((prev) => {
      if (window.innerWidth >= 768) return { ...prev, left: !prev.left };
      // If the left sidebar is being opened, close the right sidebar
      if (!prev.left && prev.right) {
        return { left: true, right: false };
      }
      // Otherwise, just toggle the left sidebar
      return { ...prev, left: !prev.left };
    });
  };

  const handleRightSidebar = () => {
    setSidebars((prev) => {
      if (window.innerWidth >= 768) return { ...prev, right: !prev.right };
      // If the right sidebar is being opened, close the left sidebar
      if (!prev.right && prev.left) {
        return { left: false, right: true };
      } else {
        // Otherwise, just toggle the right sidebar
        return { ...prev, right: !prev.right };
      }
    });
  };

  return (
    <header className="bg-[var(--primary)] h-[3.8rem]">
      <section className="flex items-center justify-between h-full px-[var(--space-s)] lg:px-[var(--space-lg)] relative">
        <Link to="/" className="flex items-end w-full">
          <img src={logoImg} width={38} alt="Logo" />
          <h2 className="-ml-2 -mb-2 pr-1 font-medium text-[1.8rem]">{heading}</h2>
        </Link>

        <div className="flex items-center gap-1 mr-4">
          {showLeftSidebarBtn && (
            <Button
              className="p-1.5 md:absolute md:top-18 md:left-6 z-200 text-[var(--text2)]!"
              size="zero"
              label="Toggle navigation menu"
              aria-controls="mobile-menu"
              onClick={() => {
                handleLeftSidebar();
              }}
            >
              <TbLayoutSidebar size={30} />
            </Button>
          )}
          {showRightSidebarBtn && (
            <Button
              className="p-1.5 md:absolute md:top-18 md:right-6 z-200 text-[var(--text2)]!"
              size="zero"
              label="Toggle navigation menu"
              aria-controls="mobile-menu"
              onClick={() => {
                handleRightSidebar();
              }}
            >
              <TbLayoutSidebarRight size={30} />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Button
            className="bg-transparent"
            size="zero"
            label="Toggle navigation menu"
            aria-controls="mobile-menu"
            aria-expanded={menuIsOpen}
            onClick={() => setMenuIsOpen((prev) => !prev)}
          >
            {menuIsOpen ?
              <RxCross2 className="ml-2.5" size={35} />
            : <IoMenu size={45} />}
          </Button>
        </div>
        <Navbar isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />
      </section>
    </header>
  );
};

export default Header;
