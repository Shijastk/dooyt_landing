import Image from "next/image";
import { industryImageFor } from "@/assets/images";
import type { Industry } from "@/types";

/**
 * IndustryImage — an industry photo rendered as a filled, rounded cover image.
 *
 * The wrapper's size and spacing (height, width, margins) are owned by the
 * caller via `className`, so the same component serves both the vertical cards
 * and the wide "balance" cards. Static-imported sources keep the blur
 * placeholder and Next.js image optimization.
 */
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
