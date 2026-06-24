import type { Industry } from "@/types";

export function IndustryCardText({ industry }: { industry: Industry }) {
  return (
    <div>
      <h3 className="text-xl font-semibold tracking-tight text-ink">
        {industry.name}
      </h3>
      <p className="mt-3 text-md leading-relaxed text-muted">
        {industry.description}
      </p>
    </div>
  );
}
