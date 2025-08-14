import { Outlet } from "react-router-dom";
import LeftSidebar from "../../../components/molecules/LeftSidebar";

interface DashboardLayoutProps {
  setLeftBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  leftBarIsOpen: boolean;
}

const DashboardLayout = ({ setLeftBarIsOpen, leftBarIsOpen }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen relative">
      {leftBarIsOpen && <LeftSidebar setLeftBarIsOpen={setLeftBarIsOpen} />}
      <div data-name="main-content" className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
