"use client";

import { useEffect, useRef, useState } from "react";

/* ── Types ────────────────────────────────────────────────────────────────── */
interface Step {
  number:      string;
  title:       string;
  description: string;
  accent:      string;
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  {
    number:      "01",
    title:       "Discovery",
    description: "We map your infrastructure, team, and goals to find exactly where automation unlocks the most leverage.",
    accent:      "#4f7dff",
  },
  {
    number:      "02",
    title:       "Architecture",
    description: "We design scalable systems tailored to your stack — no over-engineering, no technical debt handed off to you.",
    accent:      "#7c5cfc",
  },
  {
    number:      "03",
    title:       "Build & Ship",
    description: "Rapid iterations with full CI/CD from day one. You see working software in days, not months.",
    accent:      "#00d4aa",
  },
  {
    number:      "04",
    title:       "Monitor & Scale",
    description: "Ongoing support, metrics dashboards, and growth engineering so your system evolves as fast as you do.",
    accent:      "#4f7dff",
  },
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

/* ── Connector line (desktop only) ───────────────────────────────────────── */
function Connector({ seen, delay }: { seen: boolean; delay: number }) {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex items-center self-start mt-[52px] flex-1 mx-2 min-w-0"
    >
      {/* Track */}
      <div className="relative w-full h-px bg-white/[0.06] overflow-hidden rounded-full">
        {/* Animated fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full
                     bg-gradient-to-r from-white/20 to-white/5
                     transition-[width] duration-700 ease-out"
          style={{
            width: seen ? "100%" : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
        {/* Dashes overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(7,9,16,1) 6px, rgba(7,9,16,1) 10px)",
          }}
        />
      </div>
      {/* Arrow tip */}
      <div
        className="shrink-0 w-1.5 h-1.5 rounded-full ml-1
                   transition-[opacity] duration-300"
        style={{
          background: "rgba(255,255,255,0.2)",
          opacity: seen ? 1 : 0,
          transitionDelay: `${delay + 600}ms`,
        }}
      />
    </div>
  );
}

/* ── Single Step Card ─────────────────────────────────────────────────────── */
function StepCard({
  step,
  index,
  seen,
  isLast,
}: {
  step:   Step;
  index:  number;
  seen:   boolean;
  isLast: boolean;
}) {
  const delay = index * 100;

  return (
    <>
      <article
        className={[
          "relative flex flex-col gap-4 flex-1 min-w-0",
          /* Entrance */
          "transition-[opacity,transform] duration-600 ease-out",
          seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Step number — large decorative */}
        <div className="relative h-16 flex items-center">
          <span
            className="absolute -top-1 left-0 text-[64px] font-[800] leading-none
                       select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-dm-mono)",
              background: `linear-gradient(135deg, ${step.accent}, transparent)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.22,
            }}
            aria-hidden="true"
          >
            {step.number}
          </span>

          {/* Numbered pill badge */}
          <span
            className="relative z-10 inline-flex items-center justify-center
                       w-9 h-9 rounded-xl border text-[12px] font-[400]
                       transition-colors duration-300"
            style={{
              fontFamily: "var(--font-dm-mono)",
              background: `${step.accent}18`,
              borderColor: `${step.accent}35`,
              color: step.accent,
            }}
            aria-label={`Step ${step.number}`}
          >
            {step.number}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[20px] font-[500] text-[#f1f5f9] leading-snug"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className="text-[14px] text-[#8b95a8] leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
        >
          {step.description}
        </p>

        {/* Mobile vertical connector (not last) */}
        {!isLast && (
          <div
            aria-hidden="true"
            className="lg:hidden flex flex-col items-start gap-1 mt-2 ml-[17px]"
          >
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="w-px h-3 rounded-full bg-white/[0.08]
                           transition-[opacity] duration-300"
                style={{
                  opacity: seen ? 1 : 0,
                  transitionDelay: `${delay + i * 60}ms`,
                }}
              />
            ))}
          </div>
        )}
      </article>

      {/* Desktop connector between steps */}
      {!isLast && (
        <Connector seen={seen} delay={delay + 200} />
      )}
    </>
  );
}

/* ── Process Section ──────────────────────────────────────────────────────── */
export function Process() {
  const { ref: headerRef, seen: headerSeen } = useInView(0.2);
  const { ref: stepsRef,  seen: stepsSeen  } = useInView(0.1);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Top edge fade from base */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-subtle)" }}
      />

      {/* Background accent glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,92,252,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <p
            className={[
              "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
          >
            / How We Work
          </p>

          <h2
            id="process-heading"
            className={[
              "text-[clamp(32px,5vw,48px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9] mb-5",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{
              fontFamily: "var(--font-syne)",
              transitionDelay: "80ms",
            }}
          >
            From Brief to Deployment{" "}
            <span className="gradient-text">in Weeks</span>
          </h2>

          <p
            className={[
              "text-[17px] text-[#8b95a8] leading-relaxed max-w-lg",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 400,
              transitionDelay: "160ms",
            }}
          >
            A lean four-phase process designed to move fast without
            breaking things — or your team&apos;s sanity.
          </p>
        </div>

        {/* ── Steps ───────────────────────────────────────────────── */}
        {/* Desktop: flex row with connector lines
            Mobile:  flex column with dot connectors              */}
        <div
          ref={stepsRef}
          className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-0"
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              seen={stepsSeen}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        {/* ── Bottom stat strip ───────────────────────────────────── */}
        <div
          className={[
            "mt-16 lg:mt-20 pt-10 border-t border-white/[0.06]",
            "grid grid-cols-2 lg:grid-cols-4 gap-8",
            "transition-[opacity,transform] duration-700 ease-out",
            stepsSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "500ms" }}
        >
          {[
            { value: "< 2 wks", label: "Avg. time to first deploy" },
            { value: "99.9%",   label: "Uptime across client infra"  },
            { value: "80%",     label: "Avg. ops overhead reduction"  },
            { value: "24 hrs",  label: "Response time guarantee"      },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <span
                className="text-[clamp(24px,3vw,36px)] font-[800] leading-none tracking-tight gradient-text"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {value}
              </span>
              <span
                className="text-[13px] text-[#3d4a5c]"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
