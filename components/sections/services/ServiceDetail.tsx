"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Code2, Cloud, GitMerge, Sparkles, ShieldCheck,
  ArrowRight, CheckCircle2,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────────── */
interface CaseStudy {
  company:  string;
  industry: string;
  result:   string;
  quote?:   string;
}

interface ServiceItem {
  id:          string;
  icon:        React.ReactNode;
  badge:       string;
  title:       string;
  tagline:     string;
  description: string;
  bullets:     string[];
  stack:       string[];
  caseStudy:   CaseStudy;
  accent:      string;
  accentColor: string;
  flip?:       boolean;   // flip layout so image/card is on left
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SERVICES: ServiceItem[] = [
  {
    id:          "web-mobile",
    icon:        <Code2 size={22} strokeWidth={1.5} />,
    badge:       "01 / Web & Mobile",
    title:       "App Development",
    tagline:     "Pixel-perfect. Production-ready. Performance.",
    description:
      "We build full-stack web and mobile applications with the modern frameworks your team already loves — and the performance standards your users demand. From MVP in weeks to enterprise-scale platforms.",
    bullets: [
      "React, Next.js 14 App Router, TypeScript",
      "Flutter & React Native for cross-platform mobile",
      "End-to-end type safety with tRPC or GraphQL",
      "Core Web Vitals — CLS < 0.1, LCP < 2.5s",
      "Accessibility-first (WCAG 2.1 AA)",
    ],
    stack:       ["Next.js", "React", "TypeScript", "Flutter", "tRPC", "GraphQL"],
    caseStudy: {
      company:  "FinScale",
      industry: "FinTech",
      result:   "Rebuilt legacy dashboard in Next.js — 3× faster load time, 40% drop in support tickets.",
      quote:    "The new product felt like a different company built it.",
    },
    accent:      "rgba(79,125,255,0.10)",
    accentColor: "#4f7dff",
  },
  {
    id:          "devops-cloud",
    icon:        <Cloud size={22} strokeWidth={1.5} />,
    badge:       "02 / DevOps & Cloud",
    title:       "Cloud Infrastructure",
    tagline:     "Resilient. Scalable. Zero-surprise bills.",
    description:
      "We architect and manage cloud infrastructure on AWS, GCP, and Azure that's built for production from day one — not bolted on later. Infrastructure as code, not a tangle of console clicks.",
    bullets: [
      "Terraform & Pulumi for reproducible infrastructure",
      "Multi-region, multi-AZ for true high availability",
      "FinOps practices — cost visibility from day one",
      "VPC design, IAM hardening, secrets management",
      "Managed Kubernetes (EKS, GKE, AKS)",
    ],
    stack:       ["AWS", "GCP", "Azure", "Terraform", "Kubernetes", "Docker"],
    caseStudy: {
      company:  "LogiFlow",
      industry: "Logistics SaaS",
      result:   "Migrated monolith to EKS microservices — 60% infra cost reduction, 99.97% uptime.",
      quote:    "We went from dreading deploys to shipping three times a day.",
    },
    accent:      "rgba(0,212,170,0.09)",
    accentColor: "#00d4aa",
    flip:        true,
  },
  {
    id:          "cicd",
    icon:        <GitMerge size={22} strokeWidth={1.5} />,
    badge:       "03 / CI/CD",
    title:       "Pipeline Automation",
    tagline:     "From commit to production in minutes, not hours.",
    description:
      "We design and implement delivery pipelines that catch bugs early, enforce code quality automatically, and make deploying to production a non-event. Every team we work with ends up shipping more, worrying less.",
    bullets: [
      "GitHub Actions, GitLab CI, CircleCI, Buildkite",
      "Automated test suites — unit, integration, e2e",
      "Blue/green & canary deployments",
      "Preview environments on every PR",
      "DORA metrics tracking from day one",
    ],
    stack:       ["GitHub Actions", "Docker", "Vercel", "Playwright", "Jest", "Datadog"],
    caseStudy: {
      company:  "Stackora",
      industry: "Developer Tools",
      result:   "Deploy time from 2 hours to 8 minutes. Zero rollback incidents in 6 months.",
      quote:    "The pipeline is bulletproof. We haven't had a bad deploy since.",
    },
    accent:      "rgba(124,92,252,0.10)",
    accentColor: "#7c5cfc",
  },
  {
    id:          "ai-automation",
    icon:        <Sparkles size={22} strokeWidth={1.5} />,
    badge:       "04 / AI Automation",
    title:       "AI Solutions",
    tagline:     "Turn manual processes into zero-ops pipelines.",
    description:
      "We build LLM-powered agents, RAG pipelines, and intelligent workflow automations that replace repetitive manual work. Not demo prototypes — production systems with evals, observability, and guardrails.",
    bullets: [
      "LLM integration — OpenAI, Anthropic, Mistral, Llama",
      "RAG pipelines with pgvector, Pinecone, Weaviate",
      "AI agents with tool use and memory",
      "Prompt engineering, eval frameworks, hallucination guards",
      "LangChain, LlamaIndex, Vercel AI SDK",
    ],
    stack:       ["OpenAI", "LangChain", "Pinecone", "Python", "FastAPI", "Supabase"],
    caseStudy: {
      company:  "OpsLayer",
      industry: "SaaS Operations",
      result:   "AI agent replaced 80% of manual ops work — saving 120+ engineer-hours per month.",
      quote:    "Genuinely transformative. We reassigned two full-time ops roles.",
    },
    accent:      "rgba(79,125,255,0.09)",
    accentColor: "#4f7dff",
    flip:        true,
  },
  {
    id:          "maintenance",
    icon:        <ShieldCheck size={22} strokeWidth={1.5} />,
    badge:       "05 / Support",
    title:       "Maintenance & Support",
    tagline:     "Your product, stable and evolving — always.",
    description:
      "We provide ongoing engineering support that keeps your product healthy and improving. Proactive monitoring, rapid incident response, and continuous iteration — so your team can focus on building features, not firefighting.",
    bullets: [
      "24/7 uptime monitoring with PagerDuty alerting",
      "< 1hr incident response SLA (P1 issues)",
      "Monthly performance & security reviews",
      "Dependency management and CVE patching",
      "Dedicated Slack channel + weekly engineering syncs",
    ],
    stack:       ["Datadog", "PagerDuty", "Sentry", "Vercel", "GitHub", "Linear"],
    caseStudy: {
      company:  "Meridian Health",
      industry: "HealthTech",
      result:   "Zero P1 incidents over 12 months. 99.99% uptime on patient-facing app.",
      quote:    "They feel like part of our engineering team, not a vendor.",
    },
    accent:      "rgba(0,212,170,0.08)",
    accentColor: "#00d4aa",
  },
];

/* ── Intersection observer hook ───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref             = useRef<HTMLElement>(null);
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

/* ── Stack pill ───────────────────────────────────────────────────────────── */
function StackPill({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px]
                 border border-white/[0.08] bg-white/[0.03] text-[#8b95a8]
                 hover:border-white/[0.15] hover:text-[#f1f5f9]
                 transition-all duration-200"
      style={{ fontFamily: "var(--font-dm-mono)" }}
    >
      {name}
    </span>
  );
}

/* ── Case study card ──────────────────────────────────────────────────────── */
function CaseStudyCard({
  caseStudy,
  accentColor,
  seen,
}: {
  caseStudy:   CaseStudy;
  accentColor: string;
  seen:        boolean;
}) {
  return (
    <div
      className={[
        "relative rounded-2xl p-7 lg:p-8 border border-white/[0.06]",
        "bg-[rgba(13,17,23,0.80)] backdrop-blur-xl overflow-hidden",
        "transition-[opacity,transform] duration-700 ease-out",
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: "260ms" }}
    >
      {/* Accent top bar */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      {/* Industry badge */}
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-[10px]
                   uppercase tracking-[0.18em] mb-5 border"
        style={{
          fontFamily:  "var(--font-dm-mono)",
          color:       accentColor,
          borderColor: `${accentColor}35`,
          background:  `${accentColor}12`,
        }}
      >
        Case Study · {caseStudy.industry}
      </span>

      {/* Company */}
      <p
        className="text-[18px] font-[500] text-[#f1f5f9] mb-3"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {caseStudy.company}
      </p>

      {/* Result */}
      <p
        className="text-[14px] text-[#8b95a8] leading-relaxed mb-5"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        {caseStudy.result}
      </p>

      {/* Quote */}
      {caseStudy.quote && (
        <blockquote
          className="border-l-2 pl-4 mt-4"
          style={{ borderColor: `${accentColor}50` }}
        >
          <p
            className="text-[13px] text-[#8b95a8] italic leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            &ldquo;{caseStudy.quote}&rdquo;
          </p>
        </blockquote>
      )}
    </div>
  );
}

/* ── Single service detail block ──────────────────────────────────────────── */
function ServiceBlock({ service }: { service: ServiceItem }) {
  const { ref, seen } = useInView(0.08);

  return (
    <article
      id={service.id}
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 lg:py-24 scroll-mt-20"
    >
      {/* Section rule */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-subtle)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className={[
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start",
            service.flip ? "lg:[direction:rtl]" : "",
          ].join(" ")}
        >
          {/* ── Left: Content ──────────────────────────────────── */}
          <div
            className="flex flex-col gap-6 lg:[direction:ltr]"
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
                className="inline-flex items-center gap-2.5 rounded-xl px-4 py-2
                           border text-[11px] uppercase tracking-[0.18em]"
                style={{
                  fontFamily:  "var(--font-dm-mono)",
                  color:       service.accentColor,
                  borderColor: `${service.accentColor}35`,
                  background:  service.accent,
                }}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${service.accentColor}20`, color: service.accentColor }}
                  aria-hidden="true"
                >
                  {service.icon}
                </span>
                {service.badge}
              </span>
            </div>

            {/* Title */}
            <div
              className={[
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: "80ms" }}
            >
              <h2
                className="text-[clamp(28px,4vw,44px)] font-[800] leading-[1.1]
                           tracking-tight text-[#f1f5f9] mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {service.title}
              </h2>
              <p
                className="text-[14px] uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  color: service.accentColor,
                }}
              >
                {service.tagline}
              </p>
            </div>

            {/* Description */}
            <p
              className={[
                "text-[16px] text-[#8b95a8] leading-relaxed",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 400,
                transitionDelay: "160ms",
              }}
            >
              {service.description}
            </p>

            {/* Bullets */}
            <ul
              className={[
                "flex flex-col gap-3",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: "220ms" }}
              aria-label={`${service.title} features`}
            >
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    strokeWidth={1.75}
                    className="mt-[3px] shrink-0"
                    style={{ color: service.accentColor }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[14px] text-[#8b95a8] leading-snug"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stack pills */}
            <div
              className={[
                "flex flex-wrap gap-2 pt-1",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: "300ms" }}
            >
              {service.stack.map((s) => <StackPill key={s} name={s} />)}
            </div>

            {/* CTA link */}
            <div
              className={[
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ transitionDelay: "360ms" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-[500]
                           transition-all duration-200 hover:gap-3
                           focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                           focus-visible:outline-offset-2 rounded-sm"
                style={{ color: service.accentColor, fontFamily: "var(--font-dm-sans)" }}
              >
                Start this service
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ── Right: Case study card ──────────────────────────── */}
          <div className="lg:[direction:ltr]">
            <CaseStudyCard
              caseStudy={service.caseStudy}
              accentColor={service.accentColor}
              seen={seen}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── ServiceDetail (renders all 5 blocks) ─────────────────────────────────── */
export function ServiceDetail() {
  return (
    <div>
      {SERVICES.map((service) => (
        <ServiceBlock key={service.id} service={service} />
      ))}
    </div>
  );
}
