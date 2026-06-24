import Image from "next/image";
import { industryImageFor } from "@/assets/images";
import type { Industry } from "@/types";

export function IndustryImage({
  industry,
  className,
  sizes,
}: {
  industry: Industry;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl ${className ?? ""}`}
    >
      <Image
        src={industryImageFor(industry.image)}
        alt={industry.name}
        placeholder="blur"
        className="object-cover"
        fill
        sizes={sizes}
      />
    </div>
  );
}
