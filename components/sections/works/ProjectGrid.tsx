"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────────── */
type Tag =
  | "All"
  | "DevOps"
  | "AI"
  | "Cloud"
  | "Web & Mobile"
  | "CI/CD"
  | "Maintenance";

interface Outcome {
  value: string;
  label: string;
}

interface Project {
  id:          string;
  title:       string;
  description: string;
  tags:        Tag[];
  stack:       string[];
  outcomes:    Outcome[];
  accent:      string;
  accentColor: string;
  featured?:   boolean;
}

/* ── Project data ─────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id:          "finscale-dashboard",
    title:       "FinScale — Trading Dashboard",
    description:
      "Rebuilt a legacy Angular trading dashboard in Next.js 14 with real-time WebSocket data feeds, role-based access control, and sub-100ms quote updates.",
    tags:        ["Web & Mobile"],
    stack:       ["Next.js", "TypeScript", "tRPC", "WebSockets", "Redis", "PostgreSQL"],
    outcomes:    [
      { value: "3×",    label: "Faster load time"     },
      { value: "40%",   label: "Fewer support tickets" },
      { value: "< 2wk", label: "Time to first deploy"  },
    ],
    accent:      "rgba(79,125,255,0.10)",
    accentColor: "#4f7dff",
    featured:    true,
  },
  {
    id:          "logiflow-infra",
    title:       "LogiFlow — EKS Migration",
    description:
      "Migrated a Node.js monolith to a Kubernetes microservices architecture on AWS EKS, with Terraform IaC, GitOps via ArgoCD, and full observability.",
    tags:        ["Cloud", "DevOps"],
    stack:       ["AWS EKS", "Terraform", "ArgoCD", "Datadog", "Docker", "Helm"],
    outcomes:    [
      { value: "60%",    label: "Infra cost reduction" },
      { value: "99.97%", label: "Uptime achieved"      },
      { value: "3×/day", label: "Deploy frequency"     },
    ],
    accent:      "rgba(0,212,170,0.09)",
    accentColor: "#00d4aa",
    featured:    true,
  },
  {
    id:          "stackora-cicd",
    title:       "Stackora — CI/CD Overhaul",
    description:
      "Replaced a fragile Jenkins setup with GitHub Actions pipelines — parallel test sharding, preview environments per PR, and blue/green production deploys.",
    tags:        ["CI/CD", "DevOps"],
    stack:       ["GitHub Actions", "Docker", "Vercel", "Playwright", "Jest", "Terraform"],
    outcomes:    [
      { value: "8 min",  label: "Deploy time (was 2hr)" },
      { value: "0",      label: "Rollback incidents"     },
      { value: "100%",   label: "Test coverage enforced" },
    ],
    accent:      "rgba(124,92,252,0.10)",
    accentColor: "#7c5cfc",
  },
  {
    id:          "opslayer-ai",
    title:       "OpsLayer — AI Ops Agent",
    description:
      "Built a LangChain-powered AI agent that triages support tickets, drafts responses, executes runbooks autonomously, and escalates P1 incidents with full context.",
    tags:        ["AI"],
    stack:       ["LangChain", "OpenAI", "Pinecone", "FastAPI", "Python", "Supabase"],
    outcomes:    [
      { value: "80%",    label: "Ops work automated"  },
      { value: "120hrs", label: "Saved per month"     },
      { value: "2",      label: "Roles reassigned"    },
    ],
    accent:      "rgba(79,125,255,0.09)",
    accentColor: "#4f7dff",
  },
  {
    id:          "meridian-health",
    title:       "Meridian Health — Platform Support",
    description:
      "Ongoing engineering support for a patient-facing HealthTech platform — 24/7 monitoring, incident response, HIPAA compliance reviews, and iterative feature work.",
    tags:        ["Maintenance"],
    stack:       ["Datadog", "PagerDuty", "Sentry", "AWS", "Next.js", "PostgreSQL"],
    outcomes:    [
      { value: "99.99%", label: "Uptime over 12 months" },
      { value: "0",      label: "P1 incidents"           },
      { value: "< 1hr",  label: "Incident response SLA"  },
    ],
    accent:      "rgba(0,212,170,0.08)",
    accentColor: "#00d4aa",
  },
  {
    id:          "vaultai-rag",
    title:       "VaultAI — RAG Knowledge Base",
    description:
      "Designed and shipped a production RAG pipeline over 200k+ internal documents with hybrid search, citation grounding, streaming responses, and eval harness.",
    tags:        ["AI"],
    stack:       ["OpenAI", "pgvector", "LlamaIndex", "FastAPI", "Next.js", "Supabase"],
    outcomes:    [
      { value: "92%",   label: "Answer accuracy (evals)" },
      { value: "200k+", label: "Docs indexed"             },
      { value: "1.2s",  label: "Avg. response latency"    },
    ],
    accent:      "rgba(124,92,252,0.10)",
    accentColor: "#7c5cfc",
  },
  {
    id:          "clearpath-mobile",
    title:       "ClearPath — Cross-Platform App",
    description:
      "Built iOS and Android apps in Flutter with offline-first architecture, real-time sync via Supabase Realtime, and a shared Dart business logic layer.",
    tags:        ["Web & Mobile"],
    stack:       ["Flutter", "Dart", "Supabase", "PostgreSQL", "GitHub Actions"],
    outcomes:    [
      { value: "4.8★",  label: "App Store rating" },
      { value: "2",     label: "Platforms shipped" },
      { value: "6 wks", label: "MVP timeline"      },
    ],
    accent:      "rgba(79,125,255,0.10)",
    accentColor: "#4f7dff",
  },
  {
    id:          "nucleus-platform",
    title:       "Nucleus — Internal Dev Platform",
    description:
      "Built an internal developer platform with self-service environment provisioning, secret management, cost dashboards, and a Backstage-powered service catalogue.",
    tags:        ["Cloud", "DevOps"],
    stack:       ["Backstage", "Terraform", "AWS", "GitHub Actions", "Vault", "React"],
    outcomes:    [
      { value: "70%",   label: "Faster env provisioning" },
      { value: "1 cmd", label: "New service bootstrap"    },
      { value: "40+",   label: "Engineers onboarded"      },
    ],
    accent:      "rgba(0,212,170,0.09)",
    accentColor: "#00d4aa",
  },
];

const ALL_TAGS: Tag[] = ["All", "DevOps", "AI", "Cloud", "Web & Mobile", "CI/CD", "Maintenance"];

/* ── Intersection observer hook ───────────────────────────────────────────── */
function useInView(threshold = 0.08) {
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

/* ── Stack pill ───────────────────────────────────────────────────────────── */
function StackPill({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px]
                 border border-white/[0.07] bg-white/[0.03] text-[#8b95a8]"
      style={{ fontFamily: "var(--font-dm-mono)" }}
    >
      {name}
    </span>
  );
}

/* ── Project card ─────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  seen,
}: {
  project: Project;
  index:   number;
  seen:    boolean;
}) {
  return (
    <article
      className={[
        "group relative flex flex-col rounded-2xl overflow-hidden",
        "bg-[rgba(13,17,23,0.80)] border border-white/[0.06]",
        "hover:border-[rgba(79,125,255,0.28)] hover:-translate-y-1",
        "hover:shadow-[0_0_40px_rgba(79,125,255,0.08)]",
        "transition-all duration-300",
        /* Featured spans 2 cols */
        project.featured ? "lg:col-span-2" : "",
        /* Entrance */
        "transition-[opacity,transform,border-color,box-shadow] duration-500 ease-out",
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Accent bar top */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent 60%)` }}
      />

      {/* Card body */}
      <div className={["flex flex-col gap-5 p-7 lg:p-8 flex-1",
        project.featured ? "lg:flex-row lg:gap-12 lg:items-start" : "",
      ].join(" ")}>

        {/* Main content */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1
                           rounded-full border"
                style={{
                  fontFamily:  "var(--font-dm-mono)",
                  color:       project.accentColor,
                  borderColor: `${project.accentColor}35`,
                  background:  project.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-[20px] font-[500] text-[#f1f5f9] leading-snug
                       group-hover:text-white transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-[14px] text-[#8b95a8] leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            {project.description}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((s) => <StackPill key={s} name={s} />)}
          </div>
        </div>

        {/* Outcomes */}
        <div
          className={[
            "flex gap-6",
            project.featured
              ? "lg:flex-col lg:gap-5 lg:min-w-[180px] lg:border-l lg:border-white/[0.06] lg:pl-10 lg:py-1"
              : "flex-row pt-2 border-t border-white/[0.05]",
          ].join(" ")}
        >
          {project.outcomes.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1 flex-1 lg:flex-none">
              <span
                className="text-[clamp(18px,2.5vw,26px)] font-[800] leading-none"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: `linear-gradient(90deg, ${project.accentColor}, #f1f5f9)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </span>
              <span
                className="text-[11px] text-[#3d4a5c] leading-snug"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div
        className="absolute top-5 right-5 opacity-0 group-hover:opacity-100
                   transition-opacity duration-200"
        aria-hidden="true"
      >
        <ArrowUpRight
          size={18}
          strokeWidth={1.75}
          style={{ color: project.accentColor }}
        />
      </div>
    </article>
  );
}

/* ── Filter bar ───────────────────────────────────────────────────────────── */
function FilterBar({
  active,
  onChange,
}: {
  active:   Tag;
  onChange: (tag: Tag) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2"
    >
      {ALL_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          aria-pressed={active === tag}
          className={[
            "px-4 py-2 rounded-full text-[12px] min-h-[36px]",
            "transition-all duration-200",
            "focus-visible:outline-2 focus-visible:outline-[#4f7dff]",
            "focus-visible:outline-offset-2",
            active === tag
              ? "bg-[#4f7dff]/15 border border-[#4f7dff]/40 text-[#4f7dff]"
              : "border border-white/[0.07] text-[#8b95a8] hover:border-white/20 hover:text-[#f1f5f9]",
          ].join(" ")}
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

/* ── ProjectGrid ──────────────────────────────────────────────────────────── */
export function ProjectGrid() {
  const [activeTag, setActiveTag] = useState<Tag>("All");
  const { ref: headerRef, seen: headerSeen } = useInView(0.2);
  const { ref: gridRef,   seen: gridSeen   } = useInView(0.05);

  const filtered = activeTag === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(activeTag));

  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="py-16 lg:py-20"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header + filter ─────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between
                     gap-6 mb-10"
        >
          <div>
            <p
              className={[
                "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-3",
                "transition-[opacity,transform] duration-500 ease-out",
                headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
            >
              / Our Work
            </p>
            <h2
              id="works-heading"
              className={[
                "text-[clamp(28px,4vw,40px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9]",
                "transition-[opacity,transform] duration-500 ease-out",
                headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
            >
              {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
              {activeTag !== "All" && (
                <span className="gradient-text"> · {activeTag}</span>
              )}
            </h2>
          </div>

          {/* Filter bar */}
          <div
            className={[
              "transition-[opacity,transform] duration-500 ease-out",
              headerSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: "160ms" }}
          >
            <FilterBar active={activeTag} onChange={setActiveTag} />
          </div>
        </div>

        {/* ── Grid ────────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              seen={gridSeen}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p
              className="text-[15px] text-[#3d4a5c]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              No projects match this filter yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
