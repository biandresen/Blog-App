import { Outlet } from "react-router-dom";
import LeftSidebar from "../../components/molecules/LeftSidebar";

interface DashboardLayoutProps {
  sidebars: {
    left: boolean;
    right: boolean;
  };
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}

const DashboardLayout = ({ setSidebars, sidebars }: DashboardLayoutProps) => {
  return (
    <div className="flex h-[calc(100vh-3.8rem)] relative">
      {sidebars.left && <LeftSidebar setSidebars={setSidebars} />}
      <div data-name="main-content" className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
