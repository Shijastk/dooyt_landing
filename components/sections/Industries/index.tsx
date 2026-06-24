"use client";

import { fetchIndustries } from "@/lib/api-client";
import { useFetch } from "@/lib/use-fetch";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { IndustriesSkeleton } from "@/components/ui/Skeletons";
import { IndustriesGrid } from "./IndustriesGrid";

export function Industries() {
  const { data, loading, error, refetch } = useFetch(() => fetchIndustries());

  return (
    <section id="industries" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal direction="zoom">
          <SectionHeading
            eyebrow="Industries"
            title="Built for the way your industry works"
            subtitle="Dooyt adapts to your sector with workflows tuned to how each industry actually operates."
          />
        </Reveal>

        <div className="mt-12">
          {loading ? (
            <IndustriesSkeleton />
          ) : error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : (data?.length ?? 0) === 0 ? (
            <EmptyState message="No industries available." />
          ) : (
            <IndustriesGrid industries={data!} />
          )}
        </div>
      </div>
    </section>
  );
}
