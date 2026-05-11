import { useEffect } from "react";

export function useUnsavedChangesWarning(hasChanges: boolean) {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!hasChanges) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [hasChanges]);
}