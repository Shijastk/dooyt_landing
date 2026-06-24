"use client";

import { useState } from "react";
import { fetchFaqs } from "@/lib/api-client";
import { useFetch } from "@/lib/use-fetch";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { FaqSkeleton } from "@/components/ui/Skeletons";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const { data, loading, error, refetch } = useFetch(() => fetchFaqs());
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal
          as="h2"
          className="max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Frequently Asked Questions (FAQ)
        </Reveal>

        <div className="mt-10">
          {loading ? (
            <FaqSkeleton />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (data?.length ?? 0) === 0 ? (
            <EmptyState message="No FAQs available." />
          ) : (
            <ul className="space-y-4">
              {data!.map((faq, i) => {
                const open = openId === faq.id;
                return (
                  <Reveal
                    as="li"
                    key={faq.id}
                    delay={Math.min(i, 6) * 70}
                    className="overflow-hidden rounded-2xl bg-surface-2"
                  >
                    <button
                      onClick={() => setOpenId(open ? null : faq.id)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base font-semibold text-ink">
                        {faq.question}
                      </span>
                      <span
                        className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 ease-in-out"
                        aria-hidden
                      >
                        {/* Horizontal bar (always visible) */}
                        <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                        {/* Vertical bar: rotates flat to morph + into - */}
                        <span
                          className={[
                            "absolute h-0.5 w-3.5 rounded-full bg-current transition-transform duration-300 ease-in-out",
                            open ? "rotate-0" : "rotate-90",
                          ].join(" ")}
                        />
                      </span>
                    </button>
                    <div
                      className={[
                        "grid transition-all duration-300 ease-in-out",
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
