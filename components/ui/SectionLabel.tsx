import { type HTMLAttributes } from "react";

/* ── Types ────────────────────────────────────────────────────────────────── */
type LabelColor = "teal" | "blue" | "violet";

interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: LabelColor;
}

/* ── Color map ────────────────────────────────────────────────────────────── */
const COLOR_MAP: Record<LabelColor, string> = {
  teal:   "text-[#00d4aa]",
  blue:   "text-[#4f7dff]",
  violet: "text-[#7c5cfc]",
};

/* ── SectionLabel Component ───────────────────────────────────────────────── */
export function SectionLabel({
  color     = "teal",
  className,
  children,
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={[
        "text-[11px] uppercase tracking-[0.2em] mb-4",
        COLOR_MAP[color],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "var(--font-dm-mono)" }}
      {...props}
    >
      {children}
    </p>
  );
}
