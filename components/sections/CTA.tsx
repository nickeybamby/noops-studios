"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

/* ── Intersection observer hook ───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref             = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* ── CTA Section ──────────────────────────────────────────────────────────── */
export function CTA() {
  const { ref, seen } = useInView(0.15);

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)",
      }}
    >
      {/* Top divider */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-subtle)" }}
      />

      {/* ── Decorative background glows ─────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Blue orb — left */}
        <div
          className="absolute rounded-full"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: 700,
            maxHeight: 700,
            top: "50%",
            left: "50%",
            transform: "translate(-60%, -50%)",
            background:
              "radial-gradient(circle, rgba(79,125,255,0.10) 0%, transparent 65%)",
          }}
        />
        {/* Violet orb — right */}
        <div
          className="absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: 600,
            maxHeight: 600,
            top: "50%",
            left: "50%",
            transform: "translate(-30%, -55%)",
            background:
              "radial-gradient(circle, rgba(124,92,252,0.09) 0%, transparent 65%)",
          }}
        />
        {/* Teal accent — bottom */}
        <div
          className="absolute rounded-full"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: 480,
            maxHeight: 480,
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Noise overlay ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10
                   flex flex-col items-center text-center gap-8"
      >
        {/* Badge */}
        <div
          className={[
            "transition-[opacity,transform] duration-500 ease-out",
            seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "0ms" }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5
                       border border-[#4f7dff]/30 bg-[#4f7dff]/10
                       text-[#4f7dff] text-[11px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <Zap size={11} strokeWidth={2.5} aria-hidden="true" />
            Ready to automate?
          </span>
        </div>

        {/* H2 */}
        <h2
          id="cta-heading"
          className={[
            "text-[clamp(36px,6vw,72px)] font-[800] leading-[1.05] tracking-tight",
            "max-w-3xl",
            "transition-[opacity,transform] duration-600 ease-out",
            seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          ].join(" ")}
          style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
        >
          <span className="text-[#f1f5f9]">Let&apos;s Build Something</span>
          <br />
          <span className="gradient-text">That Scales.</span>
        </h2>

        {/* Subtext */}
        <p
          className={[
            "text-[17px] text-[#8b95a8] leading-relaxed max-w-md",
            "transition-[opacity,transform] duration-500 ease-out",
            seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 400,
            transitionDelay: "160ms",
          }}
        >
          Tell us about your project. We&apos;ll respond within 24 hours
          with a clear plan, not a sales pitch.
        </p>

        {/* CTA button */}
        <div
          className={[
            "flex flex-col items-center gap-4",
            "transition-[opacity,transform] duration-500 ease-out",
            seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "260ms" }}
        >
          <Link
            href="/contact"
            className="group relative flex items-center gap-2.5
                       px-8 py-4 rounded-full min-h-[56px]
                       text-[15px] font-[500] text-white
                       bg-gradient-to-r from-[#4f7dff] to-[#7c5cfc]
                       anim-pulse-glow
                       hover:scale-[1.03] active:scale-[0.98]
                       transition-transform duration-200
                       focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                       focus-visible:outline-offset-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Start a Project
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
              aria-hidden="true"
            />
          </Link>

          {/* Email fallback */}
          <a
            href="mailto:hello@noops.studio"
            className="text-[12px] text-[#3d4a5c] hover:text-[#8b95a8]
                       transition-colors duration-200
                       focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                       focus-visible:outline-offset-2 rounded-sm"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            or email us at hello@noops.studio
          </a>
        </div>

        {/* ── Feature strip ───────────────────────────────────────── */}
        <div
          className={[
            "mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3",
            "transition-[opacity,transform] duration-500 ease-out",
            seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "360ms" }}
        >
          {[
            "No long-term contracts",
            "Response within 24h",
            "Free architecture review",
          ].map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[12px] text-[#3d4a5c]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              {i > 0 && (
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#3d4a5c]" />
              )}
              <span
                aria-hidden="true"
                className="text-[#00d4aa]"
              >
                ✓
              </span>
              {item}
            </span>
          ))}
        </div>

        {/* ── Decorative bottom grid lines ─────────────────────────── */}
        <div
          aria-hidden="true"
          className={[
            "mt-10 w-full max-w-2xl mx-auto h-px",
            "transition-[opacity] duration-700 ease-out",
            seen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(79,125,255,0.3), rgba(124,92,252,0.3), transparent)",
            transitionDelay: "460ms",
          }}
        />
      </div>
    </section>
  );
}
