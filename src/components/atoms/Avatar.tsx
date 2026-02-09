import { useState } from "react";
import { IoIosPerson } from "react-icons/io";
import BLOG_API from "../../api/blog-api";

type AvatarProps = {
  avatarUrl: string | null | undefined;
  size: number;
};

const Avatar = ({ avatarUrl, size }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);
  // If no URL or image failed → show fallback icon
  if (!avatarUrl || hasError) {
    return <IoIosPerson className="" size={size} />;
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="overflow-hidden rounded-full"
    >
      <img
        src={`${BLOG_API.BASE_AVATAR}${avatarUrl}`}
        alt="avatar"
        className="object-cover w-full h-full"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Avatar;
