import { useEffect, type ReactNode } from "react";

type ModalVariant = "confirm" | "info" | "custom";

type ModalProps = {
  isOpen: boolean;
  title?: string;

  // Content
  message?: string;
  children?: ReactNode;

  // Closing
  onClose?: () => void;      // new name
  onCancel?: () => void;     // backward-compat (your existing code)
  closeOnBackdrop?: boolean;

  // Confirm mode
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;

  // Info mode
  variant?: ModalVariant;
  autoCloseMs?: number; // only used for "info"
};

const Modal = ({
  isOpen,
  title,
  message,
  children,

  onClose,
  onCancel,
  closeOnBackdrop = true,

  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",

  variant = "confirm",
  autoCloseMs,
}: ModalProps) => {
  // unify close handler so old/new callers work
  const close = onClose ?? onCancel ?? (() => {});

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEscape);

    let t: number | undefined;
    if (variant === "info" && autoCloseMs) {
      t = window.setTimeout(() => close(), autoCloseMs);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (t) window.clearTimeout(t);
    };
  }, [isOpen, close, variant, autoCloseMs]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[100]"
      onClick={closeOnBackdrop ? close : undefined}
    >
      <div
        className="bg-[var(--bg)] text-[var(--text1)] rounded-2xl p-6 shadow-2xl
                   w-[min(92vw,32rem)] max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          {title ? <h2 className="text-xl font-semibold">{title}</h2> : <span />}
          <button
            type="button"
            onClick={close}
            className="rounded-lg px-2 py-1 hover:bg-white/5"
            aria-label="Close modal"
            title="Close"
          >
            ✕
          </button>
        </div>

        {message ? <p className="mb-4 whitespace-pre-wrap">{message}</p> : null}
        {children}

        {variant === "confirm" && (
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={close} className="px-4 py-2 rounded-xl bg-[var(--primary-shade)] text-[var(--text2)] hover:bg-[var(--primary-tint)] transition">
              {cancelText}
            </button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-[var(--error)] text-white hover:bg-red-400 transition">
              {confirmText}
            </button>
          </div>
        )}

        {variant === "info" && (
          <div className="flex justify-end mt-4">
            <button onClick={close} className="px-4 py-2 rounded-xl bg-[var(--primary-shade)] text-[var(--text2)] hover:bg-[var(--primary-tint)] transition">
              Close
            </button>
          </div>
        )}

  {/* variant === "custom" -> render no footer */}

      </div>
    </div>
  );
};

export default Modal;
