import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ── cn — Tailwind class merge utility ─────────────────────────────────────────
// Combines clsx (conditional classes) with tailwind-merge (dedup conflicts)
// Usage: cn("px-4 py-2", isActive && "bg-blue-500", className)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ── stagger — Animation delay helper ─────────────────────────────────────────
// Returns inline style object with animation-delay for staggered entrances
// Usage: style={stagger(index, 80)} — delays by index × 80ms
export function stagger(index: number, baseMs = 80): React.CSSProperties {
  return { animationDelay: `${index * baseMs}ms` };
}

// ── clamp — CSS clamp string builder ─────────────────────────────────────────
// Generates a CSS clamp() string for fluid typography / spacing
// Usage: clamp(32, 48, 64) → "clamp(32px, 4vw, 64px)"
export function clamp(min: number, preferred: number, max: number): string {
  return `clamp(${min}px, ${preferred}vw, ${max}px)`;
}

// ── formatEmail — mailto link builder ────────────────────────────────────────
export function formatMailto(email: string, subject?: string): string {
  const base = `mailto:${email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
