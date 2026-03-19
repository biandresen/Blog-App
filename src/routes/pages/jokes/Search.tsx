import { useCallback, useEffect, useMemo, useState } from "react";

import PostCard from "../../../components/molecules/PostCard";
import Searchbar from "../../../components/molecules/Searchbar";
import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";

import { usePagination } from "../../../hooks/usePagination";
import { searchPosts, type SearchFilters } from "../../../lib/axios";
import type { PostType } from "../../../types/post.types";
import { useLanguage } from "../../../contexts/LanguageContext";

type FilteredPostType = PostType & { matches?: string[] };

const LIMIT = 15;

function computeMatches(post: PostType, q: string, filters: SearchFilters): string[] {
  const input = q.trim().toLowerCase();
  if (!input) return [];

  console.log(filters)
  console.log(post)


  const matches: string[] = [];

  if (filters.title && post.title?.toLowerCase().includes(input)) {
    matches.push("title");
  }

  if (filters.body && post.body?.toLowerCase().includes(input)) {
    matches.push("body");
  }

  if (filters.comments) {
    matches.push("comment");
  }

  if (
    filters.tags &&
    post.tags?.some((tag) =>
      tag.name?.toLowerCase().includes(input)
    )
  ) {
    matches.push("tag");
  }

  return matches;
}

const Search = () => {
  const { language, t, tf } = useLanguage();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    title: true,
    body: true,
    comments: true,
    tags: true,
  });

  // --------------------------------------------------
  // Debounce raw search input to avoid excessive requests
  // --------------------------------------------------
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [query]);

  const hasActiveFilters =
    filters.title || filters.body || filters.comments || filters.tags;

  const searchEnabled = Boolean(debouncedQuery) && hasActiveFilters;

  const args = useMemo<[string, SearchFilters, "desc", string] | []>(() => {
    if (!searchEnabled) return [];
    return [debouncedQuery, filters, "desc", language];
  }, [debouncedQuery, filters, language, searchEnabled]);

  const resetKey = useMemo(() => {
    return `search:${language}:${debouncedQuery}:${filters.title}-${filters.body}-${filters.comments}-${filters.tags}`;
  }, [language, debouncedQuery, filters]);

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
    enabled: searchEnabled,
    mode: "infinite",
    autoLoadMore: true,
    rootMargin: "700px",
  });

  const postsToShow: FilteredPostType[] = useMemo(() => {
    if (!searchEnabled) return [];

    return (items ?? []).map((post) => ({
      ...post,
      matches: computeMatches(post, debouncedQuery, filters),
    }));
  }, [items, debouncedQuery, filters, searchEnabled]);

  const filterEntries: Array<{ key: keyof SearchFilters; label: string }> = [
    { key: "title", label: t("search.filters.title") },
    { key: "body", label: t("search.filters.body") },
    { key: "comments", label: t("search.filters.comments") },
    { key: "tags", label: t("search.filters.tags") },
  ];

  const handleToggleFilter = (key: keyof SearchFilters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReload = () => {
    if (!searchEnabled || loading) return;
    reload();
  };

  const handleLoadMore = () => {
    if (!canNext || loading) return;
    loadMore();
  };

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">{t("search.heading")}</h2>

      <div className="flex justify-center gap-2 md:gap-4 my-4 flex-wrap text-[var(--text1)]">
        <b>{t("search.filters.heading")}</b>

        {filterEntries.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-1 text-[var(--text1)]">
            <input
              type="checkbox"
              checked={filters[key]}
              className="md:w-5 md:h-5 accent-[var(--primary)]"
              onChange={() => handleToggleFilter(key)}
            />
            {label}
          </label>
        ))}
      </div>

      <Searchbar handleSearch={setQuery} />

      <div className="flex justify-center gap-3 mt-4">
        <Button
          onClick={handleReload}
          type="button"
          size="md"
          variant="secondary"
          label={t("search.actions.reload")}
          disabled={!searchEnabled || loading}
        >
          {loading ? t("search.states.loading") : t("search.actions.reload")}
        </Button>
      </div>

      {!debouncedQuery && (
        <div className="mt-6 text-center text-[var(--text1)] opacity-70">
          {t("search.states.typeToSearch")}
        </div>
      )}

      {debouncedQuery && !hasActiveFilters && (
        <div className="mt-6 text-center text-[var(--text1)] opacity-70">
          {t("search.states.enableFilter", "Enable at least one filter to search.")}
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-[var(--error)]">
          {error}
        </div>
      )}

      <section className="posts-section">
        {loading && postsToShow.length === 0 && <Spinner />}

        {!loading && searchEnabled && postsToShow.length === 0 && !error && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">
              {t("search.states.noResults")}
            </h3>
          </div>
        )}

        <div className="flex w-full flex-wrap justify-center gap-4">
          {postsToShow.map((post) => (
            <div
              key={post.id}
              className="flex flex-col items-center flex-[1_1_240px] min-w-[220px] max-w-[360px]"
            >
              <div className="w-full min-w-0">
                <PostCard id={post.id} title={post.title} />
              </div>

              {post.matches?.length ? (
                <p className="mt-2 text-center text-sm text-[var(--text1)] opacity-70">
                  {t("search.states.foundIn")}:{" "}
                  {post.matches
                    .map((match) => t(`search.matchLabels.${match}`, match))
                    .join(", ")}
                </p>
              ) : (
                <div className="h-6" />
              )}
            </div>
          ))}
        </div>

        {searchEnabled && <div ref={sentinelRef} className="h-8 w-full" />}

        {canNext && (
          <div className="mt-6 flex justify-center w-full">
            <Button
              onClick={handleLoadMore}
              type="button"
              size="md"
              variant="secondary"
              label={t("search.actions.loadMore")}
              disabled={loading}
            >
              {loading ? t("search.states.loading") : t("search.actions.loadMore")}
            </Button>
          </div>
        )}

        {meta && searchEnabled && (
          <div className="text-center text-sm opacity-70 text-[var(--text1)] w-full">
            {tf("search.states.showing", {
              shown: String(postsToShow.length),
              total: String(meta.total),
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;