import type { NextRequest } from "next/server";
import { createDemoRequest, getPlan } from "@/lib/db";
import { error, isValidEmail, json, readJson } from "@/lib/http";

interface DemoRequestBody {
  fullName?: string;
  email?: string;
  company?: string;
  phone?: string;
  plan?: string;
  message?: string;
}

// POST /api/demo-requests  (public) — create a lead
export async function POST(request: NextRequest) {
  const body = await readJson<DemoRequestBody>(request);
  if (!body) return error(400, "Invalid JSON body.");

  const fullName = body.fullName?.trim();
  const email = body.email?.trim();

  if (!fullName) return error(422, "`fullName` is required.");
  if (!isValidEmail(email)) return error(422, "A valid `email` is required.");

  // Unknown plan → 422 (only validate when a plan was supplied).
  if (body.plan && !getPlan(body.plan)) {
    return error(422, `Unknown plan '${body.plan}'.`);
  }

  const created = createDemoRequest({
    fullName,
    email: email!,
    company: body.company?.trim() || undefined,
    phone: body.phone?.trim() || undefined,
    plan: body.plan || undefined,
    message: body.message?.trim() || undefined,
  });

  return json(created, 201);
}
