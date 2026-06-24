import type { NextRequest } from "next/server";
import { createPlan, getPlans } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import { normalizeBilling, pricePlans } from "@/lib/pricing";
import type { Plan } from "@/types";

// GET /api/plans?billing=monthly|annual  (public)
// Annual pricing (15% off) is computed server-side.
export function GET(request: NextRequest) {
  const billing = normalizeBilling(request.nextUrl.searchParams.get("billing"));
  return json(pricePlans(getPlans(), billing));
}

// POST /api/plans  (protected) — create a plan
export async function POST(request: NextRequest) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const body = await readJson<Partial<Plan>>(request);
  if (!body?.name || typeof body.monthlyPrice !== "number") {
    return error(422, "`name` and numeric `monthlyPrice` are required.");
  }
  const created = createPlan({
    name: body.name,
    tagline: body.tagline ?? "",
    monthlyPrice: body.monthlyPrice,
    currency: body.currency ?? "INR",
    isPopular: body.isPopular ?? false,
    features: body.features ?? [],
    id: body.id,
  });
  return json(created, 201);
}
