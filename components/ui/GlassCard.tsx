import { type HTMLAttributes } from "react";
import { clsx } from "clsx";

// ── Glass Card ────────────────────────────────────────────────────────────────
// Base glass morphism card used in Services, Testimonials
// bg rgba(13,17,23,0.70) · backdrop-blur-xl · border border-subtle
// hover: border-active · glow shadow · translateY(-4px) · 300ms cubic

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;   // enable hover lift + glow (default true)
  padding?: "sm" | "md" | "lg";
}

// TODO: Implement full GlassCard with:
// - glass morphism styles (bg, blur, border)
// - optional hover states controlled by `hover` prop
// - padding variants (sm: p-4 / md: p-6 / lg: p-8)
// - rounded-2xl

export function GlassCard({
  hover = true,
  padding = "lg",
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div className={clsx(className)} {...props}>
      {children}
    </div>
  );
}
