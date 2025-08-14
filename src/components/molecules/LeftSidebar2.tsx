import { NavLink } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { CgNotes } from "react-icons/cg";
import { TbChartBarPopular } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

const linkName1: string = "Search";
const linkName2: string = "All posts";
const linkName3: string = "Popular";
const linkName4: string = "My posts";

const LeftSidebar2 = ({ setLeftBarIsOpen }: any) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setLeftBarIsOpen(false);
    }
  };

  return (
    <aside className="bg-[var(--primary-shade)] absolute left-0 w-full h-full md:h-auto md:max-w-45 md:static z-100">
      <div className="ml-8 mt-16">
        <ul onClick={handleLinkClick} className="flex flex-col gap-3">
          <NavLink
            to="/posts/search"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <ImSearch size={30} />
            <span className="text-xl font-medium">{linkName1}</span>
          </NavLink>
          <NavLink
            to="/posts/all-posts"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <CgNotes size={30} />
            <span className="text-xl font-medium">{linkName2}</span>
          </NavLink>{" "}
          <NavLink
            to="/posts/popular"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <TbChartBarPopular size={30} />
            <span className="text-xl font-medium">{linkName3}</span>
          </NavLink>
          <NavLink
            to="/posts/my-posts"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <CgProfile size={30} />
            <span className="text-xl font-medium">{linkName4}</span>
          </NavLink>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar2;
