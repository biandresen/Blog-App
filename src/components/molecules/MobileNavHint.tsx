import { useEffect, useLayoutEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

type Rect = { top: number; left: number; width: number; height: number };

type Props = {
  open: boolean;
  onDismiss: () => void;
  leftAnchor?: HTMLElement | null;
  rightAnchor?: HTMLElement | null;
};

function getRect(el: HTMLElement | null | undefined): Rect | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

export default function MobileNavHint({ open, onDismiss, leftAnchor, rightAnchor }: Props) {
  const [leftRect, setLeftRect] = useState<Rect | null>(null);
  const [rightRect, setRightRect] = useState<Rect | null>(null);

  const { t } = useLanguage();

  const recompute = () => {
    setLeftRect(getRect(leftAnchor));
    setRightRect(getRect(rightAnchor));
  };

  useLayoutEffect(() => {
    if (!open) return;
    recompute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, leftAnchor, rightAnchor]);

  useEffect(() => {
    if (!open) return;

    const onMove = () => recompute();
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, leftAnchor, rightAnchor]);

  if (!open) return null;

  // If only one exists, still works (points to the one you have)
  const rects = [leftRect, rightRect].filter(Boolean) as Rect[];
  if (rects.length === 0) return null;

  // Bubble is centered between the buttons (or on the only one)
  const centerX = rects.reduce((sum, r) => sum + (r.left + r.width / 2), 0) / rects.length;
  const maxBottom = Math.max(...rects.map((r) => r.top + r.height));

  const bubbleWidth = 260;
  const bubbleLeft = Math.max(10, Math.min(centerX - bubbleWidth / 2, window.innerWidth - bubbleWidth - 10));
  const bubbleTop = Math.min(maxBottom + 12, window.innerHeight - 140);

  const bubbleBase =
    "fixed z-[200] w-[260px] rounded-xl border border-white/10 bg-[var(--primary-shade)] " +
    "px-3 py-2 text-sm text-[var(--text2)] shadow-xl";

  const arrowBase =
    "fixed z-[199] h-3 w-3 rotate-45 border border-white/10 bg-[var(--primary-shade)]";

  const arrowForRect = (r: Rect) => ({
    top: r.top + r.height + 6,
    left: r.left + r.width / 2 - 6, // center arrow under icon
  });

  return (
    <div className="fixed inset-0 z-[180]" role="dialog" aria-modal="true" onClick={onDismiss}>
      {/* Dim */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Arrows (one for each button that exists) */}
      {leftRect && <div style={arrowForRect(leftRect)} className={arrowBase} />}
      {rightRect && <div style={arrowForRect(rightRect)} className={arrowBase} />}

      {/* Single bubble */}
      <div
        style={{ top: bubbleTop, left: bubbleLeft }}
        className={bubbleBase}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-semibold">{t("mobileNavHint.title")}</div>
          <div className="opacity-80">
            {t("mobileNavHint.description")}

            <div className="mt-1 flex gap-2 text-xs opacity-80">
              {leftRect ? <span>• {t("mobileNavHint.left")}</span> : null}
              {rightRect ? <span>• {t("mobileNavHint.right")}</span> : null}
            </div>
          </div>

          <button
            type="button"
            className="mt-2 text-xs underline opacity-80 hover:opacity-100"
            onClick={onDismiss}
          >
            {t("mobileNavHint.dismiss")}
          </button>
      </div>
    </div>
  );
}