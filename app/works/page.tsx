import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected projects — real outcomes, modern stacks.",
};

// ── Works / Portfolio Page ───────────────────────────────────────────────────
// Sections: WorksHero → ProjectGrid (filterable by tag) → CTA

export default function WorksPage() {
  return (
    <div className="pt-16">
      {/* TODO: WorksHero    — page hero */}
      {/* TODO: ProjectGrid  — filterable portfolio grid with stack tags */}
      {/* TODO: CTA          — shared CTA section */}
    </div>
  );
}
