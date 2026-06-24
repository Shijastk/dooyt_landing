"use client";

import { Loader2, AlertCircle, Inbox } from "lucide-react";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={["animate-spin", className].filter(Boolean).join(" ")} aria-hidden />;
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16 text-muted"
      role="status"
      aria-live="polite"
    >
      <Spinner className="h-7 w-7 text-brand-500" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/60 py-12 text-center"
      role="alert"
    >
      <AlertCircle className="h-7 w-7 text-red-500" aria-hidden />
      <p className="text-sm text-red-700">{message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ message = "Nothing to show yet." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted">
      <Inbox className="h-7 w-7" aria-hidden />
      <p className="text-sm">{message}</p>
    </div>
  );
}
