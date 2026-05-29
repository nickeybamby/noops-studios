import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

// ── Section Label ─────────────────────────────────────────────────────────────
// Small monospace uppercase label used above every section H2
// e.g. "/ WHAT WE DO" · "/ HOW WE WORK" · "/ OUR TOOLKIT"
// Style: DM Mono · 11–12px · uppercase · tracking-[0.2em] · text-accent-teal

interface SectionLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: "teal" | "blue" | "violet";
}

// TODO: Implement full SectionLabel with:
// - font-mono text-xs uppercase tracking-[0.2em]
// - color variants mapping to accent-teal / accent-blue / accent-violet
// - mb-4 spacing

export function SectionLabel({
  color = "teal",
  className,
  children,
  ...props
}: SectionLabelProps) {
  return (
    <p className={clsx(className)} {...props}>
      {children}
    </p>
  );
}
