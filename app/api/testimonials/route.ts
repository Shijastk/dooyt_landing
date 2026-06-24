import type { NextRequest } from "next/server";
import { createTestimonial, getTestimonials } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, intParam, json, paginate, readJson } from "@/lib/http";
import type { Testimonial } from "@/types";

// GET /api/testimonials?page=&limit=  (public, paginated)
export function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const page = intParam(sp.get("page"), 1);
  const limit = intParam(sp.get("limit"), 10, { max: 100 });
  return json(paginate(getTestimonials(), page, limit));
}

// POST /api/testimonials  (protected) — create a testimonial
export async function POST(request: NextRequest) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const body = await readJson<Partial<Testimonial>>(request);
  if (!body?.name || !body?.quote) {
    return error(422, "`name` and `quote` are required.");
  }
  const created = createTestimonial({
    name: body.name,
    role: body.role ?? "",
    rating: typeof body.rating === "number" ? body.rating : 5,
    quote: body.quote,
    id: body.id,
  });
  return json(created, 201);
}
