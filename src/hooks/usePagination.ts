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
  mode?: Mode;
  autoLoadMore?: boolean;
  rootMargin?: string;
  resetKey?: string | number;
};

function dedupeById<T>(items: T[]): T[] {
  const seen = new Set<any>();
  const result: T[] = [];

  for (const item of items as any[]) {
    const id = item?.id;

    if (id == null) {
      result.push(item);
      continue;
    }

    if (seen.has(id)) continue;
    seen.add(id);
    result.push(item);
  }

  return result;
}

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

  const stableArgs = useMemo(() => args, [args]);

  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestIdRef = useRef(0);

  const page = meta?.page ?? 1;
  const canPrev = meta?.hasPrev ?? page > 1;
  const canNext = meta?.hasNext ?? false;

  const load = useCallback(
    async (targetPage: number, behavior: "replace" | "append") => {
      if (!enabled) return;

      const requestId = ++requestIdRef.current;

      setLoading(true);
      setError(null);

      try {
        const res = await safeRequest(
          fetchPage,
          accessToken,
          setAccessToken,
          targetPage,
          limit,
          ...stableArgs
        );

        // Ignore stale responses
        if (requestId !== requestIdRef.current) return;

        setMeta(res.meta ?? null);
        setItems((prev) => {
          const nextData = res.data ?? [];

          if (behavior === "append") {
            return dedupeById([...prev, ...nextData]);
          }

          return nextData;
        });
      } catch (e: any) {
        if (requestId !== requestIdRef.current) return;
        setError(e?.message ?? "Failed to load");
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [enabled, fetchPage, accessToken, setAccessToken, limit, stableArgs]
  );

  useEffect(() => {
    requestIdRef.current += 1;

    if (!enabled) {
      setItems([]);
      setMeta(null);
      setError(null);
      setLoading(false);
      return;
    }

    setItems([]);
    setMeta(null);
    setError(null);

    void load(1, "replace");
  }, [enabled, load, resetKey]);

  const prev = useCallback(() => {
    if (mode !== "paged") return;
    if (!canPrev || loading) return;
    void load(Math.max(1, page - 1), "replace");
  }, [mode, canPrev, loading, load, page]);

  const next = useCallback(() => {
    if (!canNext || loading) return;

    if (mode === "paged") {
      void load(page + 1, "replace");
      return;
    }

    void load(page + 1, "append");
  }, [mode, canNext, loading, load, page]);

  const reload = useCallback(() => {
    void load(1, "replace");
  }, [load]);

  useEffect(() => {
    if (!enabled) return;
    if (mode !== "infinite") return;
    if (!autoLoadMore) return;
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          next();
        }
      },
      { root: null, rootMargin, threshold: 0 }
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
    };
  }, [enabled, mode, autoLoadMore, rootMargin, next]);

  const updateItem = useCallback((id: any, updater: (prev: T) => T) => {
    setItems((prev) =>
      prev.map((item: any) => (item?.id === id ? updater(item) : item))
    );
  }, []);

  const replaceItem = useCallback((id: any, nextItem: T) => {
    setItems((prev) =>
      prev.map((item: any) => (item?.id === id ? nextItem : item))
    );
  }, []);

  const removeItem = useCallback((id: any) => {
    setItems((prev) => prev.filter((item: any) => item?.id !== id));
    setMeta((prev) =>
      prev
        ? {
            ...prev,
            total: Math.max(0, prev.total - 1),
          }
        : prev
    );
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
    next,
    reload,
    sentinelRef,
    updateItem,
    replaceItem,
    removeItem,
  };
}