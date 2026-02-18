// src/hooks/usePagination.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { token } from "../types/context.types";
import { safeRequest } from "../lib/auth";
import type { PageMeta, PaginatedResponse } from "../types/pagination.types";

type SetAccessToken = (t: token | null) => void;

type FetchPage<T> = (
  accessToken: token,
  page?: number,
  limit?: number,
  ...args: any[]
) => Promise<PaginatedResponse<T>>;

const EMPTY_ARGS: any[] = [];

type Mode = "paged" | "infinite";

type Options = {
  accessToken: token;
  setAccessToken: SetAccessToken;
  limit?: number;
  args?: any[];
  enabled?: boolean;

  // NEW:
  mode?: Mode; // "paged" = replace, "infinite" = append
  autoLoadMore?: boolean; // if true + mode=infinite => intersection observer
  rootMargin?: string; // e.g. "600px"

  // Use this to reset when filters change (sort, tag, query, etc.)
  resetKey?: string | number;
};

export function usePagination<T>(fetchPage: FetchPage<T>, opts: Options) {
  const {
    accessToken,
    setAccessToken,
    limit = 15,
    args = EMPTY_ARGS,
    enabled = true,

    mode = "paged",
    autoLoadMore = false,
    rootMargin = "600px",
    resetKey,
  } = opts;

  // keep args stable (caller should still memoize if building arrays inline)
  const stableArgs = useMemo(() => args, [args]);

  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const page = meta?.page ?? 1;
  const canPrev = meta?.hasPrev ?? page > 1;
  const canNext = meta?.hasNext ?? false;

  const load = useCallback(
    async (targetPage: number, behavior: "replace" | "append") => {
      if (!enabled) return;
      setLoading(true);
      setError(null);

      try {
        const res = await safeRequest(fetchPage, accessToken, setAccessToken, targetPage, limit, ...stableArgs);

        setMeta(res.meta ?? null);
        setItems((prev) => {
          const nextData = res.data ?? [];
          return behavior === "append" ? [...prev, ...nextData] : nextData;
        });
      } catch (e: any) {
        setError(e?.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    },
    [enabled, fetchPage, accessToken, setAccessToken, limit, stableArgs]
  );

  // initial/reset load
  useEffect(() => {
    if (!enabled) return;
    setItems([]);
    setMeta(null);
    setError(null);
    load(1, "replace");
    // IMPORTANT: resetKey is what you change when filters change
  }, [enabled, load, resetKey]);

  const prev = useCallback(() => {
    if (mode !== "paged") return;
    if (!canPrev || loading) return;
    load(Math.max(1, page - 1), "replace");
  }, [mode, canPrev, loading, load, page]);

  const next = useCallback(() => {
    if (mode === "paged") {
      if (!canNext || loading) return;
      load(page + 1, "replace");
      return;
    }

    // mode === "infinite"
    if (!canNext || loading) return;
    load(page + 1, "append");
  }, [mode, canNext, loading, load, page]);

  const reload = useCallback(() => load(1, "replace"), [load]);

  // auto infinite scroll
  useEffect(() => {
    if (!enabled) return;
    if (mode !== "infinite") return;
    if (!autoLoadMore) return;
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) next();
      },
      { root: null, rootMargin, threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled, mode, autoLoadMore, rootMargin, next]);

    const updateItem = useCallback((id: any, updater: (prev: T) => T) => {
    setItems((prev) =>
      prev.map((it: any) => (it?.id === id ? updater(it) : it))
    );
  }, []);

  const replaceItem = useCallback((id: any, nextItem: T) => {
    setItems((prev) =>
      prev.map((it: any) => ((it as any)?.id === id ? nextItem : it))
    );
  }, []);

  const removeItem = useCallback((id: any) => {
    setItems((prev) => prev.filter((it: any) => it?.id !== id));
  }, []);


  return {
    items,
    meta,
    loading,
    error,

    page,
    canPrev,
    canNext,

    prev,
    next, // in infinite mode, this becomes "load more"
    reload,

    // only used when mode="infinite" + autoLoadMore=true
    sentinelRef,

    updateItem,
    replaceItem,
    removeItem
  };
}
