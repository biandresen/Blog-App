import { useEffect } from "react";

export function useDismiss(opts: {
  open: boolean;
  onClose: () => void;
  refs: Array<React.RefObject<HTMLElement | null>>;
}) {
  const { open, onClose, refs } = opts;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;

      const clickedInside = refs.some((r) => r.current?.contains(target));
      if (!clickedInside) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose, refs]);
}
