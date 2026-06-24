"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send, Check, Mail, Clock } from "lucide-react";
import { createDemoRequest, fetchPlans, type DemoRequestInput } from "@/lib/api-client";
import { useFetch } from "@/lib/use-fetch";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Spinner } from "@/components/ui/states";

type Errors = Partial<Record<keyof DemoRequestInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BENEFITS = [
  "Personalized walkthrough of every module",
  "Tailored pricing for your team size",
  "Migration & onboarding guidance",
];

export function DemoForm({ initialPlan = "" }: { initialPlan?: string } = {}) {
  return (
    <section id="demo" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Pitch */}
          <div className="lg:pt-6">
            <SectionHeading
              align="left"
              eyebrow="Request a Demo"
              title="See Dooyt in action"
              subtitle="Tell us a little about your business and we'll set up a personalized demo."
            />
            <ul className="mt-8 space-y-4">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                  <span className="text-sm text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form card */}
          <DemoRequestForm initialPlan={initialPlan} />
        </div>
      </div>
    </section>
  );
}

/*
  DemoRequestForm — just the form card: plan options come from /api/plans and
  the lead is posted to /api/demo-requests. Validation, loading + success and
  error states are handled here.
*/
export function DemoRequestForm({ initialPlan = "" }: { initialPlan?: string } = {}) {
  // Plan options come from the API, not hardcoded.
  const { data: plans } = useFetch(() => fetchPlans("monthly"));

  const [values, setValues] = useState<DemoRequestInput>({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    plan: initialPlan,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof DemoRequestInput>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createDemoRequest({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        company: values.company?.trim() || undefined,
        phone: values.phone?.trim() || undefined,
        plan: values.plan || undefined,
        message: values.message?.trim() || undefined,
      });
      setSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-line bg-surface-2 p-7 sm:p-9">
            {success ? (
              <div
                className="flex flex-col items-center justify-center px-2 py-10 text-center sm:py-14"
                role="status"
                aria-live="polite"
              >
                {/* Animated success mark — soft glow halo + rippling rings + pop-in badge */}
                <div className="relative mb-7 grid shrink-0 place-items-center">
                  <span
                    aria-hidden
                    className="absolute h-24 w-24 rounded-full bg-brand-400/25 blur-2xl"
                  />
                  <span
                    aria-hidden
                    className="animate-success-ring absolute h-16 w-16 rounded-full border border-brand-300"
                  />
                  <span
                    aria-hidden
                    className="animate-success-ring absolute h-16 w-16 rounded-full border border-brand-300 [animation-delay:0.65s]"
                  />
                  <span className="animate-success-pop relative grid h-16 w-16 shrink-0 aspect-square place-items-center rounded-full bg-brand-gradient text-white shadow-lg shadow-brand-500/30 ring-8 ring-brand-50">
                    <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
                  </span>
                </div>

                <h3 className="animate-success-rise text-2xl font-bold tracking-tight text-ink [animation-delay:0.1s]">
                  Request received!
                </h3>
                <p className="animate-success-rise mt-2 max-w-sm text-sm leading-relaxed text-muted [animation-delay:0.18s]">
                  Thanks, {values.fullName.split(" ")[0] || "there"} — your demo
                  request is in. Our team will reach out to schedule a time that
                  works for you.
                </p>

                {/* Email confirmation chip */}
                <div className="animate-success-rise mt-6 flex max-w-full items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm shadow-sm [animation-delay:0.26s]">
                  <Mail className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                  <span className="truncate font-medium text-ink">{values.email}</span>
                </div>

                {/* ETA reassurance */}
                <p className="animate-success-rise mt-4 inline-flex items-center gap-1.5 text-xs text-muted [animation-delay:0.32s]">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Typical response time — within 24 hours
                </p>

                <LiquidGlassButton
                  variant="orange"
                  size="sm"
                  className="animate-success-rise mt-8 w-full !py-3.5 text-base font-medium [--radius:12px] [animation-delay:0.4s]"
                  onClick={() => {
                    setSuccess(false);
                    setValues({
                      fullName: "",
                      email: "",
                      company: "",
                      phone: "",
                      plan: "",
                      message: "",
                    });
                  }}
                >
                  Submit another request
                </LiquidGlassButton>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    required
                    error={errors.fullName}
                    value={values.fullName}
                    onChange={(v) => update("fullName", v)}
                    placeholder="Jane Cooper"
                  />
                  <Field
                    label="Work email"
                    required
                    type="email"
                    error={errors.email}
                    value={values.email}
                    onChange={(v) => update("email", v)}
                    placeholder="jane@company.com"
                  />
                  <Field
                    label="Company"
                    value={values.company ?? ""}
                    onChange={(v) => update("company", v)}
                    placeholder="Acme Inc."
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={values.phone ?? ""}
                    onChange={(v) => update("phone", v)}
                    placeholder="+91 90000 00000"
                  />
                </div>

                <div>
                  <label htmlFor="plan" className="mb-1.5 block text-sm font-medium text-ink">
                    Interested plan
                  </label>
                  <select
                    id="plan"
                    value={values.plan}
                    onChange={(e) => update("plan", e.target.value)}
                    className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="">No preference</option>
                    {(plans ?? []).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="What would you like to achieve with Dooyt?"
                    className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>

                {submitError ? (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <LiquidGlassButton
                  type="submit"
                  variant="orange"
                  size="sm"
                  disabled={submitting}
                  className="w-full !py-3.5 text-base font-medium [--radius:12px]"
                >
                  {submitting ? (
                    <>
                      <Spinner className="h-4 w-4" /> Submitting…
                    </>
                  ) : (
                    <>
                      Request Demo <Send className="h-4 w-4" />
                    </>
                  )}
                </LiquidGlassButton>
                <p className="text-center text-xs text-muted">
                  We&apos;ll never share your details. Unsubscribe anytime.
                </p>
              </form>
            )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition-colors focus:ring-2",
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-line focus:border-brand-400 focus:ring-brand-100",
        ].join(" ")}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
