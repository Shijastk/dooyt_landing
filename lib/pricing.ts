import type { BillingCycle, Plan, PricedPlan } from "@/types";

/** Annual billing applies a 15% discount, computed server-side. */
export const ANNUAL_DISCOUNT_PCT = 15;

/**
 * Compute the displayed price for a plan under the given billing cycle.
 *
 * - monthly: price = monthlyPrice, total = monthlyPrice, discount = 0
 * - annual:  per-month price is discounted 15%, total = price * 12
 *
 * This lives server-side so the client never computes or is trusted with
 * pricing — the API returns the final numbers.
 */
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
