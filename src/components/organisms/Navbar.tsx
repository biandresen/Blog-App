import { NavLink } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useColorTheme } from "../../contexts/ColorThemeContext";
import { useUser } from "../../contexts/UserContext";

import { type NavbarProps } from "../../types/components.types";

const Navbar = ({ isOpen }: NavbarProps) => {
  const { colorTheme, toggleTheme } = useColorTheme();
  const { user } = useUser();

  return (
    <nav
      className={`
        ${isOpen ? "block" : "hidden"}
        z-500
        absolute top-14 left-0 w-full
        font-medium text-[1.2rem]
        bg-[var(--primary)]
        animate-in fade-in duration-300
        md:block
        md:static
        md:place-items-end
      `}
    >
      <ul className="flex flex-col gap-4 ml-8 md:flex-row md:items-center md:gap-6 md:ml-0">
        <li className="pt-3 md:pt-0">
          <NavLink
            to="/posts"
            className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
          >
            Posts
          </NavLink>
        </li>
        {user !== null ?
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
            >
              Dashboard
            </NavLink>
          </li>
        : <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
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
            className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link-inactive")}
          >
            Contact
          </NavLink>
        </li>
        <li className="pb-3 md:pb-0">
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
      </ul>
    </nav>
  );
};

export default Navbar;
