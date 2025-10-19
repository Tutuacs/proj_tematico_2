"use client";

import { useEffect, useRef, type ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";

type Size = "sm" | "md" | "lg" | "xl";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: Size;
  hideCloseButton?: boolean;
  className?: string;
};

/**
 * Modal acessível com:
 * - foco inicial
 * - fechar por ESC
 * - fechar ao clicar no backdrop
 * - ARIA attributes
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  hideCloseButton = false,
  className,
}: ModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstFocusable = useRef<HTMLButtonElement | null>(null);

  // cria um container no body para portal (evita z-index/overflow conflitos)
  if (typeof window !== "undefined" && !containerRef.current) {
    const div = document.createElement("div");
    div.setAttribute("id", "modal-root");
    containerRef.current = div;
  }

  useEffect(() => {
    const el = containerRef.current!;
    if (!open) return;

    document.body.appendChild(el);
    document.body.style.overflow = "hidden"; // trava scroll

    // fechar por ESC
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);

    // foco inicial
    setTimeout(() => firstFocusable.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
      el.remove();
    };
  }, [open, onClose]);

  if (!open || !containerRef.current) return null;

  const sizeMap: Record<Size, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  function onBackdropClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const node = (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/50 px-4 backdrop-blur-sm"
      onMouseDown={onBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={[
          "w-full rounded-2xl bg-white p-6 shadow-xl",
          "animate-in fade-in zoom-in-95 duration-150",
          sizeMap[size],
          className ?? "",
        ].join(" ")}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* header */}
        {(title || !hideCloseButton) && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

            {!hideCloseButton && (
              <button
                ref={firstFocusable}
                onClick={onClose}
                aria-label="Fechar"
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* content */}
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(node, containerRef.current);
}