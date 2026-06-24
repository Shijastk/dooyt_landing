import type { NextRequest } from "next/server";
import { deletePlan, getPlan, updatePlan } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import type { Plan } from "@/types";

type Params = { params: Promise<{ id: string }> };

// PUT /api/plans/{id}  (protected)
export async function PUT(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson<Partial<Plan>>(request);
  if (!body) return error(400, "Invalid JSON body.");

  const updated = updatePlan(id, body);
  if (!updated) return error(404, `Plan '${id}' not found.`);
  return json(updated);
}

// DELETE /api/plans/{id}  (protected)
export async function DELETE(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  if (!getPlan(id)) return error(404, `Plan '${id}' not found.`);
  deletePlan(id);
  return json({ id, deleted: true });
}
