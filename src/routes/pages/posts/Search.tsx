import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import PostCard from "../../../components/molecules/PostCard";
import Searchbar from "../../../components/molecules/Searchbar";
import type { PostType } from "../../../types/post.types";
import { ClipLoader } from "react-spinners";

import { usePostsStore } from "../../../stores/posts/PostsProvider";
import { selectPublishedPosts } from "../../../stores/posts/posts.selectors";

type FilteredPostType = PostType & { matches?: string[] };

const Search = () => {
  const store = usePostsStore();
  const posts = useMemo(() => selectPublishedPosts(store), [store.byId, store.lists.published]);

  const [targetPosts, setTargetPosts] = useState<FilteredPostType[] | null>(null);
  const [filters, setFilters] = useState({
    title: true,
    body: true,
    comments: true,
    tags: true,
  });

  // Ensure we actually have posts available for search
  useEffect(() => {
    if (!store.status.published.loaded && !store.status.published.loading) {
      store.ensurePublished(1, 50);
    }
  }, [store]);

  const handleSearch = useCallback(
    (searchInput: string) => {
      if (searchInput.trim() === "") {
        setTargetPosts(null);
        return;
      }

      const lowerInput = searchInput.toLowerCase();

      const filteredPosts = posts
        .map((post) => {
          const matches: string[] = [];

          if (filters.title && post.title.toLowerCase().includes(lowerInput)) matches.push("title");
          if (filters.body && post.body.toLowerCase().includes(lowerInput)) matches.push("body");

          if (filters.comments && post.comments.some((c) => c.body.toLowerCase().includes(lowerInput))) {
            matches.push("comment");
          }

          if (filters.tags && post.tags.some((t) => t.name.toLowerCase().includes(lowerInput))) {
            matches.push("tag");
          }

          return matches.length ? { ...post, matches } : null;
        })
        .filter(Boolean) as FilteredPostType[];

      setTargetPosts(filteredPosts);
    },
    [posts, filters]
  );

  const override: CSSProperties = { color: "var(--text1)" };

  if (store.status.published.loading) {
    return (
      <div className="spinner-position">
        <ClipLoader color={override.color} cssOverride={override} size={150} />
      </div>
    );
  }

  if (store.status.published.error) {
    return <div className="text-[var(--error)] text-center">Failed to load posts</div>;
  }

  const postsToShow = targetPosts ?? null;

  return (
    <div>
      <div className="flex justify-center gap-2 md:gap-4 my-4 flex-wrap text-[var(--text1)]">
        <b>Filters:</b>
        {Object.keys(filters).map((filter) => (
          <label key={filter} className="flex items-center gap-1 text-[var(--text1)]">
            <input
              type="checkbox"
              checked={filters[filter as keyof typeof filters]}
              className="md:w-5 md:h-5 accent-[var(--primary)]"
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  [filter]: !prev[filter as keyof typeof filters],
                }))
              }
            />
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </label>
        ))}
      </div>

      <Searchbar handleSearch={handleSearch} />

      <section className="posts-section">
        {postsToShow &&
          postsToShow.map((post) => (
            <div key={post.id} className="mb-4">
              <PostCard id={post.id} title={post.title} />
              {post.matches?.length ? (
                <p className="text-sm text-[var(--text1)] opacity-70 mt-1">Found in: {post.matches.join(", ")}</p>
              ) : null}
            </div>
          ))}
      </section>
    </div>
  );
};

export default Search;
