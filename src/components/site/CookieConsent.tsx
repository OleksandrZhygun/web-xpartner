"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const STORAGE_KEY = "xp_cookie_consent";

export default function CookieConsent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen post-mount (SSR has no access to it),
    // so this genuinely needs an effect rather than a lazy initial state.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable; skip showing the banner
    }
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-surface px-4 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground/80">
          {dict.cookies.message}{" "}
          <Link href={`/${locale}/privacy`} className="underline hover:text-brand-navy">
            {dict.cookies.policyLinkText}
          </Link>
        </p>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-slate-100"
          >
            {dict.cookies.reject}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            {dict.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
