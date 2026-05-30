import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Mission }   from "@/components/sections/about/Mission";
import { Team }      from "@/components/sections/about/Team";
import { Stats }     from "@/components/sections/about/Stats";
import { CTA }       from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "NoOps Studios is a small, elite team of engineers who've shipped production systems at scale. Built by engineers, for engineers.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <Team />
      <Stats />
      <CTA />
    </>
  );
}
