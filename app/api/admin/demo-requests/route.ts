import type { NextRequest } from "next/server";
import { getDemoRequests } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { intParam, json, paginate } from "@/lib/http";
import type { DemoRequestStatus } from "@/types";

const STATUSES: DemoRequestStatus[] = ["new", "contacted", "closed"];

// GET /api/admin/demo-requests?status=&page=&limit=  (protected)
export function GET(request: NextRequest) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const sp = request.nextUrl.searchParams;
  const status = sp.get("status");
  const page = intParam(sp.get("page"), 1);
  const limit = intParam(sp.get("limit"), 10, { max: 100 });

  let items = getDemoRequests();
  if (status && STATUSES.includes(status as DemoRequestStatus)) {
    items = items.filter((d) => d.status === status);
  }

  return json(paginate(items, page, limit));
}
