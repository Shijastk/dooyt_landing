import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { Modules } from "@/components/sections/Modules";
import { FeaturedCards } from "@/components/sections/FeaturedCards";
import { Industries } from "@/components/sections/Industries";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <Reveal>
          <Modules />
        </Reveal>
        <FeaturedCards />
        <Industries />
        <Reveal direction="zoom" amount={0.05}>
          <CTA />
        </Reveal>
        <Reveal>
          <Pricing />
        </Reveal>
        <Testimonials />
        <FAQ />
      </main>
      <Reveal direction="fade">
        <Footer />
      </Reveal>
    </div>
  );
}
