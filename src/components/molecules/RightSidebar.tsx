// src/components/molecules/RightSidebar.tsx (or where it lives)
import { useMemo } from "react";
import PostCard from "./PostCard";
import Button from "../atoms/Button";
import { usePagination } from "../../hooks/usePagination";
import { getAllPosts } from "../../lib/axios";
import type { PostType } from "../../types/post.types";
import { useAuth } from "../../contexts/AuthContext";

const NAV_LIMIT = 4;

const RightSidebar = () => {
  const { accessToken, setAccessToken } = useAuth();

  // If you later add filters (tag, sort, search), change resetKey accordingly
  const resetKey = useMemo(() => "right-nav", []);

  const {
    items: posts,
    meta,
    loading,
    error,
    canPrev,
    canNext,
    prev,
    next,
    reload,
  } = usePagination<PostType>(getAllPosts, {
    accessToken,          // ok even if null (your getAllPosts ignores it)
    setAccessToken,       // required by hook signature
    limit: NAV_LIMIT,
    mode: "paged",
    resetKey,
  });

  return (
    <aside className="bg-[var(--primary-shade)] absolute right-0 w-full h-[calc(100vh-3.8rem)] md:max-w-55 lg:max-w-65 md:static overflow-y-auto z-40">
      <h3 className="text-center text-3xl md:text-2xl mt-8 md:mt-16">Navigation</h3>

      <div className="flex md:flex-col flex-wrap items-center justify-center px-4 py-8 gap-4">
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {!loading && posts.length === 0 && !error && (
          <div className="text-center">
            <h3 className="text-[var(--text2)] font-normal mb-5">No jokes found</h3>
            <Button onClick={reload} label="Get jokes" type="button" variant="primary">
              Get jokes
            </Button>
          </div>
        )}

        {posts.map((post) => (
          <PostCard key={post.id} id={post.id} title={post.title} />
        ))}

        {/* Paged controls */}
        {meta && (
          <div className="w-full flex items-center justify-between gap-2 mt-4">
            <Button
              onClick={prev}
              type="button"
              variant="secondary"
              label="Previous"
              disabled={!canPrev || loading}
            >
              Prev
            </Button>

            <div className="text-xs opacity-70 text-[var(--text2)]">
              Page {meta.page} / {meta.totalPages}
            </div>

            <Button
              onClick={next}
              type="button"
              variant="secondary"
              label="Next"
              disabled={!canNext || loading}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSidebar;
