import { CgProfile } from "react-icons/cg";

const Avatar = ({ avatarUrl, size }: { avatarUrl: string | null; size: number }) => {
  console.log(avatarUrl);

  return avatarUrl ? (
    <div style={{ width: size, height: size }} className="overflow-hidden rounded-full">
      <img src={`http://localhost:3000${avatarUrl}`} alt="avatar" className="object-cover w-full h-full" />
    </div>
  ) : (
    <CgProfile size={size} />
  );
};

export default Avatar;
