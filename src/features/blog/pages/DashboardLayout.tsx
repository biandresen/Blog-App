import { Outlet } from "react-router-dom";
import LeftSidebar from "../../../components/molecules/LeftSidebar";

interface DashboardLayoutProps {
  setLeftBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  leftBarIsOpen: boolean;
}

const DashboardLayout = ({ setLeftBarIsOpen, leftBarIsOpen }: DashboardLayoutProps) => {
  return (
    <div className="flex h-[calc(100vh-3.8rem)] relative">
      {leftBarIsOpen && <LeftSidebar setLeftBarIsOpen={setLeftBarIsOpen} />}
      <div data-name="main-content" className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
