import { Outlet } from "react-router-dom";
import LeftSidebar from "../../../components/molecules/LeftSidebar";
import RightSidebar from "../../../components/molecules/RightSidebar";

interface DashboardLayoutProps {
  setLeftBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  leftBarIsOpen: boolean;
  rightBarIsOpen: boolean;
}

const DashboardLayout = ({ setLeftBarIsOpen, leftBarIsOpen, rightBarIsOpen }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen relative">
      {leftBarIsOpen && <LeftSidebar setLeftBarIsOpen={setLeftBarIsOpen} />}
      <div data-name="main-content" className="flex-1 p-6">
        <Outlet />
      </div>
      {rightBarIsOpen && <RightSidebar />}
    </div>
  );
};

export default DashboardLayout;
