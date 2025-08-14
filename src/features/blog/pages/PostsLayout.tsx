import { Outlet } from "react-router-dom";
import LeftSidebar2 from "../../../components/molecules/LeftSidebar2";
import RightSidebar from "../../../components/molecules/RightSidebar";

interface PostsLayoutProps {
  setLeftBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  leftBarIsOpen: boolean;
  rightBarIsOpen: boolean;
}

const PostsLayout = ({ setLeftBarIsOpen, leftBarIsOpen, rightBarIsOpen }: PostsLayoutProps) => {
  return (
    <div className="flex relative h-[calc(100vh-3.8rem)]">
      {leftBarIsOpen && <LeftSidebar2 setLeftBarIsOpen={setLeftBarIsOpen} />}
      <div data-name="main-content" className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
      {rightBarIsOpen && <RightSidebar />}
    </div>
  );
};

export default PostsLayout;
