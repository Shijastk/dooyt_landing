import type { NextRequest } from "next/server";
import { deleteFaq, getFaq, updateFaq } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import type { Faq } from "@/types";

type Params = { params: Promise<{ id: string }> };

// PUT /api/faqs/{id}  (protected)
export async function PUT(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson<Partial<Faq>>(request);
  if (!body) return error(400, "Invalid JSON body.");

  const updated = updateFaq(id, body);
  if (!updated) return error(404, `FAQ '${id}' not found.`);
  return json(updated);
}

// DELETE /api/faqs/{id}  (protected)
export async function DELETE(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  if (!getFaq(id)) return error(404, `FAQ '${id}' not found.`);
  deleteFaq(id);
  return json({ id, deleted: true });
}
