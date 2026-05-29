import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Team, mission, values, and the stats behind NoOps Studios.",
};

// ── About Page ───────────────────────────────────────────────────────────────
// Sections: AboutHero → Mission → Team → Stats → Values → CTA

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* TODO: AboutHero  — page hero */}
      {/* TODO: Mission    — mission statement */}
      {/* TODO: Team       — team member cards */}
      {/* TODO: Stats      — clients / deploys / uptime counters */}
      {/* TODO: Values     — company values */}
      {/* TODO: CTA        — shared CTA section */}
    </div>
  );
}
