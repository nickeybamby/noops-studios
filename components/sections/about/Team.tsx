"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

interface TeamMember {
  name:      string;
  role:      string;
  bio:       string;
  initials:  string;
  gradient:  string;
  skills:    string[];
  prev:      string;   // previously at
}

const TEAM: TeamMember[] = [
  {
    name:     "Jordan Ellis",
    role:     "Founder & Lead Architect",
    bio:      "10 years building distributed systems at scale. Previously led platform engineering at a Series C fintech. Obsessed with infrastructure that just works.",
    initials: "JE",
    gradient: "linear-gradient(135deg, #4f7dff, #7c5cfc)",
    skills:   ["Kubernetes", "Terraform", "Go", "AWS"],
    prev:     "ex-Stripe",
  },
  {
    name:     "Priya Nair",
    role:     "Head of AI Engineering",
    bio:      "ML engineer turned AI systems architect. Shipped RAG pipelines and LLM agents to production at three startups. Believes evals are the most underrated engineering practice.",
    initials: "PN",
    gradient: "linear-gradient(135deg, #7c5cfc, #00d4aa)",
    skills:   ["LangChain", "Python", "OpenAI", "Pinecone"],
    prev:     "ex-Cohere",
  },
  {
    name:     "Marcus Webb",
    role:     "Senior Full-Stack Engineer",
    bio:      "React and Node.js specialist with a thing for performance. Has rebuilt three legacy systems in Next.js without a single user complaint. Core Web Vitals are personal.",
    initials: "MW",
    gradient: "linear-gradient(135deg, #00d4aa, #4f7dff)",
    skills:   ["Next.js", "TypeScript", "tRPC", "PostgreSQL"],
    prev:     "ex-Vercel",
  },
  {
    name:     "Sasha Kim",
    role:     "DevOps & Platform Engineer",
    bio:      "Lives in the terminal. Cut deploy times by 80% at every company they've worked at. CI/CD philosophy: if it's not automated, it's a liability.",
    initials: "SK",
    gradient: "linear-gradient(135deg, #4f7dff, #00d4aa)",
    skills:   ["GitHub Actions", "Docker", "ArgoCD", "Datadog"],
    prev:     "ex-GitHub",
  },
];

function TeamCard({
  member,
  index,
  seen,
}: {
  member: TeamMember;
  index:  number;
  seen:   boolean;
}) {
  return (
    <article
      className={[
        "group relative flex flex-col gap-5 p-7 lg:p-8 rounded-2xl",
        "bg-[rgba(13,17,23,0.70)] border border-white/[0.06]",
        "hover:border-[rgba(79,125,255,0.28)] hover:-translate-y-1",
        "hover:shadow-[0_0_35px_rgba(79,125,255,0.08)]",
        "transition-all duration-300",
        "transition-[opacity,transform] duration-500 ease-out",
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Avatar + name row */}
      <div className="flex items-center gap-4">
        {/* Gradient avatar */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center
                     text-[14px] font-[500] text-white shrink-0 select-none"
          style={{ background: member.gradient, fontFamily: "var(--font-dm-sans)" }}
          aria-label={`Avatar for ${member.name}`}
        >
          {member.initials}
        </div>

        <div className="flex flex-col gap-0.5 min-w-0">
          <span
            className="text-[15px] font-[500] text-[#f1f5f9] leading-none"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {member.name}
          </span>
          <span
            className="text-[11px] text-[#3d4a5c] uppercase tracking-[0.15em] leading-none mt-0.5"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            {member.role}
          </span>
        </div>
      </div>

      {/* Prev company badge */}
      <span
        className="w-fit text-[10px] uppercase tracking-[0.18em] px-2.5 py-1
                   rounded-full border border-white/[0.07] bg-white/[0.03] text-[#3d4a5c]"
        style={{ fontFamily: "var(--font-dm-mono)" }}
      >
        {member.prev}
      </span>

      {/* Bio */}
      <p
        className="text-[14px] text-[#8b95a8] leading-relaxed flex-1"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        {member.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/[0.05]">
        {member.skills.map((skill) => (
          <span
            key={skill}
            className="text-[10.5px] px-2.5 py-0.5 rounded-full
                       border border-white/[0.07] bg-white/[0.03] text-[#8b95a8]"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Team() {
  const { ref, seen } = useInView(0.08);

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="py-20 lg:py-28"
      style={{ background: "var(--bg-surface)" }}
    >
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: "var(--border-subtle)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28">
        <div ref={ref}>
          {/* Header */}
          <div className="mb-12 lg:mb-14 max-w-xl">
            <p
              className={[
                "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
            >
              / The Team
            </p>
            <h2
              id="team-heading"
              className={[
                "text-[clamp(28px,4vw,44px)] font-[800] leading-[1.1] tracking-tight text-[#f1f5f9] mb-4",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
            >
              Senior engineers,{" "}
              <span className="gradient-text">no filler</span>
            </h2>
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
              Everyone who touches your project has shipped production systems
              at scale. You&apos;ll never be handed off to a junior.
            </p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} seen={seen} />
            ))}
          </div>

          {/* Hiring nudge */}
          <div
            className={[
              "mt-10 flex items-center justify-between gap-6 p-6 rounded-2xl",
              "border border-white/[0.06] bg-white/[0.02]",
              "transition-[opacity,transform] duration-500 ease-out",
              seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: "440ms" }}
          >
            <div>
              <p
                className="text-[15px] font-[500] text-[#f1f5f9] mb-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                We&apos;re selectively hiring
              </p>
              <p
                className="text-[13px] text-[#8b95a8]"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                Senior engineers who care about craft and move fast. Remote-first.
              </p>
            </div>
            <a
              href="mailto:careers@noops.studio"
              className="shrink-0 px-5 py-2.5 rounded-full text-[13px] font-[500]
                         border border-white/10 text-[#f1f5f9]/70
                         hover:border-white/25 hover:text-[#f1f5f9]
                         transition-all duration-200 min-h-[44px] flex items-center
                         focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                         focus-visible:outline-offset-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              careers@noops.studio →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
