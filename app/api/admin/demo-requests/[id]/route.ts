import type { NextRequest } from "next/server";
import { getDemoRequest, updateDemoRequestStatus } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import type { DemoRequestStatus } from "@/types";

type Params = { params: Promise<{ id: string }> };

const STATUSES: DemoRequestStatus[] = ["new", "contacted", "closed"];

// PATCH /api/admin/demo-requests/{id}  (protected) — update status
export async function PATCH(request: NextRequest, { params }: Params) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const { id } = await params;
  const body = await readJson<{ status?: string }>(request);
  const status = body?.status;

  if (!status || !STATUSES.includes(status as DemoRequestStatus)) {
    return error(422, `\`status\` must be one of: ${STATUSES.join(", ")}.`);
  }
  if (!getDemoRequest(id)) {
    return error(404, `Demo request '${id}' not found.`);
  }

  const updated = updateDemoRequestStatus(id, status as DemoRequestStatus);
  return json(updated);
}
