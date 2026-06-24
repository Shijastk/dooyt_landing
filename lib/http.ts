import type { Paginated } from "@/types";

/** JSON success response with an optional status code (default 200). */
export function json<T>(data: T, status = 200): Response {
  return Response.json(data, { status });
}

/** JSON error response in a consistent `{ error: { message } }` shape. */
export function error(status: number, message: string): Response {
  return Response.json({ error: { message } }, { status });
}

/** Parse a positive integer query param, falling back to a default. */
export function intParam(
  value: string | null,
  fallback: number,
  { min = 1, max = Number.MAX_SAFE_INTEGER }: { min?: number; max?: number } = {},
): number {
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return fallback;
  return Math.min(Math.max(n, min), max);
}

/** Wrap a list slice in the standard pagination envelope. */
export function paginate<T>(items: T[], page: number, limit: number): Paginated<T> {
  const total = items.length;
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, page, limit, total };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

/** Safely read a JSON body; returns null on parse failure. */
export async function readJson<T = Record<string, unknown>>(
  request: Request,
): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
