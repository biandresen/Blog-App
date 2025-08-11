import { NavLink } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

const linkName1: string = "New post";
const linkName2: string = "Drafts";
const linkName3: string = "Profile";

const Sidebar = () => {
  return (
    <div className="bg-[var(--primary-shade)] absolute left-0 w-full h-full md:h-auto md:max-w-55 md:static">
      <div className="ml-8 mt-5">
        <ul className="flex flex-col gap-3">
          <NavLink
            to="/dashboard/new-post"
            className={({ isActive }) =>
              isActive ?
                "flex gap-2 items-center bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
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
                "flex gap-2 items-center bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
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
                "flex gap-2 items-center bg-[var(--primary-shade)] py-1 px-4 rounded-full -ml-4"
              : "flex gap-2 items-center bg-transparent py-1 px-4 rounded-full -ml-4"
            }
          >
            <CgProfile size={30} />
            <span className="text-xl font-medium">{linkName3}</span>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
