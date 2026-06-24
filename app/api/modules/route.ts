import type { NextRequest } from "next/server";
import { createModule, getModules } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import type { Module } from "@/types";

// GET /api/modules?search=&category=  (public)
export function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const modules = getModules({
    search: sp.get("search") ?? undefined,
    category: sp.get("category") ?? undefined,
  });
  return json(modules);
}

// POST /api/modules  (protected) — create a module
export async function POST(request: NextRequest) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const body = await readJson<Partial<Module>>(request);
  if (!body?.name || !body?.category) {
    return error(422, "`name` and `category` are required.");
  }
  const created = createModule({
    name: body.name,
    category: body.category,
    icon: body.icon ?? "box",
    description: body.description ?? "",
    id: body.id,
  });
  return json(created, 201);
}
