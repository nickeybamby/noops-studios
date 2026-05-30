import type { Metadata } from "next";
import { WorksHero }   from "@/components/sections/works/WorksHero";
import { ProjectGrid } from "@/components/sections/works/ProjectGrid";
import { CTA }         from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected projects across DevOps, AI, cloud infrastructure, and product engineering. Real projects, real outcomes.",
};

export default function WorksPage() {
  return (
    <>
      <WorksHero />
      <ProjectGrid />
      <CTA />
    </>
  );
}
