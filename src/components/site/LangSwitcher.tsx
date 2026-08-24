"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const rest = pathname.split("/").slice(2).join("/");
  const target = (loc: Locale) => `/${loc}${rest ? `/${rest}` : ""}`;

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 p-1 text-sm">
      <Link
        href={target("pl")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "pl" ? "bg-brand-amber text-brand-navy font-semibold" : "text-white/80 hover:text-white"
        }`}
      >
        PL
      </Link>
      <Link
        href={target("uk")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "uk" ? "bg-brand-amber text-brand-navy font-semibold" : "text-white/80 hover:text-white"
        }`}
      >
        UA
      </Link>
    </div>
  );
}
