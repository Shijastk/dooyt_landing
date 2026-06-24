import type { ReactNode } from "react";

type Tone = "brand" | "accent" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700",
  accent: "bg-amber-100 text-amber-700",
  neutral: "bg-surface-2 text-muted",
};

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
