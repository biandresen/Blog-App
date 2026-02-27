import { NavLink } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { CgNotes } from "react-icons/cg";
import { TbChartBarPopular } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoDice } from "react-icons/io5";
import { FaCalendarDay, FaComments } from "react-icons/fa";
import { GiCrown, GiFire, GiPodium, GiRocket } from "react-icons/gi";
import { GiBattleGear } from "react-icons/gi";

import { useUser } from "../../contexts/UserContext";

const linkName1: string = "Search";
const linkName2: string = "All Jokes";
const linkName3: string = "Popular Jokes";
const linkName4: string = "Random Joke";
const linkName5: string = "Daily Joke";
const linkName6: string = "Hall of Fame";
const linkName7: string = "Joke vs. Joke";
const linkName8: string = "My Jokes";
const linkName9: string = "Trending Joke";
const linkName10: string = "Most Commented";
const linkName11: string = "Fastest Growing";
const linkName12: string = "Top Creator";

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
    <aside className="bg-[var(--primary-shade)] absolute left-0 w-full h-[calc(100vh-3.8rem)] md:max-w-64 md:static z-40">
      <div className="ml-8 mt-5 md:mt-16">
        <ul onClick={handleLinkClick} className="flex flex-col gap-3 w-54">
          <NavLink
            to="/jokes/hall-of-fame"
            title="Hall of Fame"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <GiPodium size={30}/>
            <span className="text-xl font-medium">{linkName6}</span>
          </NavLink>

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
            to="/jokes/top-creator-month"
            title="Top Creator This Month"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <GiCrown size={30} />
            <span className="text-xl font-medium">{linkName12}</span>
          </NavLink>

          <NavLink
            to="/jokes/trending-week"
            title="Trending This Week"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <GiFire size={30} />
            <span className="text-xl font-medium">{linkName9}</span>
          </NavLink>

          <NavLink
            to="/jokes/most-commented-week"
            title="Most Commented This Week"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <FaComments size={30} />
            <span className="text-xl font-medium">{linkName10}</span>
          </NavLink>

          <NavLink
            to="/jokes/fastest-growing"
            title="Fastest Growing This Week"
            className={({ isActive }) =>
              isActive
                ? "flex gap-2 items-center bg-[var(--primary)] mr-1.5 py-1 px-4 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <GiRocket size={30} />
            <span className="text-xl font-medium">{linkName11}</span>
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
            <span className="text-xl font-medium">{linkName7}</span>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar2;
