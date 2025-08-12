import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/molecules/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div data-name="main-content" className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
