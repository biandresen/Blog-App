import { useMemo } from "react";
import PostCard from "./PostCard";
import { usePostsStore } from "../../stores/posts/PostsProvider";
import { selectPublishedPosts } from "../../stores/posts/posts.selectors";

const RightSidebar = () => {
  const store = usePostsStore();
  const posts = useMemo(() => selectPublishedPosts(store), [store.byId, store.lists.published]);
  const topPosts = posts.slice(0, 10);

  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-[calc(100vh-3.8rem)] md:max-w-55 lg:max-w-65 md:static overflow-y-auto">
      <h3 className="text-center text-3xl md:text-2xl mt-8 md:mt-16">Navigation</h3>

      <div className="flex md:flex-col flex-wrap items-center justify-center px-4 py-8 gap-4">
        {!topPosts.length && (
          <div>
            <h3 className="text-[var(--text2)] font-normal">
              {store.status.published.loaded ? "No posts found" : "Open Posts to load navigation"}
            </h3>
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
