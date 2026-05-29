import { type ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

// ── Button Variants ───────────────────────────────────────────────────────────
// primary  — gradient fill (blue → violet), glow shadow on hover
// ghost    — border-white/10, transparent bg, hover border-white/30
// outline  — border-accent-blue, transparent bg

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?:    ButtonSize;
  href?:    string;        // renders as <a> when provided
  external?: boolean;
}

// TODO: Implement full Button with:
// - variant styles (primary / ghost / outline)
// - size styles (sm: px-4 py-2 text-sm / md: px-6 py-3 / lg: px-8 py-4 text-lg)
// - hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
// - focus-visible ring (2px solid accent-blue)
// - renders as <a> when href prop is passed
// - all touch targets ≥ 44×44px (min-h-[44px])

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx(className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
