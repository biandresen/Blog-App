import { Outlet } from "react-router-dom";

import LeftSidebar from "../../components/molecules/LeftSidebar";
import { type DashboardLayoutProps } from "../../types/layout.types";

const DashboardLayout = ({ setSidebars, sidebars }: DashboardLayoutProps) => {
  return (
    <div className="layout-container">
      {sidebars.left && <LeftSidebar setSidebars={setSidebars} />}
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
