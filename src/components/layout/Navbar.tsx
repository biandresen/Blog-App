import { NavLink } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useColorTheme } from "../../contexts/ColorThemeContext";
import { useUser } from "../../contexts/UserContext";

interface NavbarProps {
  isOpen: boolean;
}

const Navbar = ({ isOpen }: NavbarProps) => {
  const { colorTheme, toggleTheme } = useColorTheme();
  const { user } = useUser();

  return (
    <nav
      className={`
        ${isOpen ? "block" : "hidden"}
        z-50
        absolute top-14 left-0 w-full
        font-medium text-[1.2rem]
        theme-primary
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
            className={({ isActive }) =>
              isActive ?
                "bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
              : "bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            Posts
          </NavLink>
        </li>
        {user !== null ?
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ?
                  "bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4 lg:ml-0"
                : "bg-transparent py-1 px-4 rounded-full -ml-4"
              }
            >
              Dashboard
            </NavLink>
          </li>
        : <>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ?
                    "bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4 lg:ml-0"
                  : "bg-transparent py-1 px-4 rounded-full -ml-4"
                }
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ?
                    "bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4 lg:ml-0"
                  : "bg-transparent py-1 px-4 rounded-full -ml-4"
                }
              >
                Login
              </NavLink>
            </li>
          </>
        }

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ?
                "bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4 lg:ml-0"
              : "bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ?
                "bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4 lg:ml-0"
              : "bg-transparent py-1 px-4 rounded-full -ml-4"
            }
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
