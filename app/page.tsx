import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <TechStack />
      {/* Testimonials — coming */}
      {/* CTA        — coming */}
    </>
  );
}
