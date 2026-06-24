// Shared domain models for the Dooyt ERP landing page.
// Mirrors the shape of `data/seed.json` and the API contract in ASSESSMENT.md.

export interface Module {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

export interface Industry {
  id: string;
  name: string;
  /** Key into `industryImages` (see assets/images); resolved at render time. */
  image: string;
  description: string;
}

export type BillingCycle = "monthly" | "annual";

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  currency: string;
  isPopular: boolean;
  features: string[];
}

/** A plan with server-computed pricing for the requested billing cycle. */
export interface PricedPlan extends Plan {
  billing: BillingCycle;
  /** Price shown per month for the selected cycle (annual = 15% off). */
  price: number;
  /** Total charged for the cycle (monthly = price, annual = price * 12). */
  total: number;
  /** Discount percentage applied (0 for monthly, 15 for annual). */
  discountPct: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

export interface Faq {
  id: string;
  order: number;
  question: string;
  answer: string;
}

export type DemoRequestStatus = "new" | "contacted" | "closed";

export interface DemoRequest {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  plan?: string;
  message?: string;
  status: DemoRequestStatus;
  createdAt: string;
}

/** Standard envelope for paginated list responses. */
export interface Paginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

/** Raw shape of data/seed.json. */
export interface SeedData {
  apiKey: string;
  modules: Module[];
  industries: Industry[];
  plans: Plan[];
  testimonials: Testimonial[];
  faqs: Faq[];
}
