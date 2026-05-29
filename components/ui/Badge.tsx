import { type HTMLAttributes } from "react";

/* ── Types ────────────────────────────────────────────────────────────────── */
type BadgeColor = "blue" | "teal" | "violet";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?:  BadgeColor;
  icon?:   React.ReactNode;
  dot?:    boolean;          // show a small pulsing dot before label
}

/* ── Style maps ───────────────────────────────────────────────────────────── */
const COLOR_STYLES: Record<BadgeColor, { border: string; bg: string; text: string; dot: string }> = {
  blue: {
    border: "border-[#4f7dff]/30",
    bg:     "bg-[#4f7dff]/10",
    text:   "text-[#4f7dff]",
    dot:    "bg-[#4f7dff]",
  },
  teal: {
    border: "border-[#00d4aa]/30",
    bg:     "bg-[#00d4aa]/10",
    text:   "text-[#00d4aa]",
    dot:    "bg-[#00d4aa]",
  },
  violet: {
    border: "border-[#7c5cfc]/30",
    bg:     "bg-[#7c5cfc]/10",
    text:   "text-[#7c5cfc]",
    dot:    "bg-[#7c5cfc]",
  },
};

/* ── Badge Component ──────────────────────────────────────────────────────── */
export function Badge({
  color    = "blue",
  icon,
  dot      = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const c = COLOR_STYLES[color];

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full",
        "px-4 py-1.5",
        "border",
        "text-[11px] uppercase tracking-[0.2em]",
        c.border, c.bg, c.text,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "var(--font-dm-mono)" }}
      {...props}
    >
      {/* Pulsing dot */}
      {dot && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${c.dot}`}
          />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`} />
        </span>
      )}

      {/* Optional icon */}
      {icon && <span aria-hidden="true">{icon}</span>}

      {children}
    </span>
  );
}
