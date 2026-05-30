import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServiceDetail } from "@/components/sections/services/ServiceDetail";
import { CTA }          from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end technical execution — web & mobile development, cloud infrastructure, CI/CD automation, AI solutions, and ongoing maintenance.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceDetail />
      <CTA />
    </>
  );
}
