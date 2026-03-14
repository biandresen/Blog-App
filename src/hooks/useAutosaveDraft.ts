import { useEffect, useRef, useState } from "react";

type Draft = Record<string, unknown>;

type UseAutosaveDraftOptions = {
  debounceMs?: number;
};

export function useAutosaveDraft<T extends Draft>(
  storageKey: string,
  initialState: T,
  options: UseAutosaveDraftOptions = {}
) {
  const { debounceMs = 800 } = options;

  const getInitialState = (): T => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (!saved) return initialState;

      const parsed = JSON.parse(saved);

      return {
        ...initialState,
        ...parsed,
      };
    } catch {
      localStorage.removeItem(storageKey);
      return initialState;
    }
  };

  const [state, setState] = useState<T>(getInitialState);
  const [isSaved, setIsSaved] = useState(true);

  const isFirstRenderRef = useRef(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const hasContent = Object.values(state).some(
      (value) => value !== "" && value !== null && value !== undefined
    );

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Avoid briefly showing "unsaved" on first mount when restoring existing draft
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;

      if (!hasContent) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(state));
      }

      setIsSaved(true);
      return;
    }

    setIsSaved(false);

    timeoutRef.current = window.setTimeout(() => {
      if (!hasContent) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(state));
      }

      setIsSaved(true);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [state, storageKey, debounceMs]);

  const resetDraft = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setState(initialState);
    localStorage.removeItem(storageKey);
    setIsSaved(true);
  };

  return { state, setState, resetDraft, isSaved };
}