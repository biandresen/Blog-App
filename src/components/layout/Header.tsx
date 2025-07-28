import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { TbLayoutSidebar } from "react-icons/tb";
import { TbLayoutSidebarRight } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

import Navbar from "./Navbar";

import logoImg from "../../assets/img/blogIcon.svg";
import { useState } from "react";
import Button from "../atoms/Button";
import { useUser } from "../../contexts/UserContext";
const heading = "BLOGGY";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUser();

  return (
    <header className="dark theme-primary theme-text2 h-[3.5rem]">
      <div className="flex items-center justify-between h-full container relative">
        <Link to="/" className="flex items-end w-full">
          <img src={logoImg} width={38} alt="Logo" />
          <h2 className="-ml-2 -mb-2 pr-1 font-medium text-[1.8rem]">{heading}</h2>
        </Link>

        <div className="flex items-center gap-4 md:hidden">
          {user && (
            <>
              <Button
                className="bg-transparent"
                size="zero"
                label="Toggle navigation menu"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                // onClick={() => setIsOpen((prev) => !prev)}
              >
                <TbLayoutSidebar size={30} />
              </Button>
              <Button
                className="bg-transparent"
                size="zero"
                label="Toggle navigation menu"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                // onClick={() => setIsOpen((prev) => !prev)}
              >
                <TbLayoutSidebarRight size={30} />
              </Button>
            </>
          )}
          <Button
            className="bg-transparent"
            size="zero"
            label="Toggle navigation menu"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ?
              <RxCross2 className="ml-2.5" size={35} />
            : <IoMenu size={45} />}
          </Button>
        </div>
        <Navbar isOpen={isOpen} />
      </div>
    </header>
  );
};

export default Header;
