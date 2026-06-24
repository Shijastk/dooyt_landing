import { getIndustries } from "@/lib/db";
import { json } from "@/lib/http";

// GET /api/industries  (public)
export function GET() {
  return json(getIndustries());
}
