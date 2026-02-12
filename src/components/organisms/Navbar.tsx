import { NavLink} from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useColorTheme } from "../../contexts/ColorThemeContext";
import { useUser } from "../../contexts/UserContext";
import UserMenu from "../molecules/UserMenu";

import { type NavbarProps } from "../../types/components.types";
import LegalMenu from "../molecules/LegalMenu";

const Navbar = ({ isOpen, setIsOpen }: NavbarProps) => {

  const { colorTheme, toggleTheme } = useColorTheme();
  const { user } = useUser();

  const closeMobileNav = () => {
  if (window.innerWidth < 768) {
    setIsOpen(false);
  }
};

  return (
    <nav
      className={`
        ${isOpen ? "block" : "hidden"}
        z-90
        absolute top-14 left-0 w-full
        font-medium text-[1.2rem]
        bg-[var(--primary)]
        animate-in fade-in duration-300
        md:block
        md:static
        md:place-items-end
      `}
    >
      <ul className="flex flex-col gap-4 ml-8 md:flex-row md:items-center md:gap-6 md:ml-0 w-25 md:w-auto">

        {/*-TODO Put all these links in a menu over "Jokes"?*/}
        {/* <li className="pt-3 md:pt-0">
          <NavLink
            to="/jokes/joke-of-the-day"
            className={"mr-5"}
          >
            Random Joke
          </NavLink>
        </li> */}
        {/* <li className="pt-3 md:pt-0">
          <NavLink
            to="/jokes/random-joke"
            className={"mr-5"}
          >
            Random Joke
          </NavLink>
        </li> */}
        <li className="pt-3 md:pt-0">
          <NavLink
            to="/jokes/daily-joke"
            onClick={closeMobileNav}
            className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
          >
            Jokes
          </NavLink>
        </li>
        {user ?
          <li>
            <NavLink
              to="/dashboard"
              onClick={closeMobileNav}
              className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
            >
              Dashboard
            </NavLink>
          </li>
        : <>
            <li>
              <NavLink
                to="/register"
                onClick={closeMobileNav}
                className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                onClick={closeMobileNav}
                className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
              >
                Login
              </NavLink>
            </li>
          </>
        }

        <li>
          <NavLink
            to="/about"
            onClick={closeMobileNav}
            className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            onClick={closeMobileNav}
            className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
          >
            Contact
          </NavLink>
        </li>
        <li className="md:ml-2 md:mt-2 pb-4 md:pb-0">
          <LegalMenu />
        </li>
        <li className="pb-3 md:pb-0 mt-[-10px] md:mt-0">
          <button
            type="button"
            title="Toggle light/dark theme"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center"
          >
            {colorTheme === "dark" ?
              <MdOutlineLightMode size={25} />
            : <MdOutlineDarkMode size={25} />}
          </button>
        </li>
        <li className="md:ml-2 md:mt-2 pb-4 md:pb-0">
          <UserMenu />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
