import { useCallback, useState, type CSSProperties } from "react";
import PostCard from "../../../components/molecules/PostCard";
import Searchbar from "../../../components/molecules/Searchbar";
import { usePosts } from "../../../contexts/PostsContext";
import type { PostType } from "../../../types/post.types";
import { ClipLoader } from "react-spinners";

type FilteredPostType = PostType & { matches?: string[] };

const Search = () => {
  const [targetPosts, setTargetPosts] = useState<FilteredPostType[] | null>(null);
  const { posts, loading, error } = usePosts();
  const [filters, setFilters] = useState({
    title: true,
    body: true,
    comments: true,
    tags: true,
  });

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

          if (filters.title && post.title.toLowerCase().includes(lowerInput)) {
            matches.push("title");
          }

          if (filters.body && post.body.toLowerCase().includes(lowerInput)) {
            matches.push("body");
          }

          if (filters.comments && post.comments.some((c) => c.body.toLowerCase().includes(lowerInput))) {
            matches.push("comment");
          }

          if (filters.tags && post.tags.some((t) => t.name.toLowerCase().includes(lowerInput))) {
            matches.push("tag");
          }

          if (matches.length > 0) {
            return { ...post, matches };
          }

          return null;
        })
        .filter(Boolean) as FilteredPostType[];

      setTargetPosts(filteredPosts);
    },
    [posts, filters]
  );

  const override: CSSProperties = { color: "var(--text1)" };

  if (loading) {
    return (
      <div className="spinner-position">
        <ClipLoader color={override.color} cssOverride={override} size={150} />
      </div>
    );
  }

  if (error) {
    return <div className="text-[var(--error)] text-center">Failed to load posts</div>;
  }

  const postsToShow = targetPosts ?? null;

  return (
    <div>
      <div className="flex justify-center gap-2 md:gap-4 my-4 flex-wrap text-[var(--text1)]">
        <b>Filters:</b>
        {Object.keys(filters).map((filter) => (
          <label key={filter} className="flex items-center gap-2 text-[var(--text1)]">
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
              {(post as any)?.matches?.length > 0 && (
                <p className="text-sm text-[var(--text1)] opacity-70 mt-1">
                  Found in: {(post as any).matches.join(", ")}
                </p>
              )}
            </div>
          ))}
      </section>
    </div>
  );
};

export default Search;
