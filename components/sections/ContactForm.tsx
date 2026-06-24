"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { createDemoRequest } from "@/lib/api-client";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";
import { Spinner } from "@/components/ui/states";


interface Values {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECTS = [
  "General enquiry",
  "Sales & pricing",
  "Product support",
  "Partnership",
  "Other",
];

const EMPTY: Values = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof Values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (!values.message.trim()) next.message = "Please tell us how we can help.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const subject = values.subject.trim();
      const message = values.message.trim();
      await createDemoRequest({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        message: subject ? `[${subject}] ${message}` : message,
      });
      setSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to send. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="h-full rounded-3xl border border-line bg-surface-2 p-7 sm:p-9">
      {success ? (
        <div
          className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          role="status"
          aria-live="polite"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-brand-600">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h3 className="text-xl font-semibold text-ink">Message sent!</h3>
          <p className="max-w-sm text-sm text-muted">
            Thanks, {values.fullName.split(" ")[0] || "there"}. We&apos;ve got
            your message and will reply to {values.email} within one business
            day.
          </p>
          <LiquidGlassButton
            variant="orange"
            size="sm"
            className="!py-3.5 px-7 text-base font-medium [--radius:12px]"
            onClick={() => {
              setSuccess(false);
              setValues(EMPTY);
            }}
          >
            Send another message
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
              label="Phone"
              type="tel"
              value={values.phone}
              onChange={(v) => update("phone", v)}
              placeholder="+91 90000 00000"
            />
            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Subject
              </label>
              <select
                id="subject"
                value={values.subject}
                onChange={(e) => update("subject", e.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                <option value="">Choose a topic</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Message
              <span className="text-red-500"> *</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="How can the Dooyt team help you?"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={[
                "w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2",
                errors.message
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-line focus:border-brand-400 focus:ring-brand-100",
              ].join(" ")}
            />
            {errors.message ? (
              <p id="message-error" className="mt-1 text-xs text-red-600">
                {errors.message}
              </p>
            ) : null}
          </div>

          {submitError ? (
            <p
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
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
                <Spinner className="h-4 w-4" /> Sending…
              </>
            ) : (
              <>
                Send Message <Send className="h-4 w-4" />
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
