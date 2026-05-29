import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

// ── Gradient Text ─────────────────────────────────────────────────────────────
// Renders children with brand gradient: #4f7dff → #7c5cfc → #00d4aa
// Applied via background-clip: text

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

// TODO: Implement full GradientText with:
// - bg-gradient-to-r from-[#4f7dff] via-[#7c5cfc] to-[#00d4aa]
// - bg-clip-text text-transparent
// - polymorphic `as` prop for semantic HTML

export function GradientText({
  as: Tag = "span",
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Tag className={clsx("gradient-text", className)} {...props}>
      {children}
    </Tag>
  );
}
