import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import type {
  DemoRequest,
  Faq,
  Industry,
  Module,
  Plan,
  SeedData,
  Testimonial,
} from "@/types";



function loadSeed(): SeedData {
  const seedPath = path.join(process.cwd(), "data", "seed.json");
  const raw = readFileSync(seedPath, "utf-8");
  return JSON.parse(raw) as SeedData;
}

// `globalThis` cache prevents the store from being reset on hot-reload in dev,
// where modules are re-evaluated frequently.
interface Store {
  apiKey: string;
  modules: Module[];
  industries: Industry[];
  plans: Plan[];
  testimonials: Testimonial[];
  faqs: Faq[];
  demoRequests: DemoRequest[];
  demoSeq: number;
}

const globalForDb = globalThis as unknown as { __dooytStore?: Store };

function createStore(): Store {
  const seed = loadSeed();
  return {
    apiKey: seed.apiKey,
    modules: structuredClone(seed.modules),
    industries: structuredClone(seed.industries),
    plans: structuredClone(seed.plans),
    testimonials: structuredClone(seed.testimonials),
    faqs: structuredClone(seed.faqs),
    demoRequests: [],
    demoSeq: 0,
  };
}

const store: Store = (globalForDb.__dooytStore ??= createStore());

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export function getApiKey(): string {
  return store.apiKey;
}

// ---------------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------------

export function getModules(filters?: {
  search?: string;
  category?: string;
}): Module[] {
  let result = store.modules;
  const search = filters?.search?.trim().toLowerCase();
  const category = filters?.category?.trim().toLowerCase();

  if (search) {
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(search) ||
        m.description.toLowerCase().includes(search),
    );
  }
  if (category) {
    result = result.filter((m) => m.category.toLowerCase() === category);
  }
  return result;
}

export function getModule(id: string): Module | undefined {
  return store.modules.find((m) => m.id === id);
}

export function createModule(data: Omit<Module, "id"> & { id?: string }): Module {
  const id = data.id ?? slugify(data.name);
  const created: Module = { ...data, id };
  store.modules.push(created);
  return created;
}

export function updateModule(id: string, patch: Partial<Module>): Module | undefined {
  const existing = getModule(id);
  if (!existing) return undefined;
  Object.assign(existing, patch, { id });
  return existing;
}

export function deleteModule(id: string): boolean {
  return removeById(store.modules, id);
}

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------

export function getIndustries(): Industry[] {
  return store.industries;
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

export function getPlans(): Plan[] {
  return store.plans;
}

export function getPlan(id: string): Plan | undefined {
  return store.plans.find((p) => p.id === id);
}

export function createPlan(data: Omit<Plan, "id"> & { id?: string }): Plan {
  const id = data.id ?? slugify(data.name);
  const created: Plan = { ...data, id };
  store.plans.push(created);
  return created;
}

export function updatePlan(id: string, patch: Partial<Plan>): Plan | undefined {
  const existing = getPlan(id);
  if (!existing) return undefined;
  Object.assign(existing, patch, { id });
  return existing;
}

export function deletePlan(id: string): boolean {
  return removeById(store.plans, id);
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export function getTestimonials(): Testimonial[] {
  return store.testimonials;
}

export function getTestimonial(id: string): Testimonial | undefined {
  return store.testimonials.find((t) => t.id === id);
}

export function createTestimonial(
  data: Omit<Testimonial, "id"> & { id?: string },
): Testimonial {
  const id = data.id ?? `t${store.testimonials.length + 1}`;
  const created: Testimonial = { ...data, id };
  store.testimonials.push(created);
  return created;
}

export function updateTestimonial(
  id: string,
  patch: Partial<Testimonial>,
): Testimonial | undefined {
  const existing = getTestimonial(id);
  if (!existing) return undefined;
  Object.assign(existing, patch, { id });
  return existing;
}

export function deleteTestimonial(id: string): boolean {
  return removeById(store.testimonials, id);
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export function getFaqs(): Faq[] {
  return [...store.faqs].sort((a, b) => a.order - b.order);
}

export function getFaq(id: string): Faq | undefined {
  return store.faqs.find((f) => f.id === id);
}

export function createFaq(data: Omit<Faq, "id"> & { id?: string }): Faq {
  const id = data.id ?? `f${store.faqs.length + 1}`;
  const created: Faq = { ...data, id };
  store.faqs.push(created);
  return created;
}

export function updateFaq(id: string, patch: Partial<Faq>): Faq | undefined {
  const existing = getFaq(id);
  if (!existing) return undefined;
  Object.assign(existing, patch, { id });
  return existing;
}

export function deleteFaq(id: string): boolean {
  return removeById(store.faqs, id);
}

// ---------------------------------------------------------------------------
// Demo requests (leads)
// ---------------------------------------------------------------------------

export function getDemoRequests(): DemoRequest[] {
  // newest first
  return [...store.demoRequests].reverse();
}

export function getDemoRequest(id: string): DemoRequest | undefined {
  return store.demoRequests.find((d) => d.id === id);
}

export function createDemoRequest(
  data: Omit<DemoRequest, "id" | "status" | "createdAt"> & {
    status?: DemoRequest["status"];
  },
): DemoRequest {
  store.demoSeq += 1;
  const created: DemoRequest = {
    ...data,
    id: `dr_${store.demoSeq}`,
    status: data.status ?? "new",
    // Deterministic-ish timestamp; real value resolved at request time.
    createdAt: new Date().toISOString(),
  };
  store.demoRequests.push(created);
  return created;
}

export function updateDemoRequestStatus(
  id: string,
  status: DemoRequest["status"],
): DemoRequest | undefined {
  const existing = getDemoRequest(id);
  if (!existing) return undefined;
  existing.status = status;
  return existing;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function removeById<T extends { id: string }>(list: T[], id: string): boolean {
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) return false;
  list.splice(idx, 1);
  return true;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
