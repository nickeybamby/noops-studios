"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function AboutHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const anim = "opacity-0 anim-fade-up";

  return (
    <section
      aria-label="About page hero"
      className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background orbs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full anim-mesh-drift"
          style={{
            width: "55vw", height: "55vw", maxWidth: 680, maxHeight: 680,
            top: "-20%", right: "-12%",
            background: "radial-gradient(circle, rgba(79,125,255,0.08) 0%, transparent 70%)",
            animationDuration: "16s",
          }}
        />
        <div
          className="absolute rounded-full anim-mesh-drift"
          style={{
            width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500,
            bottom: "-10%", left: "-8%",
            background: "radial-gradient(circle, rgba(124,92,252,0.07) 0%, transparent 70%)",
            animationDuration: "20s", animationDelay: "-7s",
          }}
        />
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className={visible ? anim : "opacity-0"} style={{ animationDelay: "0ms" }}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7
                         border border-[#00d4aa]/30 bg-[#00d4aa]/10
                         text-[#00d4aa] text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              <Users size={11} strokeWidth={2.5} aria-hidden="true" />
              Who We Are
            </span>
          </div>

          {/* H1 */}
          <h1
            className={`text-[clamp(40px,7vw,76px)] font-[800] leading-[1.05]
                        tracking-tight text-[#f1f5f9] mb-6
                        ${visible ? anim : "opacity-0"}`}
            style={{ fontFamily: "var(--font-syne)", animationDelay: "80ms" }}
          >
            Built by Engineers,
            <br />
            <span className="gradient-text">For Engineers.</span>
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
            NoOps Studios is a small, elite team of engineers who&apos;ve
            shipped production systems at scale. We don&apos;t do strategy
            decks — we do working software, fast.
          </p>
        </div>
      </div>
    </section>
  );
}
