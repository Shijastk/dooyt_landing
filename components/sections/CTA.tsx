import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import phoneInHand from "@/assets/images/phoneinhand.png";

export function CTA() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page">
        {/* Wrapper holds the gradient card plus the phone that overflows its top */}
        <div className="relative pt-20 lg:pt-24">
          {/* Gradient card */}
          <div className="bg-brand-gradient relative overflow-hidden rounded-3xl px-8 pb-16 pt-12 sm:px-12 lg:px-16 lg:pb-20 lg:pt-16">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
              aria-hidden
            />

            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Copy + CTA */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl">
                  Make Every Day A Win
                  <br />
                  with Dooyt
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/90 lg:mx-0">
                  Are you looking to boost your business productivity? Replace
                  all those multiple apps with a single powerful solution, Dooyt.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start">
                  <Link
                    href="/contact?type=demo"
                    className="group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-base font-medium text-ink shadow-sm transition-colors hover:bg-brand-50"
                  >
                    Schedule a demo
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-brand-400">
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Phone — in-flow on mobile, the desktop copy is absolutely
                  positioned below so it can overflow the card's top edge */}
              <div className="lg:hidden">
                <Image
                  src={phoneInHand}
                  alt="Dooyt mobile app shown in hand"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="mx-auto h-auto w-[260px] sm:w-[300px]"
                />
              </div>
            </div>
          </div>

          {/* Phone overflowing the top edge on desktop */}
          <Image
            src={phoneInHand}
            alt="Dooyt mobile app shown in hand"
            placeholder="blur"
            sizes="420px"
            className="pointer-events-none absolute bottom-0 right-6 hidden h-auto w-[380px] lg:block xl:right-16 xl:w-[450px]"
          />

          {/* White gradient fading the card (and the phone's base) into the page */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-3xl bg-gradient-to-t from-white to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
