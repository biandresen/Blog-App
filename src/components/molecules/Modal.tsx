import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;

  // Optional buttons (for confirm dialogs)
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;

  // Always required
  onCancel: () => void;

  // New: make it usable as an "info modal"
  variant?: "confirm" | "info";
  autoCloseMs?: number; // e.g. 1500
};

const Modal = ({
  isOpen,
  title = "Info",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "confirm",
  autoCloseMs,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleEscape);

    let t: number | undefined;
    if (variant === "info" && autoCloseMs) {
      t = window.setTimeout(onCancel, autoCloseMs);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (t) window.clearTimeout(t);
    };
  }, [isOpen, onCancel, variant, autoCloseMs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-100" onClick={onCancel}>
      <div
        className="bg-[var(--bg)] text-[var(--text1)] rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
        <p className="mb-4">{message}</p>

        {variant === "confirm" ? (
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-[var(--primary-shade)] text-[var(--text2)] hover:bg-[var(--primary-tint)] transition"
            >
              {cancelText}
            </button>
            <button
              onClick={() => onConfirm?.()}
              className="px-4 py-2 rounded-xl bg-[var(--error)] text-white hover:bg-red-400 transition"
            >
              {confirmText}
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-[var(--primary-shade)] text-[var(--text2)] hover:bg-[var(--primary-tint)] transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
