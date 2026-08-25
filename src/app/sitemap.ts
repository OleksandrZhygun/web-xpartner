import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

const PATHS = ["", "/cars", "/jobs", "/testimonials", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  return PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
      },
    }))
  );
}
