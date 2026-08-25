import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";
import PageBody from "@/components/site/PageBody";
import CopyButton from "@/components/site/CopyButton";
import SocialLinks from "@/components/site/SocialLinks";

const META = {
  pl: {
    title: "O nas",
    description: "X-Partner — wynajem aut do taxi i Uber oraz pomoc w znalezieniu pracy jako kierowca w Krakowie.",
  },
  uk: {
    title: "Про нас",
    description: "X-Partner — оренда авто для таксі та Uber і допомога у пошуку роботи водієм у Кракові.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pl";
  return pageMetadata({ locale, path: "/about", ...META[locale] });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const [page, settings] = await Promise.all([
    prisma.pageContent.findUnique({ where: { key: "about" } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);
  const title = page ? (locale === "pl" ? page.titlePl : page.titleUk) : dict.nav.about;
  const body = page ? (locale === "pl" ? page.bodyPl : page.bodyUk) : "";
  const address = locale === "pl" ? settings?.addressPl : settings?.addressUk;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{title}</h1>
      <div className="mt-6">
        <PageBody text={body} />
      </div>

      <SocialLinks instagramUrl={settings?.instagramUrl} tiktokUrl={settings?.tiktokUrl} className="mt-6" />

      {address && (
        <div className="mt-10 max-w-2xl">
          <h2 className="text-lg font-semibold text-brand-navy">{dict.office.title}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-foreground/80">{address}</span>
            <CopyButton text={address} label={dict.office.copy} copiedLabel={dict.office.copied} />
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border-subtle">
            <iframe
              title="Google Maps"
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </div>
  );
}
