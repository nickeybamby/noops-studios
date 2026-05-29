import { type HTMLAttributes } from "react";

/* ── Types ────────────────────────────────────────────────────────────────── */
type Padding = "none" | "sm" | "md" | "lg";
type Radius  = "xl" | "2xl" | "3xl";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?:   boolean;      // enable lift + glow on hover (default true)
  padding?: Padding;
  radius?:  Radius;
  glow?:    "blue" | "violet" | "teal" | "none";
}

/* ── Style maps ───────────────────────────────────────────────────────────── */
const PADDING_MAP: Record<Padding, string> = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

const RADIUS_MAP: Record<Radius, string> = {
  "xl":  "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

const GLOW_MAP = {
  blue:   "hover:shadow-[0_0_40px_rgba(79,125,255,0.12)]  hover:border-[rgba(79,125,255,0.35)]",
  violet: "hover:shadow-[0_0_40px_rgba(124,92,252,0.12)]  hover:border-[rgba(124,92,252,0.30)]",
  teal:   "hover:shadow-[0_0_40px_rgba(0,212,170,0.10)]   hover:border-[rgba(0,212,170,0.28)]",
  none:   "",
};

/* ── GlassCard Component ──────────────────────────────────────────────────── */
export function GlassCard({
  hover   = true,
  padding = "lg",
  radius  = "2xl",
  glow    = "blue",
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={[
        /* Glass base */
        "bg-[rgba(13,17,23,0.70)] backdrop-blur-xl",
        "border border-white/[0.06]",
        /* Radius */
        RADIUS_MAP[radius],
        /* Padding */
        PADDING_MAP[padding],
        /* Hover */
        hover
          ? [
              "transition-all duration-300 cubic-bezier(0.4,0,0.2,1)",
              "-translate-y-0 hover:-translate-y-1",
              GLOW_MAP[glow],
            ].join(" ")
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
