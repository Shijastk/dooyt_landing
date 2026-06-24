import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { ContactForm } from "@/components/sections/ContactForm";
import { DemoRequestForm } from "@/components/sections/DemoForm";

/*
  /contact serves two intents from a single route:
    - default      → general contact form (ContactForm)
    - ?type=demo   → "Request a Demo" form (DemoRequestForm), whose plan options
                     come from /api/plans and which posts to /api/demo-requests.
  Both the navbar "Contact Us" link and every "Request a Demo" / "Schedule a
  demo" / "Select plan" CTA land here; the `type` query param swaps the content.
  An optional `?plan=<id>` preselects a plan in the demo form.
*/

// searchParams is a promise in Next 16 — awaited in both the page and metadata.
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const isDemo = firstParam((await searchParams).type) === "demo";
  return isDemo
    ? {
        title: "Request a Demo — Dooyt",
        description:
          "Book a personalized Dooyt demo. Tell us about your business and we'll tailor a walkthrough and pricing to your team.",
      }
    : {
        title: "Contact Us — Dooyt",
        description:
          "Get in touch with the Dooyt team. Questions about pricing, product support, or partnerships — we'll reply within one business day.",
      };
}

const CHANNELS = [
  { label: "Email", value: "hello@dooyt.com", href: "mailto:hello@dooyt.com" },
  { label: "Phone", value: "+91 90000 00000", href: "tel:+919000000000" },
  { label: "Office", value: "Dooyt HQ, Bengaluru, India", href: null },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const isDemo = firstParam(params.type) === "demo";
  const initialPlan = firstParam(params.plan) ?? "";

  return (
    <div id="top">
      <Navbar />
      <main>
        <section id="contact" className="scroll-mt-20 bg-white py-16 sm:py-20">
          <div className="container-page">
            {/* Page intro — copy switches with intent */}
            <Reveal>
              {isDemo ? (
                <SectionHeading
                  eyebrow="Request a Demo"
                  title="See Dooyt in action"
                  subtitle="Tell us a little about your business and we'll set up a personalized demo — tailored to your team size and the modules you care about."
                />
              ) : (
                <SectionHeading
                  eyebrow="Contact Us"
                  title="Let's talk about your business"
                  subtitle="Have a question or want to see what Dooyt can do for your team? Send us a message and we'll get back to you within one business day."
                />
              )}
            </Reveal>

            <div className="mt-12 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-12">
              {/* Contact channels — warm brand panel, echoing the CTA section */}
              <Reveal direction="left" className="h-full">
                <div className="relative flex h-full flex-col lg:pt-2">
                  <div>
                    <p className="text-sm font-medium text-brand-600">
                      Reach us directly
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
                      A real human will get
                      <br className="hidden sm:block" /> back to you.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      No bots, no ticket black holes — just the team that builds
                      Dooyt, ready to help.
                    </p>
                  </div>

                  {/* Channels — text-based rows: label left, value right, hairline rules */}
                  <ul className="mt-8 border-t border-line">
                    {CHANNELS.map(({ label, value, href }) => {
                      const inner = (
                        <>
                          <span className="text-xs font-medium uppercase tracking-wider text-muted">
                            {label}
                          </span>
                          <span className="flex items-center gap-1.5 text-right text-base font-medium text-ink transition-colors group-hover:text-brand-600 sm:text-lg">
                            {value}
                            {href ? (
                              <ArrowUpRight
                                className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600"
                                aria-hidden
                              />
                            ) : null}
                          </span>
                        </>
                      );
                      return (
                        <li key={label} className="border-b border-line">
                          {href ? (
                            <a
                              href={href}
                              className="group flex items-baseline justify-between gap-4 py-4"
                            >
                              {inner}
                            </a>
                          ) : (
                            <div className="group flex items-baseline justify-between gap-4 py-4">
                              {inner}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Hours + social proof */}
                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="inline-flex items-center gap-2 text-sm text-muted">
                      <Clock className="h-4 w-4" aria-hidden />
                      Mon–Fri, 9am–6pm IST
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <StarRating rating={4.5} />
                      <span className="text-xs text-muted">
                        Loved by 2,000+ teams
                      </span>
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Form — demo request or general contact */}
              <Reveal direction="right" className="h-full">
                {isDemo ? (
                  <DemoRequestForm initialPlan={initialPlan} />
                ) : (
                  <ContactForm />
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Reveal direction="fade">
        <Footer />
      </Reveal>
    </div>
  );
}
