import { NavLink } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";

import { type LeftSidebarProps } from "../../types/components.types";
import { useUser } from "../../contexts/UserContext";

const linkName1: string = "New post";
const linkName2: string = "Drafts";
const linkName3: string = "Profile";
const linkName4: string = "Admin";

const LeftSidebar = ({ setSidebars }: LeftSidebarProps) => {
  const { user } = useUser();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebars(() => ({ left: false, right: false}));
    }
  };

  return (
    <aside className="bg-[var(--primary-shade)] absolute left-0 w-full h-[calc(100vh-3.8rem)] md:max-w-45 md:static z-40">
      <div className="ml-8 mt-5 md:mt-16">
        <ul onClick={handleLinkClick} className="flex flex-col gap-3 w-37">
          <NavLink
            to="/dashboard/new-post"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary)] mr-3 py-1 px-4 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <MdNoteAdd size={30} />
            <span className="text-xl font-medium">{linkName1}</span>
          </NavLink>
          <NavLink
            to="/dashboard/drafts"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary)] py-1 px-4 mr-3 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <GrNotes size={30} />
            <span className="text-xl font-medium">{linkName2}</span>
          </NavLink>{" "}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary)] py-1 px-4 mr-3 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <CgProfile size={30} />
            <span className="text-xl font-medium">{linkName3}</span>
          </NavLink>
          {user && user.role === "ADMIN" && (
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                isActive ?
                  "flex gap-2 items-center bg-[var(--primary)] py-1 px-4 mr-3 rounded-full -ml-4"
                : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
              }
            >
              <GrUserAdmin size={30} />
              <span className="text-xl font-medium">{linkName4}</span>
            </NavLink>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;
