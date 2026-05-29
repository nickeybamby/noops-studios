import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with NoOps Studios. We respond within 24 hours.",
};

// ── Contact Page ─────────────────────────────────────────────────────────────
// Sections: ContactHero → ContactForm → AvailabilityStatus → FAQ

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* TODO: ContactHero        — page hero */}
      {/* TODO: ContactForm        — full contact form */}
      {/* TODO: AvailabilityStatus — current availability indicator */}
      {/* TODO: FAQ                — accordion FAQ */}
    </div>
  );
}
