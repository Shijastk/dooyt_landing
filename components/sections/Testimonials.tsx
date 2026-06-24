"use client";

import { fetchTestimonials } from "@/lib/api-client";
import { useFetch } from "@/lib/use-fetch";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { TestimonialsSkeleton } from "@/components/ui/Skeletons";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const { data, loading, error, refetch } = useFetch(() => fetchTestimonials(1, 10));

  const items = data?.data ?? [];
  const count = items.length;

  return (
    <section id="testimonials" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Proven Results. Real Feedback."
            subtitle="Here's what our customers experienced."
          />
        </Reveal>

        <div className="mt-12">
          {loading ? (
            <TestimonialsSkeleton />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : count === 0 ? (
            <EmptyState message="No testimonials yet." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t, i) => (
                <Reveal
                  as="figure"
                  key={t.id}
                  delay={Math.min(i, 5) * 80}
                  className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <StarRating rating={t.rating} />
                    <span className="text-sm font-medium text-ink">
                      {t.rating.toFixed(1)}
                    </span>
                  </div>

                  <blockquote className="mt-4 leading-relaxed text-ink">
                    {t.quote}
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-sm font-semibold text-brand-600">
                      {initials(t.name)}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold text-ink">{t.name}</span>
                      <span className="text-sm text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
