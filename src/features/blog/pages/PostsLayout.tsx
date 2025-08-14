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
    <div className="flex min-h-screen relative">
      {leftBarIsOpen && <LeftSidebar2 setLeftBarIsOpen={setLeftBarIsOpen} />}
      <div data-name="main-content" className="flex-1 p-6">
        <Outlet />
      </div>
      {rightBarIsOpen && <RightSidebar />}
    </div>
  );
};

export default PostsLayout;
