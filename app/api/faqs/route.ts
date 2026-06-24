import type { NextRequest } from "next/server";
import { createFaq, getFaqs } from "@/lib/db";
import { requireApiKey } from "@/lib/auth";
import { error, json, readJson } from "@/lib/http";
import type { Faq } from "@/types";

// GET /api/faqs  (public) — ordered by `order`
export function GET() {
  return json(getFaqs());
}

// POST /api/faqs  (protected) — create a FAQ
export async function POST(request: NextRequest) {
  const denied = requireApiKey(request);
  if (denied) return denied;

  const body = await readJson<Partial<Faq>>(request);
  if (!body?.question || !body?.answer) {
    return error(422, "`question` and `answer` are required.");
  }
  const created = createFaq({
    order: body.order ?? 999,
    question: body.question,
    answer: body.answer,
    id: body.id,
  });
  return json(created, 201);
}
