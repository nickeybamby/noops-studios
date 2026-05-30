import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { FAQ }         from "@/components/sections/contact/FAQ";
import { CTA }         from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with NoOps Studios. Tell us what you're building — we'll respond within 24 hours with a clear plan.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <FAQ />
      <CTA />
    </>
  );
}
