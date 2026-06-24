import { Star } from "lucide-react";
import { MdOutlineStar } from "react-icons/md";
export function StarRating({ rating, className }: { rating: number; className?: string }) {
  const full = Math.round(rating);
  return (
    <div
      className={["flex items-center gap-0.5", className].filter(Boolean).join(" ")}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <MdOutlineStar 
          key={i}
          className={
            i < full
              ? "h-4 w-4 fill-accent text-accent"
              : "h-4 w-4 fill-none text-line"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}
