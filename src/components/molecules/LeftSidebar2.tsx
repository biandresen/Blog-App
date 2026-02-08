import { NavLink } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { CgNotes } from "react-icons/cg";
import { TbChartBarPopular } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useUser } from "../../contexts/UserContext";

const linkName1: string = "Search";
const linkName2: string = "All jokes";
const linkName3: string = "Popular";
const linkName4: string = "My jokes";

interface LeftSidebar2Props {
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}

const LeftSidebar2 = ({ setSidebars }: LeftSidebar2Props) => {
  const { user } = useUser();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebars(() => ({ left: false, right: false }));
    }
  };

  return (
    <aside className="bg-[var(--primary-shade)] absolute left-0 w-full h-[calc(100vh-3.8rem)] md:max-w-45 md:static z-40">
      <div className="ml-8 mt-5 md:mt-16">
        <ul onClick={handleLinkClick} className="flex flex-col gap-3 w-37">
          <NavLink
            to="/jokes/search"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-3 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <ImSearch size={30} />
            <span className="text-xl font-medium">{linkName1}</span>
          </NavLink>
          <NavLink
            to="/jokes/all-jokes"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-3 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <CgNotes size={30} />
            <span className="text-xl font-medium">{linkName2}</span>
          </NavLink>{" "}
          <NavLink
            to="/jokes/popular"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-3 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <TbChartBarPopular size={30} />
            <span className="text-xl font-medium">{linkName3}</span>
          </NavLink>
          {user && (
            <NavLink
              to="/jokes/my-jokes"
              className={({ isActive }) =>
                isActive
                  ? "flex gap-2 items-center bg-[var(--primary)] mr-3 py-1 px-4 rounded-full -ml-4"
                  : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
              }
            >
              <CgProfile size={30} />
              <span className="text-xl font-medium">{linkName4}</span>
            </NavLink>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar2;
