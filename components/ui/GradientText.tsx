import { type HTMLAttributes } from "react";

/* ── Types ────────────────────────────────────────────────────────────────── */
type GradientVariant = "brand" | "blue-violet" | "violet-teal" | "teal-blue";
type Tag = "span" | "h1" | "h2" | "h3" | "h4" | "p";

interface GradientTextProps extends HTMLAttributes<HTMLElement> {
  as?:       Tag;
  variant?:  GradientVariant;
  animate?:  boolean;        // shimmer animation
}

/* ── Gradient map ─────────────────────────────────────────────────────────── */
const GRADIENT_MAP: Record<GradientVariant, string> = {
  "brand":        "linear-gradient(90deg, #4f7dff, #7c5cfc, #00d4aa)",
  "blue-violet":  "linear-gradient(90deg, #4f7dff, #7c5cfc)",
  "violet-teal":  "linear-gradient(90deg, #7c5cfc, #00d4aa)",
  "teal-blue":    "linear-gradient(90deg, #00d4aa, #4f7dff)",
};

/* ── GradientText Component ───────────────────────────────────────────────── */
export function GradientText({
  as:       Tag     = "span",
  variant         = "brand",
  animate         = false,
  className,
  style,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Tag
      className={[
        animate ? "bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: GRADIENT_MAP[variant],
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...(animate ? { backgroundSize: "200% auto" } : {}),
        ...style,
      }}
      {...(props as HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  );
}
