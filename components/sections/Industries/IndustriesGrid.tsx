import { IndustryCard } from "./IndustryCard";
import { IndustryHorizontalCard } from "./IndustryHorizontalCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Industry } from "@/types";

export function IndustriesGrid({ industries }: { industries: Industry[] }) {
  const grid = industries.slice(0, 6);
  const balance = industries.slice(6);

  const columns = [0, 1, 2].map((col) =>
    grid
      .map((industry, index) => ({ industry, index }))
      .filter(({ index }) => index % 3 === col),
  );

  return (
    <>
      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((column, col) => (
          <div
            key={col}
            className={`flex flex-col gap-5 ${col === 1 ? "" : "lg:pt-12"}`}
          >
            {column.map(({ industry, index }) => (
              <Reveal
                key={industry.id}
                delay={index * 70}
                className="flex grow flex-col"
              >
                <IndustryCard
                  industry={industry}
                  imageTop={index % 2 === 1}
                  tall={index === 1}
                />
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      {balance.length > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {balance.map((industry, i) => (
            <Reveal key={industry.id} delay={i * 70}>
              <IndustryHorizontalCard industry={industry} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
