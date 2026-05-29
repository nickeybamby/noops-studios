"use client";

import { useEffect, useRef, useState } from "react";

/* ── Types ────────────────────────────────────────────────────────────────── */
interface Testimonial {
  id:      string;
  quote:   string;
  name:    string;
  title:   string;
  company: string;
  initials: string;
  gradient: string;
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const TESTIMONIALS: Testimonial[] = [
  {
    id:       "alex",
    quote:
      "NoOps cut our deploy time from 2 hours to 8 minutes. The CI/CD pipeline they built is bulletproof — we haven't had a bad deploy in six months.",
    name:     "Alex R.",
    title:    "CTO",
    company:  "FinTech Startup",
    initials: "AR",
    gradient: "linear-gradient(135deg, #4f7dff, #7c5cfc)",
  },
  {
    id:       "maria",
    quote:
      "Their AI automation reduced our manual ops work by 80%. The agents they built handle what used to take our team an entire sprint. Genuinely transformative.",
    name:     "Maria L.",
    title:    "VP Engineering",
    company:  "SaaS Co.",
    initials: "ML",
    gradient: "linear-gradient(135deg, #7c5cfc, #00d4aa)",
  },
  {
    id:       "james",
    quote:
      "From architecture review to production in 3 weeks. The team moves fast, communicates clearly, and ships clean code. Exactly what a founder needs.",
    name:     "James K.",
    title:    "Founder",
    company:  "DevTool",
    initials: "JK",
    gradient: "linear-gradient(135deg, #00d4aa, #4f7dff)",
  },
];

/* ── Star rating ──────────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M7 1L8.545 5.09H13L9.59 7.582L10.955 11.91L7 9.25L3.045 11.91L4.41 7.582L1 5.09H5.455L7 1Z"
            fill="#f59e0b"
            stroke="#f59e0b"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

/* ── Avatar ───────────────────────────────────────────────────────────────── */
function Avatar({
  initials,
  gradient,
  name,
}: {
  initials: string;
  gradient: string;
  name:     string;
}) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center
                 shrink-0 text-[12px] font-[500] text-white select-none"
      style={{ background: gradient, fontFamily: "var(--font-dm-sans)" }}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
}

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

/* ── Testimonial Card ─────────────────────────────────────────────────────── */
function TestimonialCard({
  testimonial,
  index,
  seen,
}: {
  testimonial: Testimonial;
  index:       number;
  seen:        boolean;
}) {
  return (
    <article
      className={[
        "group relative flex flex-col gap-5 rounded-2xl p-7 lg:p-8",
        "bg-[#0d1117] border border-white/[0.06]",
        "hover:border-[rgba(79,125,255,0.30)]",
        "hover:shadow-[0_0_40px_rgba(79,125,255,0.08)]",
        "transition-all duration-300",
        /* Scroll entrance */
        "transition-[opacity,transform,border-color,box-shadow] duration-500 ease-out",
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Subtle top-edge accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-8 right-8 h-px rounded-full
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: testimonial.gradient }}
      />

      {/* Stars */}
      <Stars />

      {/* Quote */}
      <blockquote>
        <p
          className="text-[15px] leading-relaxed text-[#8b95a8] italic flex-1"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: "var(--border-subtle)" }}
      />

      {/* Author */}
      <footer className="flex items-center gap-3">
        <Avatar
          initials={testimonial.initials}
          gradient={testimonial.gradient}
          name={testimonial.name}
        />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span
            className="text-[14px] font-[500] text-[#f1f5f9] leading-none"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {testimonial.name}
          </span>
          <span
            className="text-[11px] text-[#3d4a5c] uppercase tracking-[0.15em] leading-none mt-0.5"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            {testimonial.title}, {testimonial.company}
          </span>
        </div>
      </footer>
    </article>
  );
}

/* ── Testimonials Section ─────────────────────────────────────────────────── */
export function Testimonials() {
  const { ref: headerRef, seen: headerSeen } = useInView(0.2);
  const { ref: cardsRef,  seen: cardsSeen  } = useInView(0.08);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
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
        className="absolute bottom-0 left-1/2 -translate-x-1/2
                   w-[700px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(124,92,252,0.06) 0%, transparent 70%)",
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
            / Client Voices
          </p>

          <h2
            id="testimonials-heading"
            className={[
              "text-[clamp(32px,5vw,48px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9] mb-5",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
          >
            Trusted by{" "}
            <span className="gradient-text">Engineering Teams</span>
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
            Don&apos;t take our word for it. Here&apos;s what the engineers
            and founders we&apos;ve worked with have to say.
          </p>
        </div>

        {/* ── Cards — desktop 3-col / mobile horizontal scroll snap ── */}
        {/* Mobile: scroll-snap, desktop: grid */}
        <div
          ref={cardsRef}
          className={[
            /* Mobile: horizontal scroll snap */
            "flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6",
            "scrollbar-none",
            /* Desktop: grid override */
            "lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0 lg:snap-none",
          ].join(" ")}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="snap-start shrink-0 w-[min(320px,80vw)] lg:w-auto"
            >
              <TestimonialCard testimonial={t} index={i} seen={cardsSeen} />
            </div>
          ))}
        </div>

        {/* ── Social proof bar ────────────────────────────────────── */}
        <div
          className={[
            "mt-14 lg:mt-16 flex flex-col sm:flex-row items-center",
            "justify-center gap-3 sm:gap-8",
            "transition-[opacity,transform] duration-700 ease-out",
            cardsSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          ].join(" ")}
          style={{ transitionDelay: "400ms" }}
        >
          {[
            { value: "50+",   label: "Projects shipped"    },
            { value: "100%",  label: "Client satisfaction" },
            { value: "3 wks", label: "Avg. time to prod"   },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-3">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden sm:block w-px h-8 bg-white/[0.06]"
                />
              )}
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="text-[22px] font-[800] leading-none gradient-text"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {value}
                </span>
                <span
                  className="text-[11px] text-[#3d4a5c] uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
