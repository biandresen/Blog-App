import { useCallback, useEffect, useMemo, useState } from "react";
import PostCard from "../../../components/molecules/PostCard";
import Searchbar from "../../../components/molecules/Searchbar";
import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import { usePagination } from "../../../hooks/usePagination";
import { searchPosts, type SearchFilters } from "../../../lib/axios"
import type { PostType } from "../../../types/post.types";

type FilteredPostType = PostType & { matches?: string[] };

const LIMIT = 15;

function computeMatches(post: PostType, q: string, filters: SearchFilters): string[] {
  const input = q.toLowerCase();
  const matches: string[] = [];

  if (filters.title && post.title?.toLowerCase().includes(input)) matches.push("title");
  if (filters.body && post.body?.toLowerCase().includes(input)) matches.push("body");
  if (
    filters.comments &&
    post.comments?.some((c) => c.body?.toLowerCase().includes(input))
  ) {
    matches.push("comment");
  }
  if (filters.tags && post.tags?.some((t) => t.name?.toLowerCase().includes(input))) {
    matches.push("tag");
  }

  return matches;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    title: true,
    body: true,
    comments: true,
    tags: true,
  });

  // Debounce typing so you don't spam the backend
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query]);

  // args passed to fetch fn after (page, limit)
  const args = useMemo<any[]>(() => {
    if (!debouncedQuery) return [];
    return [debouncedQuery, filters, "desc"];
  }, [debouncedQuery, filters]);

  // reset pagination whenever query/filters change
  const resetKey = useMemo(() => {
    return `search:${debouncedQuery}:${filters.title}-${filters.body}-${filters.comments}-${filters.tags}`;
  }, [debouncedQuery, filters]);

  const noopSetAccessToken = useCallback(() => {}, []);

  const {
    items,
    meta,
    loading,
    error,
    canNext,
    next: loadMore,
    sentinelRef,
    reload,
  } = usePagination<PostType>(searchPosts, {
    accessToken: null,
    setAccessToken: noopSetAccessToken,
    limit: LIMIT,
    args,
    resetKey,
    enabled: !!debouncedQuery, // don't request until we have a query
    mode: "infinite",
    autoLoadMore: true,
    rootMargin: "700px",
  });

  const postsToShow: FilteredPostType[] = useMemo(() => {
    if (!debouncedQuery) return [];
    return (items ?? []).map((p) => ({
      ...p,
      matches: computeMatches(p, debouncedQuery, filters),
    }));
  }, [items, debouncedQuery, filters]);

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">SEARCH</h2>

      <div className="flex justify-center gap-2 md:gap-4 my-4 flex-wrap text-[var(--text1)]">
        <b>Filters:</b>
        {Object.keys(filters).map((filterKey) => {
          const key = filterKey as keyof SearchFilters;
          return (
            <label key={filterKey} className="flex items-center gap-1 text-[var(--text1)]">
              <input
                type="checkbox"
                checked={filters[key]}
                className="md:w-5 md:h-5 accent-[var(--primary)]"
                onChange={() => setFilters((prev: any) => ({ ...prev, [key]: !prev[key] }))}
              />
              {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
            </label>
          );
        })}
      </div>

      {/* Use Searchbar only to set the query; paging is handled by usePagination */}
      <Searchbar handleSearch={(v) => setQuery(v)} />

      <div className="flex justify-center gap-3 mt-4">
        <Button
          onClick={reload}
          type="button"
          size="md"
          variant="secondary"
          label="reload search"
          disabled={!debouncedQuery}
        >
          Reload
        </Button>
      </div>

      {!debouncedQuery && (
        <div className="mt-6 text-center text-[var(--text1)] opacity-70">
          Type something to search jokes.
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-[var(--error)]">
          {error}
        </div>
      )}

    <section className="posts-section">
  {loading && postsToShow.length === 0 && <Spinner />}

  {!loading && debouncedQuery && postsToShow.length === 0 && !error && (
    <div>
      <h3 className="posts-section-heading text-[var(--text1)]">No results</h3>
    </div>
  )}

  {/* ✅ Old look: flex-wrap cards, no collisions */}
  <div className="flex w-full flex-wrap justify-center gap-4">
    {postsToShow.map((post) => (
      <div
  key={post.id}
  className="
    flex flex-col items-center
    flex-[1_1_240px]
    min-w-[220px]
    max-w-[360px]
  "
>
        <div className="w-full min-w-0">
          <PostCard id={post.id} title={post.title} />
        </div>

        {post.matches?.length ? (
          <p className="mt-2 text-center text-sm text-[var(--text1)] opacity-70">
            Found in: {post.matches.join(", ")}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
    ))}
  </div>

  {/* Infinite scroll sentinel */}
  {debouncedQuery && <div ref={sentinelRef} className="h-8 w-full" />}

  {canNext && (
    <div className="mt-6 flex justify-center w-full">
      <Button
        onClick={loadMore}
        type="button"
        size="md"
        variant="secondary"
        label="load more search results"
        disabled={loading}
      >
        {loading ? "Loading..." : "Load more"}
      </Button>
    </div>
  )}

  {meta && (
    <div className="text-center text-sm opacity-70 text-[var(--text1)] w-full">
      Showing {postsToShow.length} of {meta.total}
    </div>
  )}
</section>
    </div>
  );
};

export default Search;