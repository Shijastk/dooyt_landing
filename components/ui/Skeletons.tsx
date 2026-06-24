

/** Base shimmering block. Compose with width/height/rounding utilities. */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "skeleton-sheen animate-pulse rounded-md bg-line/70",
        className,
      ].join(" ")}
      aria-hidden
    />
  );
}

export function SkeletonGlassButton({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "brand" | "ghost";
}) {
  const surfaces: Record<string, string> = {
    dark: "bg-ink",
    brand: "bg-brand-600",
    ghost: "bg-line/60",
  };
  return (
    <div
      className={[
        "group relative isolate overflow-hidden rounded-xl",
        surfaces[tone],
        className,
      ].join(" ")}
      style={{
        boxShadow:
          "inset 0 1px 2px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.25)",
      }}
      aria-hidden
    >
      {/* Idle + hover sheen, same diagonal band as the real glass buttons. */}
      <span className="skeleton-sheen pointer-events-none absolute inset-0" />
      <span className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/3 -skew-x-12 bg-white/20 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
    </div>
  );
}

/** Wrapper that announces a loading region to assistive tech. */
function SkeletonRegion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- Pricing */

/** One plan card. `popular` mirrors the orange-framed "Most popular" card. */
function PlanCardSkeleton({ popular = false }: { popular?: boolean }) {
  const body = (
    <div
      className={[
        "flex h-full flex-col p-8",
        popular
          ? "rounded-[20px] bg-brand-50"
          : "rounded-3xl border border-line bg-white",
      ].join(" ")}
    >
      <Skeleton className="h-6 w-32" />
      <Skeleton className="mt-2 h-4 w-44" />
      {/* price block: currency + big number */}
      <div className="mt-6 flex items-end gap-2">
        <Skeleton className="h-5 w-4" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="mb-1 h-4 w-16" />
      </div>
      <div className="mt-7 space-y-3">
        {Array.from({ length: 5 }).map((_, f) => (
          <div key={f} className="flex items-center gap-3">
            <Skeleton className="h-[18px] w-[18px] shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full max-w-[200px]" />
          </div>
        ))}
      </div>
      <div className="mt-auto pt-10">
        <SkeletonGlassButton tone= "dark" className="h-12 w-full" />
      </div>
    </div>
  );

  if (!popular) {
    return <div className="flex flex-col lg:my-6">{body}</div>;
  }

  // Popular plan: orange frame + "MOST POPULAR PLAN" banner.
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-brand-600 shadow-xl shadow-brand-100">
      <div className="flex justify-center py-2.5">
        <Skeleton className="h-3 w-32 bg-white/40" />
      </div>
      <div className="flex-1 p-2 pt-0">{body}</div>
    </div>
  );
}

export function PricingSkeleton() {
  return (
    <SkeletonRegion label="Loading plans…">
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        <PlanCardSkeleton />
        <PlanCardSkeleton popular />
        <PlanCardSkeleton />
      </div>
    </SkeletonRegion>
  );
}

/* ------------------------------------------------------------------- FAQ */

export function FaqSkeleton() {
  return (
    <SkeletonRegion label="Loading FAQs…">
      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-4 rounded-2xl bg-surface-2 px-6 py-5"
          >
            <Skeleton className="h-5 w-2/3 max-w-md bg-line/80" />
            {/* round expand/collapse toggle — solid ink pill in the real UI */}
            <SkeletonGlassButton tone="dark" className="h-7 w-7 shrink-0 !rounded-full" />
          </li>
        ))}
      </ul>
    </SkeletonRegion>
  );
}

/* ----------------------------------------------------------- Testimonials */

export function TestimonialsSkeleton() {
  return (
    <SkeletonRegion label="Loading testimonials…">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm"
          >
            {/* star row + rating number */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-6" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonRegion>
  );
}

/* --------------------------------------------------------------- Modules */

export function ModulesSkeleton() {
  return (
    <SkeletonRegion label="Loading modules…">
      {/* Tab chips — glass pills, first one "active" (orange). */}
      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonGlassButton
            key={i}
            tone={i === 0 ? "brand" : "ghost"}
            className="h-11 w-32 !rounded-lg"
          />
        ))}
      </div>

      {/* Showcase panel — image left, copy right. */}
      <div className="bg-module-panel mt-12 overflow-hidden rounded-3xl border border-line px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10 lg:pt-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Skeleton className="h-80 w-full rounded-l-2xl" />
          <div className="space-y-4 lg:px-6">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}

/* ------------------------------------------------------------ Industries */

/** One industry card — image + name + 2 copy lines, image top or bottom. */
function IndustryCardSkeleton({ imageTop }: { imageTop: boolean }) {
  const image = <Skeleton className="h-44 w-full rounded-xl" />;
  const text = (
    <div className="space-y-2">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
  return (
    <div className="flex grow flex-col gap-5 rounded-2xl bg-[#fffbf7] p-6">
      {imageTop ? (
        <>
          {image}
          {text}
        </>
      ) : (
        <>
          {text}
          {image}
        </>
      )}
    </div>
  );
}

export function IndustriesSkeleton() {
  // Mirror IndustriesGrid: 3 columns, the middle one without the top offset,
  // alternating image position the same way the real cards do.
  return (
    <SkeletonRegion label="Loading industries…">
      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((col) => (
          <div
            key={col}
            className={`flex flex-col gap-5 ${col === 1 ? "" : "lg:pt-12"}`}
          >
            {[0, 1].map((row) => (
              <IndustryCardSkeleton key={row} imageTop={(col + row) % 2 === 1} />
            ))}
          </div>
        ))}
      </div>
    </SkeletonRegion>
  );
}
