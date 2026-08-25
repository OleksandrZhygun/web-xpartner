import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";
import PageBody from "@/components/site/PageBody";

const META = {
  pl: { title: "Polityka prywatności", description: "Polityka prywatności serwisu x-partner.pl." },
  uk: { title: "Політика конфіденційності", description: "Політика конфіденційності сайту x-partner.pl." },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pl";
  return pageMetadata({ locale, path: "/privacy", ...META[locale] });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const page = await prisma.pageContent.findUnique({ where: { key: "privacy" } });
  const title = page ? (locale === "pl" ? page.titlePl : page.titleUk) : dict.nav.privacy;
  const body = page ? (locale === "pl" ? page.bodyPl : page.bodyUk) : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{title}</h1>
      <div className="mt-6">
        <PageBody text={body} />
      </div>
    </div>
  );
}
