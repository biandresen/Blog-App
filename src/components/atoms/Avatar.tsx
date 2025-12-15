import { CgProfile } from "react-icons/cg";
import BLOG_API from "../../api/blog-api";

const Avatar = ({ avatarUrl, size }: { avatarUrl: string | null; size: number }) => {
  return avatarUrl ? (
    <div style={{ width: size, height: size }} className={`overflow-hidden rounded-full`}>
      <img src={`${BLOG_API.BASE_AVATAR}${avatarUrl}`} alt="avatar" className="object-cover w-full h-full" />
    </div>
  ) : (
    <CgProfile size={size} />
  );
};

export default Avatar;
