import { NavLink } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { CgNotes } from "react-icons/cg";
import { TbChartBarPopular } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoDice } from "react-icons/io5";
import { FaCalendarDay } from "react-icons/fa";
import { GiPodium } from "react-icons/gi";
import { GiBattleGear } from "react-icons/gi";

import { useUser } from "../../contexts/UserContext";

const linkName1: string = "Search";
const linkName2: string = "All Jokes";
const linkName3: string = "Popular";
const linkName4: string = "Random";
const linkName5: string = "Daily Joke";
const linkName6: string = "Joke vs. Joke";
const linkName7: string = "Leaderboard";
const linkName8: string = "My Jokes";

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
    <aside className="bg-[var(--primary-shade)] absolute left-0 w-full h-[calc(100vh-3.8rem)] md:max-w-53 md:static z-40">
      <div className="ml-8 mt-5 md:mt-16">
        <ul onClick={handleLinkClick} className="flex flex-col gap-3 w-43">
          <NavLink
            to="/jokes/search"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
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
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
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
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <TbChartBarPopular size={30} />
            <span className="text-xl font-medium">{linkName3}</span>
          </NavLink>
          <NavLink
            to="/jokes/random-joke"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <IoDice size={30} />
            <span className="text-xl font-medium">{linkName4}</span>
          </NavLink>

          <NavLink
            to="/jokes/daily-joke"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <FaCalendarDay size={26} />
            <span className="text-xl font-medium">{linkName5}</span>
          </NavLink>

          <NavLink
            to=""
            title="Future feature"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center mr-1.5 py-1 px-4 rounded-full -ml-4 opacity-50 cursor-not-allowed"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4 opacity-50 cursor-not-allowed"
            }
          >
            <GiBattleGear size={30} />
            <span className="text-xl font-medium">{linkName6}</span>
          </NavLink>

          <NavLink
            to=""
            title="Future feature"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center mr-1.5 py-1 px-4 rounded-full -ml-4 opacity-50 cursor-not-allowed"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4 opacity-50 cursor-not-allowed"
            }
          >
            <GiPodium size={30}/>
            <span className="text-xl font-medium">{linkName7}</span>
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
              <span className="text-xl font-medium">{linkName8}</span>
            </NavLink>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar2;
