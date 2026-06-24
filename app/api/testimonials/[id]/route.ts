import type { NextRequest } from "next/server";
import { deleteTestimonial, getTestimonial, updateTestimonial } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import type { Testimonial } from "@/types";

type Params = { params: Promise<{ id: string }> };

// PUT /api/testimonials/{id}  (protected)
export async function PUT(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson<Partial<Testimonial>>(request);
  if (!body) return error(400, "Invalid JSON body.");

  const updated = updateTestimonial(id, body);
  if (!updated) return error(404, `Testimonial '${id}' not found.`);
  return json(updated);
}

// DELETE /api/testimonials/{id}  (protected)
export async function DELETE(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  if (!getTestimonial(id)) return error(404, `Testimonial '${id}' not found.`);
  deleteTestimonial(id);
  return json({ id, deleted: true });
}
