import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end technical execution — from cloud architecture to AI pipelines.",
};

// ── Services Page ─────────────────────────────────────────────────────────────
// Expanded services with per-service case studies.
// Sections: ServicesHero → ServiceDetail (×5) → CTA

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* TODO: ServicesHero   — full page hero for /services */}
      {/* TODO: ServiceDetail  — expanded card per service with case study */}
      {/* TODO: CTA            — shared CTA section */}
    </div>
  );
}
