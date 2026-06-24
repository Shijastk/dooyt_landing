import { IndustryImage } from "./IndustryImage";
import { IndustryCardText } from "./IndustryCardText";
import type { Industry } from "@/types";

export function IndustryHorizontalCard({ industry }: { industry: Industry }) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl bg-[#fffbf7] p-4 transition-colors hover:border-brand-300 sm:flex-row sm:items-center sm:p-5 shadow-sm">
      <IndustryImage
        industry={industry}
        sizes="(min-width: 640px) 16rem, 100vw"
        className="h-44 w-full sm:h-28 sm:w-64"
      />
      <IndustryCardText industry={industry} />
    </article>
  );
}
