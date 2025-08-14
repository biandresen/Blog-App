import PostCard from "./PostCard";

const RightSidebar = () => {
  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-[calc(100vh-3.8rem)] md:max-w-55 lg:max-w-65 md:static overflow-y-auto">
      <h3 className="text-center text-3xl md:text-2xl mt-8 md:mt-16">Navigation</h3>
      <div className="flex md:flex-col flex-wrap  items-center justify-center px-4 py-8 gap-4">
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
      </div>
    </aside>
  );
};

export default RightSidebar;
