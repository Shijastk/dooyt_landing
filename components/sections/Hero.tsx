import Image from "next/image";
import { ArrowRight, Flame, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { LiquidGlassButton, LiquidGlassButtonLink } from "../ui/LiquidGlassButton";
import { IoMdCall } from "react-icons/io";
import { hero } from "@/assets/images";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="container-page relative pt-10 text-center sm:pt-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          {/* Eyebrow badge */}
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-lg bg-[#faf6f4] px-4 py-2 text-sm [animation-delay:0ms]">
            <Flame className="h-4 w-4 fill-brand-500 text-brand-500" aria-hidden />
            <span className="text-brand-gradient">Best ERP Software</span>
          </span>

          {/* Headline */}
          <h1 className="animate-fade-up text-4xl font-medium  leading-[1.2] tracking-tighter text-ink sm:text-5xl md:text-7xl [animation-delay:90ms]">
            Accuracy. Productivity.
            <br />
            <span className="text-brand-500">Business Wins</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up mx-auto max-w-2xl text-lg leading-relaxed text-muted [animation-delay:180ms]">
            Instead of using many tools, just choose one to control your entire
            business effortlessly. Dooyt, the best ERP software that makes
            smarter decisions and drives business growth.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center [animation-delay:270ms]">
            <LiquidGlassButtonLink
              href="/contact?type=demo"
              size="sm"
              variant="orange"
              className="w-full sm:w-auto"
            >
              <IoMdCall className="h-6 w-5" aria-hidden />
              Request A Demo
            </LiquidGlassButtonLink>
            <LiquidGlassButton size="sm" variant="light" className="w-full sm:w-auto">
              Try Free for 30 Days
              <ArrowRight className="h-4 w-4" aria-hidden />
            </LiquidGlassButton>
          </div>

          {/* Rating */}
          <div className="animate-fade-up mt-6 flex items-center justify-center gap-2 [animation-delay:360ms]">
            <StarRating rating={4.5} />
            <span className="text-xs text-muted">(Rating 4.5 star)</span>
          </div>
        </div>
      </div>

      {/* Dashboard preview — full width */}
      <div className="animate-fade-up w-full [animation-delay:440ms]">
        <Image
          src={hero}
          alt="Dooyt ERP dashboard preview"
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
