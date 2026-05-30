"use client";

import { useEffect, useRef, useState } from "react";

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

/* ── Count-up hook ────────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      /* ease-out cubic */
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ── Individual stat with count-up ───────────────────────────────────────── */
function StatItem({
  value,
  numericValue,
  suffix,
  label,
  sublabel,
  accent,
  index,
  seen,
}: {
  value:        string;
  numericValue: number;
  suffix:       string;
  label:        string;
  sublabel:     string;
  accent:       string;
  index:        number;
  seen:         boolean;
}) {
  const count  = useCountUp(numericValue, 1400, seen);
  const display = `${count}${suffix}`;

  return (
    <div
      className={[
        "flex flex-col gap-2 p-7 lg:p-8 rounded-2xl",
        "bg-[rgba(13,17,23,0.70)] border border-white/[0.06]",
        "transition-[opacity,transform] duration-600 ease-out",
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      ].join(" ")}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Accent bar */}
      <div
        className="w-8 h-0.5 rounded-full mb-2"
        style={{ background: accent }}
        aria-hidden="true"
      />

      {/* Value */}
      <span
        className="text-[clamp(36px,5vw,56px)] font-[800] leading-none tracking-tight"
        style={{
          fontFamily: "var(--font-syne)",
          background: `linear-gradient(135deg, ${accent}, #f1f5f9)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        aria-label={value}
      >
        {display}
      </span>

      {/* Label */}
      <span
        className="text-[16px] font-[500] text-[#f1f5f9] leading-snug"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {label}
      </span>

      {/* Sublabel */}
      <span
        className="text-[12px] text-[#3d4a5c] leading-snug"
        style={{ fontFamily: "var(--font-dm-mono)" }}
      >
        {sublabel}
      </span>
    </div>
  );
}

const STATS = [
  {
    value:        "50+",
    numericValue: 50,
    suffix:       "+",
    label:        "Projects shipped",
    sublabel:     "Across 12 industries",
    accent:       "#4f7dff",
  },
  {
    value:        "99.9%",
    numericValue: 99,
    suffix:       "%",
    label:        "Average uptime SLA",
    sublabel:     "Across all client infrastructure",
    accent:       "#00d4aa",
  },
  {
    value:        "80%",
    numericValue: 80,
    suffix:       "%",
    label:        "Ops overhead reduced",
    sublabel:     "Average across AI automation clients",
    accent:       "#7c5cfc",
  },
  {
    value:        "8min",
    numericValue: 8,
    suffix:       "min",
    label:        "Average deploy time",
    sublabel:     "Down from hours for most clients",
    accent:       "#4f7dff",
  },
  {
    value:        "3wks",
    numericValue: 3,
    suffix:       "wks",
    label:        "Time to first production",
    sublabel:     "Median across all engagements",
    accent:       "#00d4aa",
  },
  {
    value:        "24hr",
    numericValue: 24,
    suffix:       "hr",
    label:        "Response time guarantee",
    sublabel:     "On all P1 incidents",
    accent:       "#7c5cfc",
  },
];

export function Stats() {
  const { ref, seen } = useInView(0.08);

  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="py-20 lg:py-28"
      style={{ background: "var(--bg-base)" }}
    >
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: "var(--border-subtle)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28">

        {/* Header */}
        <div className="mb-12 lg:mb-14 max-w-xl">
          <p
            className={[
              "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
              "transition-[opacity,transform] duration-500 ease-out",
              seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            / By the Numbers
          </p>
          <h2
            id="stats-heading"
            className={[
              "text-[clamp(28px,4vw,44px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9]",
              "transition-[opacity,transform] duration-500 ease-out",
              seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
          >
            Numbers we&apos;re{" "}
            <span className="gradient-text">proud to put on paper</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              {...stat}
              index={i}
              seen={seen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
