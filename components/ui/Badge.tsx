import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

// ── Badge / Label Pill ────────────────────────────────────────────────────────
// Pill label used in Hero, Services, Process, CTA sections
// Style: DM Mono · uppercase · tracking-widest · border accent-blue/30 · bg accent-blue/10

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: "blue" | "teal" | "violet";
}

// TODO: Implement full Badge with:
// - color variants (blue / teal / violet) adjusting border + bg + text color
// - inline-flex items-center gap-2 rounded-full px-4 py-1.5
// - font-mono text-xs uppercase tracking-widest

export function Badge({ color = "blue", className, children, ...props }: BadgeProps) {
  return (
    <span className={clsx(className)} {...props}>
      {children}
    </span>
  );
}
