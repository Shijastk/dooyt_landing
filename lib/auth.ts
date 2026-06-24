import "server-only";
import { getApiKey } from "@/lib/db";
import { error } from "@/lib/http";

/**
 * Guard for protected Route Handlers.
 *
 * Checks the `X-Api-Key` header against the key in seed.json. Returns a `401`
 * Response when the key is missing or wrong, or `null` when the request is
 * authorized. Usage:
 *
 *   const denied = requireApiKey(request);
 *   if (denied) return denied;
 */
export function requireApiKey(request: Request): Response | null {
  const provided = request.headers.get("x-api-key");
  if (!provided || provided !== getApiKey()) {
    return error(401, "Missing or invalid API key.");
  }
  return null;
}
