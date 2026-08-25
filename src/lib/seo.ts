import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://web-xpartner-production.up.railway.app").replace(/\/$/, "");
}

// Builds title/description/hreflang/Open Graph metadata for a public page.
// `path` is the locale-less path, e.g. "" for home, "/cars", "/jobs".
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const base = siteUrl();
  const url = `${base}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        pl: `${base}/pl${path}`,
        uk: `${base}/uk${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "X-Partner",
      locale: locale === "pl" ? "pl_PL" : "uk_UA",
      type: "website",
    },
  };
}
