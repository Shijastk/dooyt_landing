import type { NextRequest } from "next/server";
import { deleteModule, getModule, updateModule } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import type { Module } from "@/types";

type Params = { params: Promise<{ id: string }> };

// PUT /api/modules/{id}  (protected) — update
export async function PUT(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson<Partial<Module>>(request);
  if (!body) return error(400, "Invalid JSON body.");

  const updated = updateModule(id, body);
  if (!updated) return error(404, `Module '${id}' not found.`);
  return json(updated);
}

// DELETE /api/modules/{id}  (protected)
export async function DELETE(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  if (!getModule(id)) return error(404, `Module '${id}' not found.`);
  deleteModule(id);
  return json({ id, deleted: true });
}
