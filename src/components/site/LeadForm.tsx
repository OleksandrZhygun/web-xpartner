"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { LeadFormState } from "@/lib/actions/leads";

type BoundAction = (state: LeadFormState, formData: FormData) => Promise<LeadFormState>;

export default function LeadForm({
  action,
  dict,
  compact = false,
}: {
  action: BoundAction;
  dict: Dictionary;
  compact?: boolean;
}) {
  const [state, formAction, isPending] = useActionState(action, {});

  if (state.success) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
        <p className="font-semibold">{dict.form.successTitle}</p>
        <p className="mt-1 text-sm">{dict.form.successMessage}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={compact ? "space-y-3" : "space-y-4"}>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="name">
          {dict.form.nameLabel} *
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder={dict.form.namePlaceholder}
          className="w-full rounded-lg border border-border-subtle px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="phone">
          {dict.form.phoneLabel} *
        </label>
        <input
          id="phone"
          name="phone"
          required
          type="tel"
          placeholder={dict.form.phonePlaceholder}
          className="w-full rounded-lg border border-border-subtle px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="message">
          {dict.form.messageLabel}{" "}
          <span className="font-normal text-foreground/50">{dict.form.messageOptional}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          placeholder={dict.form.messagePlaceholder}
          className="w-full rounded-lg border border-border-subtle px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{dict.form.errorMessage}</p>}

      <p className="text-xs text-foreground/50">{dict.form.requiredNote}</p>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-brand-amber px-4 py-2.5 text-sm font-semibold text-brand-navy transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {isPending ? dict.form.submitting : dict.form.submit}
      </button>
    </form>
  );
}
