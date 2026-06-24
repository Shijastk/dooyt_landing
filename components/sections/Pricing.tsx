"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { fetchPlans } from "@/lib/api-client";
import { useFetch } from "@/lib/use-fetch";
import type { BillingCycle } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ErrorState } from "@/components/ui/states";
import { PricingSkeleton } from "@/components/ui/Skeletons";
import { DooytAdvantage } from "@/components/sections/DooytAdvantage";

/** Split a price into its currency symbol and number so they can be styled separately. */
function formatPriceParts(amount: number, currency: string) {
  try {
    const parts = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).formatToParts(amount);
    const symbol = parts.find((p) => p.type === "currency")?.value ?? currency;
    const number = parts
      .filter((p) => p.type !== "currency")
      .map((p) => p.value)
      .join("")
      .trim();
    return { symbol, number };
  } catch {
    return { symbol: currency, number: String(amount) };
  }
}

export function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  // keepPreviousData → when toggling monthly/annual, keep the current plans on
  // screen while the next cycle loads, so the grid slides between price sets
  // instead of flashing the loading state (only the first load shows a spinner).
  const { data: plans, error, refetch } = useFetch(
    () => fetchPlans(billing),
    billing,
    true,
  );

  return (
    <section id="pricing" className="scroll-mt-20">
      <div className="container-page">
        <SectionHeading eyebrow="Pricing" title="Find the Right Plan for You" />

        {/* Billing toggle — segmented control */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div
            role="tablist"
            aria-label="Billing cycle"
            className="inline-flex items-center rounded-2xl bg-gray-200 p-1"
          >
            {(["monthly", "annual"] as const).map((cycle) => {
              const active = billing === cycle;
              return (
                <button
                  key={cycle}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setBilling(cycle)}
                  className={[
                    "rounded-xl px-7 py-2.5 text-sm font-semibold capitalize transition-colors",
                    active ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink",
                  ].join(" ")}
                >
                  {cycle}
                </button>
              );
            })}
          </div>
          <p className="text-sm font-medium text-brand-500">-15% off on annual payments</p>
        </div>

        {/* Plans */}
        <div className="mt-12">
          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : !plans ? (
            <PricingSkeleton />
          ) : (
            <div
              key={billing}
              className="animate-slide-fade grid items-stretch gap-6 lg:grid-cols-3"
            >
              {plans.map((plan, planIndex) => {
                const popular = plan.isPopular;
                const highlightFirst = planIndex > 0;
                const price = formatPriceParts(plan.price, plan.currency);

                const card = (
                  <div
                    className={[
                      "flex h-full flex-col p-8",
                      popular ? "rounded-[20px] bg-brand-50" : "rounded-3xl border border-line bg-white",
                    ].join(" ")}
                  >
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-ink">
                      {plan.name}
                      {popular ? <span aria-hidden>⚡</span> : null}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{plan.tagline}</p>

                    <div className="mt-6 flex items-end gap-1">
                      <span className="mb-1 text-xl font-semibold text-ink">{price.symbol}</span>
                      <span className="text-4xl font-bold tracking-tight text-ink">
                        {price.number}
                      </span>
                      <span className="mb-1 text-sm font-semibold text-ink">/per user</span>
                    </div>

                    <ul className="mt-7 space-y-3">
                      {plan.features.map((feature, featureIndex) => {
                        const emphasised = highlightFirst && featureIndex === 0;
                        return (
                          <li
                            key={feature}
                            className={[
                              "flex items-start gap-3 text-sm",
                              emphasised ? "font-semibold text-ink" : "text-ink",
                            ].join(" ")}
                          >
                            <BadgeCheck
                              className={[
                                "mt-0.5 h-[18px] w-[18px] shrink-0",
                                emphasised ? "fill-brand-600 text-white" : "text-ink/60",
                              ].join(" ")}
                              aria-hidden
                            />
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-auto pt-10">
                      <Link
                        href={`/contact?type=demo&plan=${plan.id}`}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-ink px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
                      >
                        Select plan
                      </Link>
                      {popular ? (
                        <p className="mt-3 text-center text-sm font-medium text-ink">
                          or contact sales
                        </p>
                      ) : null}
                    </div>
                  </div>
                );

                if (!popular) {
                  return (
                    <div key={plan.id} className="flex flex-col lg:my-6">
                      {card}
                    </div>
                  );
                }

                // Popular plan: orange frame with a "MOST POPULAR PLAN" banner.
                return (
                  <div
                    key={plan.id}
                    className="flex flex-col overflow-hidden rounded-3xl bg-brand-600 shadow-xl shadow-brand-100"
                  >
                    <p className="py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-white">
                      Most popular plan
                    </p>
                    <div className="flex-1 p-2 pt-0">{card}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DooytAdvantage />
      </div>
    </section>
  );
}
