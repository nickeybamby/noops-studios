import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <TechStack />
      <Testimonials />
      <CTA />
    </>
  );
}
