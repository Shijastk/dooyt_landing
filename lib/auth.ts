import "server-only";
import { getApiKey } from "@/lib/db";
import { error } from "@/lib/http";


export function requireApiKey(request: Request): Response | null {
  const provided = request.headers.get("x-api-key");
  if (!provided || provided !== getApiKey()) {
    return error(401, "Missing or invalid API key.");
  }
  return null;
}
