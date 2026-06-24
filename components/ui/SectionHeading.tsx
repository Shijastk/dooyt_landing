import type { ReactNode } from "react";

/**
 * SectionHeading — the standard heading block used at the top of every
 * landing-page section.
 *
 * Renders an orange eyebrow label, a large bold title, and an optional
 * supporting subtitle (e.g. the "Modules → Modules That Do More" pattern
 * from the design). Keep all section intros going through this component
 * so spacing, sizing, and brand color stay consistent across the page.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={[
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-4xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p className="text-sm font-normal tracking-tight text-brand-500">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={[
          "mt-4 tracking-tight text-ink text-4xl font-medium sm:text-5xl tracking-tighter leading-[1.4]",
        ].join(" ")}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={[
            "mt-5 text-base leading-relaxed text-muted sm:text-lg max-w-2xl",
            isCenter ? "mx-auto" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
