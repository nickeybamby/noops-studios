"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap } from "lucide-react";

/* ── Trusted-by logos ─────────────────────────────────────────────────────── */
const TRUSTED_LOGOS = [
  { name: "Vercel",   mark: "▲ Vercel"   },
  { name: "Supabase", mark: "⬡ Supabase" },
  { name: "Resend",   mark: "✉ Resend"   },
  { name: "Linear",   mark: "◈ Linear"   },
  { name: "Clerk",    mark: "⬟ Clerk"    },
];

/* ── 1. PERSPECTIVE GRID ──────────────────────────────────────────────────── */
function PerspectiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS       = 14;
    const ROWS       = 18;
    const SPEED      = 0.18;   // units per frame (px equivalent after projection)
    const HORIZON_Y  = 0.48;   // fraction of canvas height
    const VP_X       = 0.5;    // vanishing point x fraction

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const vpX = W * VP_X;
      const vpY = H * HORIZON_Y;

      /* Advance offset */
      offsetRef.current = (offsetRef.current + SPEED) % (H / ROWS);

      /* Helper: project a grid coord to screen space */
      const project = (col: number, rowFrac: number) => {
        // rowFrac 0 = horizon, 1 = bottom
        const t   = Math.pow(rowFrac, 1.8);   // perspective curve
        const x   = vpX + (col - COLS / 2) * (W / COLS) * t * 1.6;
        const y   = vpY + (H - vpY) * t;
        return { x, y, t };
      };

      /* Total rows including scroll offset */
      const totalRows = ROWS + 2;

      ctx.save();

      /* Vertical lines */
      for (let c = 0; c <= COLS; c++) {
        ctx.beginPath();
        for (let r = 0; r <= totalRows; r++) {
          const rowFrac = (r + offsetRef.current / (H / ROWS)) / totalRows;
          if (rowFrac > 1) continue;
          const { x, y, t } = project(c, rowFrac);
          const alpha = Math.min(t * 0.55, 0.38);
          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          /* Draw segment-by-segment so we can vary alpha */
          if (r > 0) {
            const prevRowFrac = ((r - 1) + offsetRef.current / (H / ROWS)) / totalRows;
            if (prevRowFrac >= 0) {
              const prev = project(c, prevRowFrac);
              ctx.beginPath();
              ctx.moveTo(prev.x, prev.y);
              ctx.lineTo(x, y);
              ctx.strokeStyle = `rgba(79,125,255,${alpha * 0.7})`;
              ctx.lineWidth   = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      /* Horizontal lines */
      for (let r = 1; r <= totalRows; r++) {
        const rowFrac = (r + offsetRef.current / (H / ROWS)) / totalRows;
        if (rowFrac > 1) continue;
        const alpha = Math.min(rowFrac * 0.6, 0.35);

        ctx.beginPath();
        const left  = project(0,    rowFrac);
        const right = project(COLS, rowFrac);
        ctx.moveTo(left.x,  left.y);
        ctx.lineTo(right.x, right.y);
        ctx.strokeStyle = `rgba(79,125,255,${alpha * 0.65})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }

      /* Horizon glow line */
      const grad = ctx.createLinearGradient(0, vpY, W, vpY);
      grad.addColorStop(0,   "transparent");
      grad.addColorStop(0.2, "rgba(79,125,255,0.25)");
      grad.addColorStop(0.5, "rgba(124,92,252,0.35)");
      grad.addColorStop(0.8, "rgba(79,125,255,0.25)");
      grad.addColorStop(1,   "transparent");
      ctx.beginPath();
      ctx.moveTo(0,  vpY);
      ctx.lineTo(W,  vpY);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

/* ── 2. CURSOR GLOW TRAIL ─────────────────────────────────────────────────── */
function CursorGlow() {
  const glowRef    = useRef<HTMLDivElement>(null);
  const posRef     = useRef({ x: -999, y: -999 });
  const smoothRef  = useRef({ x: -999, y: -999 });
  const rafRef     = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    posRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current?.parentElement;
    if (!section) return;

    section.addEventListener("mousemove", onMouseMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      smoothRef.current.x = lerp(smoothRef.current.x, posRef.current.x, 0.07);
      smoothRef.current.y = lerp(smoothRef.current.y, posRef.current.y, 0.07);

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${smoothRef.current.x - 280}px, ${smoothRef.current.y - 280}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove]);

  return (
    <div ref={sectionRef} aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,125,255,0.10) 0%, rgba(124,92,252,0.06) 40%, transparent 70%)",
          willChange: "transform",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

/* ── 3. SHIMMER GRADIENT TEXT ─────────────────────────────────────────────── */
function ShimmerText({ children, className = "", style = {} }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <span
        className={className}
        style={{
          ...style,
          position: "relative",
          display: "inline-block",
          background: "linear-gradient(90deg, #4f7dff, #7c5cfc, #00d4aa, #7c5cfc, #4f7dff)",
          backgroundSize: "250% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmerText 5s linear infinite",
        }}
      >
        {children}
      </span>
      <style>{`
        @keyframes shimmerText {
          0%   { background-position: 0%   center; }
          100% { background-position: 250% center; }
        }
      `}</style>
    </>
  );
}

/* ── 4. AMBIENT ORB BACKGROUND ────────────────────────────────────────────── */
function AmbientOrbs() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "72vw", height: "72vw", maxWidth: 900, maxHeight: 900,
          top: "-20%", left: "-18%",
          background: "radial-gradient(circle, rgba(79,125,255,0.11) 0%, transparent 70%)",
          animationDuration: "14s",
        }}
      />
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "60vw", height: "60vw", maxWidth: 750, maxHeight: 750,
          top: "-10%", right: "-20%",
          background: "radial-gradient(circle, rgba(124,92,252,0.09) 0%, transparent 70%)",
          animationDuration: "18s", animationDelay: "-6s",
        }}
      />
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "50vw", height: "50vw", maxWidth: 620, maxHeight: 620,
          bottom: "-15%", left: "25%",
          background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
          animationDuration: "22s", animationDelay: "-11s",
        }}
      />
      {/* Noise grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────────── */
export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const base = "opacity-0 anim-fade-up";

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center
                 overflow-hidden pt-16"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Layer order: orbs → grid → cursor glow → content */}
      <AmbientOrbs />
      <PerspectiveGrid />
      <CursorGlow />

      {/* Top vignette so grid fades into header */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to bottom, var(--bg-base), transparent)" }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full
                   flex flex-col items-center text-center gap-8 py-24 lg:py-32"
      >
        {/* Badge */}
        <div className={visible ? base : "opacity-0"} style={{ animationDelay: "0ms" }}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5
                       border border-[#4f7dff]/30 bg-[#4f7dff]/10
                       text-[#4f7dff] text-[11px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            <Zap size={11} strokeWidth={2.5} aria-hidden="true" />
            AI Optimisation &amp; AI Automation
          </span>
        </div>

        {/* H1 */}
        <h1 className="flex flex-col items-center gap-1 sm:gap-2">
          {/* Line 1 */}
          <span
            className={`block text-[clamp(48px,8vw,88px)] leading-none tracking-tight
                        text-[#f1f5f9] ${visible ? base : "opacity-0"}`}
            style={{ fontFamily: "var(--font-syne)", fontWeight: 800, animationDelay: "80ms" }}
          >
            We Ship the
          </span>

          {/* Line 2 — shimmer gradient */}
          <span
            className={`block text-[clamp(48px,8vw,88px)] leading-none tracking-tight
                        ${visible ? base : "opacity-0"}`}
            style={{ fontFamily: "var(--font-syne)", fontWeight: 800, animationDelay: "160ms" }}
          >
            <ShimmerText>Systems</ShimmerText>
          </span>

          {/* Line 3 */}
          <span
            className={`block text-[clamp(48px,8vw,88px)] leading-none tracking-tight
                        text-[#f1f5f9] ${visible ? base : "opacity-0"}`}
            style={{ fontFamily: "var(--font-syne)", fontWeight: 800, animationDelay: "240ms" }}
          >
            That Scale.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`max-w-xl text-[18px] leading-relaxed text-[#8b95a8]
                      ${visible ? base : "opacity-0"}`}
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, animationDelay: "340ms" }}
        >
          NoOps Studios automates your DevOps, cloud, and AI pipelines
          so your team ships faster without the overhead.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4
                      ${visible ? base : "opacity-0"}`}
          style={{ animationDelay: "440ms" }}
        >
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
          <Link
            href="/works"
            className="flex items-center gap-2 px-7 py-[14px] rounded-full min-h-[52px]
                       text-[15px] font-[500] text-[#f1f5f9]/70 border border-white/10
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

        {/* Social proof */}
        <div
          className={`flex flex-col items-center gap-4 pt-4
                      ${visible ? base : "opacity-0"}`}
          style={{ animationDelay: "560ms" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-[#3d4a5c]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            Trusted by engineers at
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

      {/* Scroll chevron */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 anim-bounce-chevron"
      >
        <ChevronDown size={22} strokeWidth={1.5} className="text-[#f1f5f9] opacity-30" />
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }}
      />
    </section>
  );
}
