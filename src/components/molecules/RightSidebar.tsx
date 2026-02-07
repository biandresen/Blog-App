import { usePosts } from "../../contexts/PostsContext";
import PostCard from "./PostCard";

const RightSidebar = () => {
  const { posts } = usePosts();
  const topPosts = posts.slice(0, posts.length >= 100 ? 100 : posts.length);

  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-[calc(100vh-3.8rem)] md:max-w-55 lg:max-w-65 md:static overflow-y-auto z-40">
      <h3 className="text-center text-3xl md:text-2xl mt-8 md:mt-16">Navigation</h3>
      <div className="flex md:flex-col flex-wrap items-center justify-center px-4 py-8 gap-4">
        {!posts.length && (
          <div>
            <h3 className="text-[var(--text2)] font-normal">No posts found</h3>
          </div>
        )}
        {topPosts.map((post) => (
          <PostCard key={post.id} id={post.id} title={post.title} />
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
