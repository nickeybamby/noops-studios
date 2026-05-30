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

const VALUES = [
  {
    title:       "Ownership over output",
    description: "We measure success by outcomes, not deliverables. If your system is down, it's our problem too.",
    accent:      "#4f7dff",
  },
  {
    title:       "Speed without shortcuts",
    description: "We ship fast because we've done the hard work upfront — solid architecture, tests from day one, clean handoffs.",
    accent:      "#7c5cfc",
  },
  {
    title:       "Radical transparency",
    description: "You'll always know what we're building, why, and what's blocking us. No surprises, no spin.",
    accent:      "#00d4aa",
  },
  {
    title:       "Small team, big output",
    description: "No bloated project teams. You get senior engineers — not a pyramid of PMs and junior devs.",
    accent:      "#4f7dff",
  },
];

export function Mission() {
  const { ref: missionRef, seen: missionSeen } = useInView(0.1);
  const { ref: valuesRef,  seen: valuesSeen  } = useInView(0.08);

  return (
    <>
      {/* ── Mission Statement ──────────────────────────────────────── */}
      <section
        aria-labelledby="mission-heading"
        className="py-20 lg:py-28"
        style={{ background: "var(--bg-surface)" }}
      >
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 h-px"
          style={{ background: "var(--border-subtle)" }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={missionRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Left — label + heading */}
            <div>
              <p
                className={[
                  "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
                  "transition-[opacity,transform] duration-500 ease-out",
                  missionSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" ")}
                style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
              >
                / Our Mission
              </p>
              <h2
                id="mission-heading"
                className={[
                  "text-[clamp(28px,4vw,44px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9]",
                  "transition-[opacity,transform] duration-500 ease-out",
                  missionSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" ")}
                style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
              >
                Automate what slows
                you down.{" "}
                <span className="gradient-text">Ship what matters.</span>
              </h2>
            </div>

            {/* Right — copy */}
            <div
              className={[
                "flex flex-col gap-5",
                "transition-[opacity,transform] duration-500 ease-out",
                missionSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: "160ms" }}
            >
              <p
                className="text-[16px] text-[#8b95a8] leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                Most teams spend more time maintaining infrastructure, fighting
                deployment friction, and doing manual ops work than they do
                building their actual product. That&apos;s the problem we exist
                to solve.
              </p>
              <p
                className="text-[16px] text-[#8b95a8] leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                We embed into your workflow as a force-multiplier — handling
                the platform, pipelines, and automation so your team can stay
                focused on what only they can build.
              </p>
              <p
                className="text-[16px] text-[#f1f5f9]/70 leading-relaxed border-l-2
                           border-[#4f7dff]/40 pl-5 italic"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              >
                &ldquo;If it can be automated, it should be. If it can&apos;t,
                we make it as painless as possible.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="values-heading"
        className="py-20 lg:py-28"
        style={{ background: "var(--bg-base)" }}
      >
        <div
          aria-hidden="true"
          className="h-px w-full"
          style={{ background: "var(--border-subtle)" }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28">
          <div ref={valuesRef}>
            {/* Header */}
            <div className="mb-12 lg:mb-16 max-w-xl">
              <p
                className={[
                  "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
                  "transition-[opacity,transform] duration-500 ease-out",
                  valuesSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" ")}
                style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
              >
                / How We Operate
              </p>
              <h2
                id="values-heading"
                className={[
                  "text-[clamp(28px,4vw,44px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9]",
                  "transition-[opacity,transform] duration-500 ease-out",
                  valuesSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                ].join(" ")}
                style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
              >
                Principles we{" "}
                <span className="gradient-text">don&apos;t compromise on</span>
              </h2>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {VALUES.map((value, i) => (
                <article
                  key={value.title}
                  className={[
                    "group relative flex flex-col gap-4 p-7 rounded-2xl",
                    "bg-[rgba(13,17,23,0.70)] border border-white/[0.06]",
                    "hover:border-[rgba(79,125,255,0.28)] hover:-translate-y-1",
                    "hover:shadow-[0_0_30px_rgba(79,125,255,0.07)]",
                    "transition-all duration-300",
                    "transition-[opacity,transform] duration-500 ease-out",
                    valuesSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Accent dot */}
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: value.accent }}
                    aria-hidden="true"
                  />
                  <h3
                    className="text-[18px] font-[500] text-[#f1f5f9] leading-snug"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-[14px] text-[#8b95a8] leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
