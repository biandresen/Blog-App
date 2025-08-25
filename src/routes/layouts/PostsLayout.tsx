import { Outlet } from "react-router-dom";
import LeftSidebar2 from "../../components/molecules/LeftSidebar2";
import RightSidebar from "../../components/molecules/RightSidebar";

interface PostsLayoutProps {
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

const PostsLayout = ({ setSidebars, sidebars }: PostsLayoutProps) => {
  return (
    <div className="flex relative h-[calc(100vh-3.8rem)]">
      {sidebars.left && <LeftSidebar2 setSidebars={setSidebars} />}
      <div data-name="main-content" className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
      {sidebars.right && <RightSidebar />}
    </div>
  );
};

export default PostsLayout;
