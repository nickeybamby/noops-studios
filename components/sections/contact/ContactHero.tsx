"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

export function ContactHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const anim = "opacity-0 anim-fade-up";

  return (
    <section
      aria-label="Contact page hero"
      className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background orbs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full anim-mesh-drift"
          style={{
            width: "50vw", height: "50vw", maxWidth: 620, maxHeight: 620,
            top: "-25%", right: "-8%",
            background: "radial-gradient(circle, rgba(79,125,255,0.09) 0%, transparent 70%)",
            animationDuration: "15s",
          }}
        />
        <div
          className="absolute rounded-full anim-mesh-drift"
          style={{
            width: "35vw", height: "35vw", maxWidth: 440, maxHeight: 440,
            bottom: "-5%", left: "-5%",
            background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
            animationDuration: "20s", animationDelay: "-8s",
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
        <div className="max-w-2xl">
          {/* Badge */}
          <div className={visible ? anim : "opacity-0"} style={{ animationDelay: "0ms" }}>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7
                         border border-[#4f7dff]/30 bg-[#4f7dff]/10
                         text-[#4f7dff] text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              <MessageSquare size={11} strokeWidth={2.5} aria-hidden="true" />
              Get In Touch
            </span>
          </div>

          {/* H1 */}
          <h1
            className={`text-[clamp(40px,7vw,72px)] font-[800] leading-[1.05]
                        tracking-tight text-[#f1f5f9] mb-6
                        ${visible ? anim : "opacity-0"}`}
            style={{ fontFamily: "var(--font-syne)", animationDelay: "80ms" }}
          >
            Let&apos;s Build{" "}
            <span className="gradient-text">Something</span>
            <br />That Scales.
          </h1>

          {/* Subheadline */}
          <p
            className={`text-[18px] text-[#8b95a8] leading-relaxed max-w-lg
                        ${visible ? anim : "opacity-0"}`}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 400,
              animationDelay: "160ms",
            }}
          >
            Tell us about your project. We&apos;ll respond within 24 hours
            with a clear plan, not a sales pitch.
          </p>
        </div>
      </div>
    </section>
  );
}
