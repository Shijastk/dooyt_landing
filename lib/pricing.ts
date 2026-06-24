import type { BillingCycle, Plan, PricedPlan } from "@/types";

/** Annual billing applies a 15% discount, computed server-side. */
export const ANNUAL_DISCOUNT_PCT = 15;

export function pricePlan(plan: Plan, billing: BillingCycle): PricedPlan {
  if (billing === "annual") {
    const price = Math.round(plan.monthlyPrice * (1 - ANNUAL_DISCOUNT_PCT / 100));
    return {
      ...plan,
      billing,
      price,
      total: price * 12,
      discountPct: ANNUAL_DISCOUNT_PCT,
    };
  }
  return {
    ...plan,
    billing,
    price: plan.monthlyPrice,
    total: plan.monthlyPrice,
    discountPct: 0,
  };
}

export function pricePlans(plans: Plan[], billing: BillingCycle): PricedPlan[] {
  return plans.map((p) => pricePlan(p, billing));
}

export function normalizeBilling(value: string | null): BillingCycle {
  return value === "annual" ? "annual" : "monthly";
}
