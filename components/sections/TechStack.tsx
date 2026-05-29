"use client";

import { useEffect, useRef, useState } from "react";

/* ── Data ─────────────────────────────────────────────────────────────────── */
const ROW_ONE = [
  { name: "Next.js",    symbol: "▲" },
  { name: "React",      symbol: "⬡" },
  { name: "TypeScript", symbol: "TS" },
  { name: "Node.js",    symbol: "⬢" },
  { name: "Go",         symbol: "Go" },
  { name: "Python",     symbol: "Py" },
  { name: "PostgreSQL", symbol: "🐘" },
  { name: "Redis",      symbol: "⬥" },
  { name: "GraphQL",    symbol: "◈" },
  { name: "tRPC",       symbol: "t~" },
];

const ROW_TWO = [
  { name: "AWS",            symbol: "☁" },
  { name: "GCP",            symbol: "G" },
  { name: "Terraform",      symbol: "◇" },
  { name: "Docker",         symbol: "🐳" },
  { name: "Kubernetes",     symbol: "⎈" },
  { name: "GitHub Actions", symbol: "⚙" },
  { name: "Vercel",         symbol: "▲" },
  { name: "Supabase",       symbol: "⬡" },
  { name: "OpenAI",         symbol: "◎" },
  { name: "LangChain",      symbol: "⛓" },
];

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

/* ── Single ticker item ───────────────────────────────────────────────────── */
function TickerItem({ name, symbol }: { name: string; symbol: string }) {
  return (
    <div
      className="group flex items-center gap-3 px-6 py-3 rounded-xl mx-2
                 border border-white/[0.04] bg-white/[0.02]
                 hover:border-white/[0.10] hover:bg-white/[0.05]
                 transition-all duration-200 cursor-default shrink-0"
    >
      {/* Symbol */}
      <span
        className="text-[15px] text-[#f1f5f9] opacity-30
                   group-hover:opacity-80 transition-opacity duration-200
                   select-none w-5 text-center"
        aria-hidden="true"
      >
        {symbol}
      </span>

      {/* Name */}
      <span
        className="text-[13px] text-[#8b95a8] group-hover:text-[#f1f5f9]
                   transition-colors duration-200 whitespace-nowrap"
        style={{ fontFamily: "var(--font-dm-mono)", fontWeight: 400 }}
      >
        {name}
      </span>
    </div>
  );
}

/* ── Ticker row ───────────────────────────────────────────────────────────── */
function TickerRow({
  items,
  reverse = false,
  speed = 40,
}: {
  items:    { name: string; symbol: string }[];
  reverse?: boolean;
  speed?:   number;
}) {
  const [paused, setPaused] = useState(false);

  /* Duplicate items so the loop appears seamless */
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"   /* decorative — screen readers skip */
    >
      <div
        className="flex"
        style={{
          animation: `${reverse ? "tickerReverse" : "ticker"} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <TickerItem key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ── TechStack Section ────────────────────────────────────────────────────── */
export function TechStack() {
  const { ref: headerRef, seen: headerSeen } = useInView(0.2);
  const { ref: tickerRef, seen: tickerSeen } = useInView(0.1);

  return (
    <section
      id="tech-stack"
      aria-labelledby="techstack-heading"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Top divider */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-subtle)" }}
      />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(79,125,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-14 lg:mb-16 text-center">
          <p
            className={[
              "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
          >
            / Our Toolkit
          </p>

          <h2
            id="techstack-heading"
            className={[
              "text-[clamp(32px,5vw,48px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9] mb-5",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
          >
            Battle-Tested{" "}
            <span className="gradient-text">Technologies</span>
          </h2>

          <p
            className={[
              "text-[17px] text-[#8b95a8] leading-relaxed max-w-lg mx-auto",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 400,
              transitionDelay: "160ms",
            }}
          >
            We pick the right tool for the job — not the trendiest one.
            Every technology in our stack is production-proven.
          </p>
        </div>
      </div>

      {/* ── Ticker strip (full bleed, outside container) ──────── */}
      <div
        ref={tickerRef}
        className={[
          "relative w-full",
          "border-y border-white/[0.05]",
          "transition-opacity duration-700 ease-out",
          tickerSeen ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          background: "rgba(255,255,255,0.015)",
          transitionDelay: "200ms",
        }}
      >
        {/* Left fade mask */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--bg-base), transparent)",
          }}
        />
        {/* Right fade mask */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--bg-base), transparent)",
          }}
        />

        {/* Row 1 — left to right */}
        <div className="py-3">
          <TickerRow items={ROW_ONE} reverse={false} speed={38} />
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="h-px mx-6"
          style={{ background: "var(--border-subtle)" }}
        />

        {/* Row 2 — right to left */}
        <div className="py-3">
          <TickerRow items={ROW_TWO} reverse={true} speed={44} />
        </div>
      </div>

      {/* ── Screen-reader accessible tech list ────────────────── */}
      <div className="sr-only">
        <p>Technologies we use:</p>
        <ul>
          {[...ROW_ONE, ...ROW_TWO].map((t) => (
            <li key={t.name}>{t.name}</li>
          ))}
        </ul>
      </div>

      {/* ── Bottom CTA nudge ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div
          className={[
            "mt-14 lg:mt-16 flex flex-col sm:flex-row items-center",
            "justify-between gap-6 p-6 lg:p-8 rounded-2xl",
            "border border-white/[0.06] bg-white/[0.02]",
            "transition-[opacity,transform] duration-700 ease-out",
            tickerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "400ms" }}
        >
          <div>
            <p
              className="text-[15px] font-[500] text-[#f1f5f9] mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Don&apos;t see your stack?
            </p>
            <p
              className="text-[13px] text-[#8b95a8]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              We work with any modern stack. Tell us what you&apos;re running.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full
                       text-[13.5px] font-[500] text-white min-h-[44px]
                       border border-white/10 hover:border-white/25
                       hover:text-white text-[#f1f5f9]/70
                       transition-all duration-200
                       focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                       focus-visible:outline-offset-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Let&apos;s talk →
          </a>
        </div>
      </div>
    </section>
  );
}
