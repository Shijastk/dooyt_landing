"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  title: ReactNode;
  description: string;
};

export function ExpandableContentCard({ title, description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((v) => !v);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={toggle}
      onKeyDown={onKeyDown}
      className={`flex min-h-[244px] w-full flex-col justify-start overflow-hidden rounded-lg bg-brand-50 p-8 text-left outline-none transition-[max-height] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-brand-500 sm:h-full sm:min-h-0 sm:max-h-none sm:cursor-default sm:justify-center sm:p-10 ${
        expanded ? "max-h-[640px]" : "max-h-[244px]"
      }`}
    >
      <h3 className="text-2xl font-medium leading-wider tracking-tighter text-ink sm:mt-6 sm:text-3xl">
        {title}
      </h3>
      <p
        className={`mt-3 text-md leading-relaxed text-muted sm:mt-6 sm:line-clamp-none sm:text-lg ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {description}
      </p>

      {/* Tap affordance — mobile only, since sm+ shows the full copy. */}
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 sm:hidden">
        {expanded ? "Show less" : "Tap to expand"}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </span>
    </div>
  );
}
