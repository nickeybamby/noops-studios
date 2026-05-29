import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* ── cn — class merge utility ─────────────────────────────────────────────── */
// Merges Tailwind classes safely, resolving conflicts (e.g. px-4 + px-6 → px-6)
// Usage: cn("px-4 py-2", isActive && "bg-[#4f7dff]", className)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* ── stagger — animation delay helper ────────────────────────────────────── */
// Returns an inline style object for staggered CSS animations
// Usage: <div style={stagger(index, 80)}>…</div>
export function stagger(index: number, baseMs = 80): React.CSSProperties {
  return { animationDelay: `${index * baseMs}ms` };
}

/* ── clamp — fluid CSS value builder ─────────────────────────────────────── */
// Usage: style={{ fontSize: clamp(32, 4, 56) }} → clamp(32px, 4vw, 56px)
export function clamp(minPx: number, preferredVw: number, maxPx: number): string {
  return `clamp(${minPx}px, ${preferredVw}vw, ${maxPx}px)`;
}

/* ── formatMailto ─────────────────────────────────────────────────────────── */
export function formatMailto(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body)    params.set("body", body);
  const qs = params.toString();
  return `mailto:${email}${qs ? `?${qs}` : ""}`;
}

/* ── truncate ─────────────────────────────────────────────────────────────── */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/* ── isBrowser ────────────────────────────────────────────────────────────── */
export const isBrowser = typeof window !== "undefined";
