import { useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import BLOG_API from "../../api/blog-api";

type AvatarProps = {
  avatarUrl: string | null | undefined;
  size: number;
};

const Avatar = ({ avatarUrl, size }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [avatarUrl]);

  if (!avatarUrl || hasError) {
    return <IoIosPerson size={size} />;
  }

  const src = `${BLOG_API.BASE_AVATAR}${avatarUrl}`;

  return (
    <div title="Profile picture" style={{ width: size, height: size }} className="overflow-hidden rounded-full">
      <img
        src={src}
        alt="avatar"
        className="object-cover w-full h-full"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Avatar;
