"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

/* ── Mesh background (lighter than homepage hero) ─────────────────────────── */
function MeshBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          top: "-30%", left: "-10%",
          background: "radial-gradient(circle, rgba(79,125,255,0.09) 0%, transparent 70%)",
          animationDuration: "16s",
        }}
      />
      <div
        className="absolute rounded-full anim-mesh-drift"
        style={{
          width: "45vw", height: "45vw", maxWidth: 560, maxHeight: 560,
          top: "-10%", right: "-15%",
          background: "radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)",
          animationDuration: "20s", animationDelay: "-8s",
        }}
      />
    </div>
  );
}

/* ── ServicesHero ─────────────────────────────────────────────────────────── */
export function ServicesHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const anim = "opacity-0 anim-fade-up";

  return (
    <section
      aria-label="Services page hero"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <MeshBackground />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">

          {/* Badge */}
          <div
            className={visible ? anim : "opacity-0"}
            style={{ animationDelay: "0ms" }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7
                         border border-[#4f7dff]/30 bg-[#4f7dff]/10
                         text-[#4f7dff] text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              <Zap size={11} strokeWidth={2.5} aria-hidden="true" />
              What We Do
            </span>
          </div>

          {/* H1 */}
          <h1
            className={`text-[clamp(40px,7vw,76px)] font-[800] leading-[1.05]
                        tracking-tight text-[#f1f5f9] mb-6
                        ${visible ? anim : "opacity-0"}`}
            style={{ fontFamily: "var(--font-syne)", animationDelay: "80ms" }}
          >
            End-to-End{" "}
            <span className="gradient-text">Technical</span>
            <br />Execution
          </h1>

          {/* Subheadline */}
          <p
            className={`text-[18px] text-[#8b95a8] leading-relaxed max-w-xl
                        ${visible ? anim : "opacity-0"}`}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 400,
              animationDelay: "160ms",
            }}
          >
            We don&apos;t hand off deliverables — we embed into your workflow
            and own outcomes. From first commit to production, we ship systems
            that scale.
          </p>

          {/* Quick stat strip */}
          <div
            className={`flex flex-wrap gap-x-10 gap-y-4 mt-10
                        ${visible ? anim : "opacity-0"}`}
            style={{ animationDelay: "260ms" }}
          >
            {[
              { value: "5",     label: "Core services"      },
              { value: "50+",   label: "Projects delivered" },
              { value: "99.9%", label: "Avg. uptime SLA"    },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-[28px] font-[800] leading-none gradient-text"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {value}
                </span>
                <span
                  className="text-[12px] text-[#3d4a5c] uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
