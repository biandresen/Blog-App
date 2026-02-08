import { Outlet } from "react-router-dom";

import LeftSidebar2 from "../../components/molecules/LeftSidebar2";
import RightSidebar from "../../components/molecules/RightSidebar";
import { type PostsLayoutProps } from "../../types/layout.types";

const JokesLayout = ({ setSidebars, sidebars }: PostsLayoutProps) => {
  return (
    <div className="layout-container">
      {sidebars.left && <LeftSidebar2 setSidebars={setSidebars} />}
      <div className="outlet-container">
        <Outlet />
      </div>
      {sidebars.right && <RightSidebar />}
    </div>
  );
};

export default JokesLayout;
