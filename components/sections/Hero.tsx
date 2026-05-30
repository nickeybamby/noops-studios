"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";

/* ── Trusted-by logos (inline SVG text marks — no image files needed) ─────── */
const TRUSTED_LOGOS = [
  { name: "Vercel",   mark: "▲ Vercel"   },
  { name: "Supabase", mark: "⬡ Supabase" },
  { name: "Resend",   mark: "✉ Resend"   },
  { name: "Linear",   mark: "◈ Linear"   },
  { name: "Clerk",    mark: "⬟ Clerk"    },
];

/* ── Animated mesh background ─────────────────────────────────────────────── */
function MeshBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Orb 1 — blue, top-left */}
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "72vw",
          height: "72vw",
          maxWidth: 900,
          maxHeight: 900,
          top: "-20%",
          left: "-18%",
          background:
            "radial-gradient(circle, rgba(79,125,255,0.13) 0%, transparent 70%)",
          animationDuration: "14s",
        }}
      />
      {/* Orb 2 — violet, top-right */}
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 750,
          maxHeight: 750,
          top: "-10%",
          right: "-20%",
          background:
            "radial-gradient(circle, rgba(124,92,252,0.11) 0%, transparent 70%)",
          animationDuration: "18s",
          animationDelay: "-6s",
        }}
      />
      {/* Orb 3 — teal, bottom-center */}
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 620,
          maxHeight: 620,
          bottom: "-15%",
          left: "25%",
          background:
            "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)",
          animationDuration: "22s",
          animationDelay: "-11s",
        }}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

/* ── Hero Component ───────────────────────────────────────────────────────── */
export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Small rAF defer so CSS animations fire after first paint */
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const base =
    "opacity-0 anim-fade-up";

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center
                 overflow-hidden pt-16"
      style={{ background: "var(--bg-base)" }}
    >
      <MeshBackground />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full
                      flex flex-col items-center text-center gap-8 py-24 lg:py-32">

        {/* Badge — delay 0ms */}
        <div
          className={visible ? base : "opacity-0"}
          style={{ animationDelay: "0ms" }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5
                       border border-[#4f7dff]/30 bg-[#4f7dff]/10
                       text-[#4f7dff] text-[11px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <Zap size={11} strokeWidth={2.5} aria-hidden="true" />
            AI Automation &amp; AI Optimisation
          </span>
        </div>

        {/* H1 — three lines, staggered */}
        <h1 className="flex flex-col items-center gap-1 sm:gap-2">
          {/* Line 1 — delay 80ms */}
          <span
            className={`block text-[clamp(40px,7vw,72px)] leading-none tracking-tight text-[#f1f5f9]
                        ${visible ? base : "opacity-0"}`}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              animationDelay: "80ms",
            }}
          >
            We ship the
          </span>

          {/* Line 2 — gradient — delay 160ms */}
          <span
            className={`block text-[clamp(40px,7vw,72px)] leading-none tracking-tight gradient-text
                        ${visible ? base : "opacity-0"}`}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              animationDelay: "160ms",
            }}
          >
            Systems
          </span>

          {/* Line 3 — delay 240ms */}
          <span
            className={`block text-[clamp(40px,7vw,72px)] leading-none tracking-tight text-[#f1f5f9]
                        ${visible ? base : "opacity-0"}`}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              animationDelay: "240ms",
            }}
          >
            that scale.
          </span>
        </h1>

        {/* Subheadline — delay 340ms */}
        <p
          className={`max-w-xl text-[18px] leading-relaxed text-[#8b95a8]
                      ${visible ? base : "opacity-0"}`}
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 400,
            animationDelay: "340ms",
          }}
        >
          NoOps Studios automates your Workflow and AI pipelines
          so your team ships faster without the overhead.
        </p>

        {/* CTA pair — delay 440ms */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4
                      ${visible ? base : "opacity-0"}`}
          style={{ animationDelay: "440ms" }}
        >
          {/* Primary */}
          <Link
            href="/contact"
            className="flex items-center gap-2 px-7 py-[14px] rounded-full min-h-[52px]
                       text-[15px] font-[500] text-white
                       bg-gradient-to-r from-[#4f7dff] to-[#7c5cfc]
                       hover:shadow-[0_0_40px_rgba(79,125,255,0.5)] hover:scale-[1.02]
                       active:scale-[0.98] transition-all duration-200
                       focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                       focus-visible:outline-offset-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Start a Project
            <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>

          {/* Ghost */}
          <Link
            href="/works"
            className="flex items-center gap-2 px-7 py-[14px] rounded-full min-h-[52px]
                       text-[15px] font-[500] text-[#f1f5f9]/70
                       border border-white/10
                       hover:border-white/25 hover:text-[#f1f5f9]
                       active:scale-[0.98] transition-all duration-200
                       focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                       focus-visible:outline-offset-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            View Our Work
            <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        {/* Social proof strip — delay 560ms */}
        <div
          className={`flex flex-col items-center gap-4 pt-4
                      ${visible ? base : "opacity-0"}`}
          style={{ animationDelay: "560ms" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-[#3d4a5c]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            Trusted by engineers
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            aria-label="Companies that trust NoOps Studios"
          >
            {TRUSTED_LOGOS.map((logo) => (
              <span
                key={logo.name}
                aria-label={logo.name}
                className="text-[13px] font-[400] text-[#f1f5f9] opacity-25
                           hover:opacity-60 transition-opacity duration-200
                           select-none tracking-wide"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                {logo.mark}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Chevron ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                   anim-bounce-chevron"
      >
        <ChevronDown
          size={22}
          strokeWidth={1.5}
          className="text-[#f1f5f9] opacity-30"
        />
      </div>

      {/* ── Bottom fade ──────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-base))",
        }}
      />
    </section>
  );
}
