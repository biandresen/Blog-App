import { useEffect, useRef } from "react";

export function useAutoResizeTextarea<T extends HTMLTextAreaElement>(value: string, active: boolean = true) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const resize = () => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };

    // Resize after mount and every value change
    requestAnimationFrame(resize);
  }, [value, active]);

  const handleInput = () => {
    const el = ref.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return { ref, handleInput };
}
