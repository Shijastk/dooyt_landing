import type {
  BillingCycle,
  DemoRequest,
  Faq,
  Industry,
  Module,
  Paginated,
  PricedPlan,
  Testimonial,
} from "@/types";

/**
 * Typed client-side fetchers for the landing page sections.
 * All hit same-origin `/api/*` Route Handlers.
 */

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body?.error?.message ?? message;
    } catch {
      /* ignore parse error */
    }
    throw new Error(message);
  }
  return (await res.json()) as T;
}

export function fetchModules(params?: { search?: string; category?: string }) {
  const sp = new URLSearchParams();
  if (params?.search) sp.set("search", params.search);
  if (params?.category) sp.set("category", params.category);
  const qs = sp.toString();
  return getJson<Module[]>(`/api/modules${qs ? `?${qs}` : ""}`);
}

export function fetchIndustries() {
  return getJson<Industry[]>("/api/industries");
}

export function fetchPlans(billing: BillingCycle) {
  return getJson<PricedPlan[]>(`/api/plans?billing=${billing}`);
}

export function fetchTestimonials(page = 1, limit = 10) {
  return getJson<Paginated<Testimonial>>(
    `/api/testimonials?page=${page}&limit=${limit}`,
  );
}

export function fetchFaqs() {
  return getJson<Faq[]>("/api/faqs");
}

export interface DemoRequestInput {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  plan?: string;
  message?: string;
}

export function createDemoRequest(input: DemoRequestInput) {
  return getJson<DemoRequest>("/api/demo-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}
