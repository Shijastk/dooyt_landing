# Dooyt — ERP Landing Page

A full-stack rebuild of the **Dooyt ERP landing page** with the API that powers
its dynamic sections.

- **Frontend:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + lucide-react
- **Backend stack chosen:** **Next.js Route Handlers** (single full-stack app — no separate server)
- **Data:** file-system mock DB seeded from `data/seed.json` (native `fs`, in-memory store for mutations)

## Getting started

> **Prerequisites:** Node.js 20+ (required by Next.js 16 / React 19) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The frontend and the API both run from this one app.

```bash
npm run build   # production build (also typechecks)
npm run start   # serve the production build
npm run lint    # eslint
```

## Features

Mapped to the brief's Part 1 requirements:

- **Responsive, mobile-first** layout across the page, with a working mobile nav drawer in the navbar.
- **Data-driven sections** — Modules, Industries, Plans, Testimonials and FAQs are fetched from the API, never hardcoded.
- **Pricing toggle** — a monthly / annual segmented control that refetches and recomputes prices server-side, with the annual 15% discount surfaced in the UI.
- **FAQ accordion** — single-open accordion with accessible `aria-expanded` toggles.
- **Request-a-Demo form** — client-side validation (required full name, valid email), a loading state on submit, an animated success state, and inline error handling. Lives on the dedicated `/contact` route, with a demo variant via `?type=demo` and a general-contact variant.
- **Graceful states** — every data-driven section renders skeleton-loading, empty, and error (with retry) states.

> Note: testimonials are presented as a responsive, paginated card grid rather than a slider.

## Architecture

Built on the official Next.js **"store project files outside of `app`"** strategy
([docs](https://nextjs.org/docs/app/getting-started/project-structure)). The
`app/` directory is kept purely for routing (`app/page.tsx` + `app/api/*`);
shared code lives in root-level folders resolved via the `@/*` alias.

```
app/
  api/                 Route Handlers (REST API, base path /api)
  contact/             Request-a-Demo and general contact page
  layout.tsx           Root layout + SEO metadata
  page.tsx             Landing page — composes the sections
  globals.css          Tailwind v4 + design tokens
components/
  layout/              Navbar (with mobile nav), Footer
  sections/            Hero, Modules, Features, Industries, CTA,
                       Pricing, Testimonials, FAQ, DemoForm, ContactForm
  ui/                  Button, Badge, Icon, SectionHeading, states, …
lib/
  db.ts                fs-backed mock database + typed accessors
  auth.ts              X-Api-Key guard for protected routes
  http.ts              JSON/error/pagination helpers
  pricing.ts           server-side annual-discount logic
  api-client.ts        typed client fetchers
  use-fetch.ts         client hook (loading / error / refetch)
data/seed.json         seed data
types/index.ts         shared domain models
```

Data-driven sections (Modules, Industries, Plans, Testimonials, FAQs) are
**fetched from the API**, never hardcoded, and each renders graceful
loading / empty / error states.

## API

Base path `/api`. Protected routes require the header
`X-Api-Key: dooyt-demo-key-2026`.

Paginated responses use the envelope `{ "data": [...], "page": 1, "limit": 10, "total": 42 }`.

### Public

| Method | Path | Notes |
|---|---|---|
| GET | `/api/modules` | `?search=` `?category=` |
| GET | `/api/industries` | |
| GET | `/api/plans` | `?billing=monthly\|annual` — annual = **15% off, computed server-side** |
| GET | `/api/testimonials` | `?page=` `&limit=` (paginated) |
| GET | `/api/faqs` | ordered by `order` |
| POST | `/api/demo-requests` | create a lead; `fullName` + valid `email` required; unknown `plan` → 422; success → 201 |

### Protected (require the API key)

| Method | Path | Notes |
|---|---|---|
| POST | `/api/{modules\|plans\|testimonials\|faqs}` | create |
| PUT / DELETE | `/api/{modules\|plans\|testimonials\|faqs}/{id}` | update / delete |
| GET | `/api/admin/demo-requests` | `?status=` `&page=` `&limit=` |
| PATCH | `/api/admin/demo-requests/{id}` | update status (`new` / `contacted` / `closed`) |

Status codes: `201` create · `200` ok · `401` bad/missing key · `404` unknown id · `422`/`400` validation.

### Quick examples

```bash
# annual pricing (15% off computed server-side)
curl "http://localhost:3000/api/plans?billing=annual"

# paginated testimonials
curl "http://localhost:3000/api/testimonials?page=1&limit=2"

# create a lead
curl -X POST http://localhost:3000/api/demo-requests \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Jane Cooper","email":"jane@acme.com","plan":"pro"}'

# protected: list leads
curl http://localhost:3000/api/admin/demo-requests \
  -H "X-Api-Key: dooyt-demo-key-2026"
```

## Notes

- The seed file is treated as **read-only**; create/update/delete operations and
  new demo requests mutate an in-memory store that lives for the dev-server
  session, so the repo's seed data stays pristine.
- `X-Api-Key` is the auth scheme implemented here (the spec also accepts JWT).
