import { IndustryImage } from "./IndustryImage";
import { IndustryCardText } from "./IndustryCardText";
import type { Industry } from "@/types";

export function IndustryCard({
  industry,
  imageTop,
  tall,
}: {
  industry: Industry;
  imageTop: boolean;
  tall?: boolean;
}) {
  const image = (
    <IndustryImage
      industry={industry}
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className={`w-full ${tall ? "h-46" : "h-44"} ${imageTop ? "" : "mt-auto"}`}
    />
  );

  return (
    <article className="flex grow flex-col gap-5 rounded-2xl bg-[#fffbf7] p-6 transition-colors hover:border-brand-300 shadow-sm">
      {imageTop ? (
        <>
          {image}
          <IndustryCardText industry={industry} />
        </>
      ) : (
        <>
          <IndustryCardText industry={industry} />
          {image}
        </>
      )}
    </article>
  );
}
