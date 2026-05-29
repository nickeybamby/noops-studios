"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";

/* ── Types ────────────────────────────────────────────────────────────────── */
type Variant = "primary" | "ghost" | "outline";
type Size    = "sm" | "md" | "lg";

interface BaseProps {
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  icon?:     React.ReactNode;
  iconRight?: React.ReactNode;
}

interface ButtonAsButton extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href:      string;
  external?: boolean;
  className?: string;
  children?:  React.ReactNode;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/* ── Style maps ───────────────────────────────────────────────────────────── */
const VARIANT_STYLES: Record<Variant, string> = {
  primary: [
    "bg-gradient-to-r from-[#4f7dff] to-[#7c5cfc] text-white",
    "hover:shadow-[0_0_30px_rgba(79,125,255,0.45)] hover:scale-[1.02]",
    "active:scale-[0.98]",
  ].join(" "),

  ghost: [
    "border border-white/10 text-[#f1f5f9]/70 bg-transparent",
    "hover:border-white/25 hover:text-[#f1f5f9] hover:bg-white/[0.03]",
    "active:scale-[0.98]",
  ].join(" "),

  outline: [
    "border border-[#4f7dff]/40 text-[#4f7dff] bg-transparent",
    "hover:border-[#4f7dff]/70 hover:bg-[#4f7dff]/[0.07]",
    "active:scale-[0.98]",
  ].join(" "),
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px] min-h-[36px] gap-1.5",
  md: "px-6 py-3 text-[14px] min-h-[44px] gap-2",
  lg: "px-8 py-4 text-[15px] min-h-[52px] gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center rounded-full font-[500] " +
  "transition-all duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-[#4f7dff] focus-visible:outline-offset-2 " +
  "disabled:opacity-40 disabled:pointer-events-none select-none";

function buildClassName(variant: Variant, size: Size, extra?: string) {
  return [BASE, VARIANT_STYLES[variant], SIZE_STYLES[size], extra].filter(Boolean).join(" ");
}

/* ── Spinner ──────────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-2a8 8 0 01-8-8z" />
    </svg>
  );
}

/* ── Button Component ─────────────────────────────────────────────────────── */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant  = "primary",
      size     = "md",
      loading  = false,
      icon,
      iconRight,
      children,
      className,
    } = props;

    const cls = buildClassName(variant, size, className);

    /* Render as Next.js Link when href is provided */
    if ("href" in props && props.href !== undefined) {
      const { href, external, ...rest } = props as ButtonAsLink;
      const linkProps = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};
      return (
        <Link
          href={href}
          className={cls}
          style={{ fontFamily: "var(--font-dm-sans)" }}
          {...linkProps}
          {...(rest as object)}
        >
          {icon}
          {children}
          {iconRight}
        </Link>
      );
    }

    /* Render as <button> */
    const { href: _href, external: _ext, ...buttonRest } = props as ButtonAsButton & { href?: undefined; external?: undefined };
    return (
      <button
        ref={ref}
        className={cls}
        style={{ fontFamily: "var(--font-dm-sans)" }}
        disabled={loading || (buttonRest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        {...(buttonRest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading ? <Spinner /> : icon}
        {children}
        {!loading && iconRight}
      </button>
    );
  }
);

Button.displayName = "Button";
