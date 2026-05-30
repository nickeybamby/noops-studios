"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────────── */
interface FAQItem {
  question: string;
  answer:   string;
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const FAQS: FAQItem[] = [
  {
    question: "How quickly can you start?",
    answer:
      "Typically within one week of signing off on scope. We keep our client roster intentionally small so we can move fast without the usual agency lag.",
  },
  {
    question: "Do you work with early-stage startups or only larger companies?",
    answer:
      "Both. We work with funded startups who need to move fast and don't have the engineering team yet, and with established companies who need specialist skills for a specific project or overhaul.",
  },
  {
    question: "What does an engagement actually look like?",
    answer:
      "We start with a discovery call to understand your stack and goals. From there we write a clear scope with timeline and milestones — no surprises. You'll have a dedicated Slack channel, weekly syncs, and full visibility into everything we're building.",
  },
  {
    question: "Do you offer fixed-price projects or time and materials?",
    answer:
      "Both, depending on the nature of the work. Well-defined projects (e.g. CI/CD overhaul, infrastructure migration) are typically fixed-price. Ongoing work (maintenance, AI automation, product development) is usually a monthly retainer.",
  },
  {
    question: "Will I work with senior engineers or get handed off to juniors?",
    answer:
      "Every person who touches your project is a senior engineer. We don't have a pyramid of project managers and junior devs. You'll know who's working on your project by name.",
  },
  {
    question: "What if I'm not happy with the work?",
    answer:
      "We iterate until it's right — that's in our agreements. We've never had a client relationship end badly, because we communicate early and often. If something isn't tracking, we fix it before it becomes a problem.",
  },
  {
    question: "Do you do ongoing maintenance after a project?",
    answer:
      "Yes. We offer a Maintenance & Support retainer that covers 24/7 monitoring, incident response, security updates, and continuous improvement. Many clients stay with us long-term after their initial project.",
  },
  {
    question: "Can you work with our existing engineering team?",
    answer:
      "Absolutely — and we prefer it. The best engagements are when we embed alongside your team, transfer knowledge, and make sure everything we build is owned and understood by your engineers when we're done.",
  },
];

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

/* ── Accordion item ───────────────────────────────────────────────────────── */
function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  seen,
}: {
  item:     FAQItem;
  index:    number;
  isOpen:   boolean;
  onToggle: () => void;
  seen:     boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const id         = `faq-answer-${index}`;
  const triggerId  = `faq-trigger-${index}`;

  return (
    <div
      className={[
        "border-b border-white/[0.06] last:border-b-0",
        "transition-[opacity,transform] duration-500 ease-out",
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Trigger */}
      <button
        id={triggerId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className="flex items-center justify-between w-full py-5 text-left gap-4
                   focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                   focus-visible:outline-offset-2 rounded-sm group min-h-[44px]"
      >
        <span
          className={[
            "text-[15px] leading-snug transition-colors duration-200",
            isOpen ? "text-[#f1f5f9]" : "text-[#8b95a8] group-hover:text-[#f1f5f9]",
          ].join(" ")}
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
        >
          {item.question}
        </span>
        <span
          className={[
            "shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
            "border transition-all duration-200",
            isOpen
              ? "border-[#4f7dff]/50 bg-[#4f7dff]/15 text-[#4f7dff]"
              : "border-white/[0.10] text-[#3d4a5c] group-hover:border-white/20 group-hover:text-[#8b95a8]",
          ].join(" ")}
          aria-hidden="true"
        >
          {isOpen
            ? <Minus size={12} strokeWidth={2} />
            : <Plus  size={12} strokeWidth={2} />
          }
        </span>
      </button>

      {/* Answer — animated height */}
      <div
        id={id}
        role="region"
        aria-labelledby={triggerId}
        ref={contentRef}
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 400}px` : "0px",
          opacity:   isOpen ? 1 : 0,
        }}
      >
        <p
          className="pb-5 text-[14px] text-[#8b95a8] leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

/* ── FAQ Section ──────────────────────────────────────────────────────────── */
export function FAQ() {
  const { ref, seen }     = useInView(0.08);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 lg:py-28"
      style={{ background: "var(--bg-surface)" }}
    >
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: "var(--border-subtle)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20"
        >
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p
              className={[
                "text-[11px] uppercase tracking-[0.2em] text-[#00d4aa] mb-4",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ fontFamily: "var(--font-dm-mono)", transitionDelay: "0ms" }}
            >
              / FAQ
            </p>
            <h2
              id="faq-heading"
              className={[
                "text-[clamp(26px,3.5vw,38px)] font-[800] leading-[1.1]",
                "tracking-tight text-[#f1f5f9] mb-5",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
            >
              Common{" "}
              <span className="gradient-text">Questions</span>
            </h2>
            <p
              className={[
                "text-[14px] text-[#8b95a8] leading-relaxed mb-7",
                "transition-[opacity,transform] duration-500 ease-out",
                seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 400,
                transitionDelay: "160ms",
              }}
            >
              Can&apos;t find your answer? Email us directly at{" "}
              <a
                href="mailto:hello@noops.studio"
                className="text-[#4f7dff] hover:text-[#7c5cfc] transition-colors duration-200
                           focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                           focus-visible:outline-offset-2 rounded-sm"
              >
                hello@noops.studio
              </a>
            </p>
          </div>

          {/* Right — accordion */}
          <div
            className={[
              "divide-y divide-white/[0.00]",
              "transition-[opacity] duration-500 ease-out",
              seen ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "200ms" }}
          >
            {FAQS.map((item, i) => (
              <AccordionItem
                key={item.question}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                seen={seen}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
