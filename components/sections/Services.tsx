"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cloud, GitMerge, Sparkles, ShieldCheck } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────────── */
interface Service {
  id:          string;
  icon:        React.ReactNode;
  badge:       string;
  title:       string;
  description: string;
  accent:      string;       // CSS colour for icon bg tint
  href:        string;
  featured?:   boolean;      // spans 2 columns on desktop
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SERVICES: Service[] = [
  {
    id:          "web-mobile",
    icon:        <Code2 size={26} strokeWidth={1.5} />,
    badge:       "01 / Web & Mobile",
    title:       "App Development",
    description:
      "Pixel-perfect, performant apps built with modern stacks — React, Next.js, Flutter, and beyond. From MVP to enterprise-scale products.",
    accent:      "rgba(79,125,255,0.12)",
    href:        "/services#web-mobile",
    featured:    true,
  },
  {
    id:          "devops-cloud",
    icon:        <Cloud size={26} strokeWidth={1.5} />,
    badge:       "02 / DevOps & Cloud",
    title:       "Cloud Infrastructure",
    description:
      "Scalable, resilient cloud architecture on AWS, GCP, and Azure built for production from day one.",
    accent:      "rgba(0,212,170,0.10)",
    href:        "/services#devops-cloud",
  },
  {
    id:          "cicd",
    icon:        <GitMerge size={26} strokeWidth={1.5} />,
    badge:       "03 / CI/CD",
    title:       "Pipeline Automation",
    description:
      "Streamlined delivery pipelines that reduce deploy friction, catch regressions early, and ship continuously.",
    accent:      "rgba(124,92,252,0.12)",
    href:        "/services#cicd",
  },
  {
    id:          "ai-automation",
    icon:        <Sparkles size={26} strokeWidth={1.5} />,
    badge:       "04 / AI Automation",
    title:       "AI Solutions",
    description:
      "LLM integrations, intelligent agents, and workflow automation that transform manual processes into zero-ops pipelines.",
    accent:      "rgba(79,125,255,0.10)",
    href:        "/services#ai-automation",
  },
  {
    id:          "maintenance",
    icon:        <ShieldCheck size={26} strokeWidth={1.5} />,
    badge:       "05 / Support",
    title:       "Maintenance & Support",
    description:
      "24/7 monitoring, incident response, and iterative improvements to keep your product stable and evolving.",
    accent:      "rgba(0,212,170,0.08)",
    href:        "/services#maintenance",
  },
];

/* ── Intersection-observer hook ───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref     = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, seen };
}

/* ── Individual Service Card ──────────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
  seen,
}: {
  service: Service;
  index:   number;
  seen:    boolean;
}) {
  /* Derive accent icon colour from the tint */
  const iconColor =
    service.accent.startsWith("rgba(79")  ? "#4f7dff"
    : service.accent.startsWith("rgba(0") ? "#00d4aa"
    :                                        "#7c5cfc";

  return (
    <article
      className={[
        /* Layout */
        "group relative flex flex-col gap-5 rounded-2xl p-7 lg:p-8 overflow-hidden",
        /* Glass morphism */
        "bg-[rgba(13,17,23,0.70)] backdrop-blur-xl",
        "border border-white/[0.06]",
        /* Hover */
        "hover:border-[rgba(79,125,255,0.35)] hover:-translate-y-1",
        "hover:shadow-[0_0_40px_rgba(79,125,255,0.10)]",
        "transition-all duration-300 cubic-bezier(0.4,0,0.2,1)",
        /* Featured spans 2 cols */
        service.featured ? "md:col-span-2" : "",
        /* Scroll-entrance */
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        "transition-[opacity,transform] duration-500 ease-out",
      ].join(" ")}
      style={{ transitionDelay: seen ? `${index * 80}ms` : "0ms" }}
    >
      {/* Radial accent glow on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 0% 0%, ${service.accent}, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl
                   border border-white/[0.08] transition-colors duration-300
                   group-hover:border-white/[0.14]"
        style={{ background: service.accent, color: iconColor }}
        aria-hidden="true"
      >
        {service.icon}
      </div>

      {/* Badge label */}
      <p
        className="relative z-10 text-[10.5px] uppercase tracking-[0.2em] text-[#3d4a5c]
                   group-hover:text-[#8b95a8] transition-colors duration-300"
        style={{ fontFamily: "var(--font-dm-mono)" }}
      >
        {service.badge}
      </p>

      {/* Title */}
      <h3
        className="relative z-10 text-[20px] font-[500] text-[#f1f5f9] leading-snug
                   -mt-2"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="relative z-10 text-[14px] text-[#8b95a8] leading-relaxed
                   flex-1"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        {service.description}
      </p>

      {/* Explore link */}
      <Link
        href={service.href}
        className="relative z-10 inline-flex items-center gap-1.5
                   text-[13px] text-[#4f7dff] font-[400]
                   hover:gap-2.5 transition-all duration-200
                   focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                   focus-visible:outline-offset-2 rounded-sm w-fit"
        style={{ fontFamily: "var(--font-dm-sans)" }}
        aria-label={`Explore ${service.title}`}
      >
        Explore
        <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
      </Link>
    </article>
  );
}

/* ── Services Section ─────────────────────────────────────────────────────── */
export function Services() {
  const { ref: headerRef, seen: headerSeen } = useInView(0.2);
  const { ref: gridRef,   seen: gridSeen   } = useInView(0.08);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Subtle section divider glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24
                   bg-gradient-to-b from-transparent via-white/10 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section Header ──────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="mb-14 lg:mb-16 max-w-2xl"
        >
          {/* Section label */}
          <p
            className={[
              "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
          >
            / What We Do
          </p>

          {/* H2 */}
          <h2
            id="services-heading"
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
            End-to-End Technical{" "}
            <span className="gradient-text">Execution</span>
          </h2>

          {/* Subtext */}
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
            From cloud architecture to AI pipelines, we deliver
            the infrastructure that scales.
          </p>
        </div>

        {/* ── Bento Grid ──────────────────────────────────────────── */}
        {/* Desktop: 3-col grid, first card spans 2 cols → row 1: [featured(2col) | card]
            Row 2: [card | card | card] — but we only have 5 cards so:
            Row 1: featured(col-span-2) + card(col-span-1)
            Row 2: card + card + card                                */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              seen={gridSeen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
