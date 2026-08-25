import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { pageMetadata, siteUrl } from "@/lib/seo";
import CarCard from "@/components/site/CarCard";

const META = {
  pl: {
    title: "Wynajem aut do taxi i Uber oraz praca dla kierowców w Krakowie",
    description:
      "Wynajmujemy samochody gotowe do rejestracji w taxi, Uber, Bolt i FreeNow oraz pomagamy znaleźć pracę jako kierowca w Krakowie. Obsługa po polsku i po ukraińsku.",
  },
  uk: {
    title: "Оренда авто для таксі та Uber, робота водієм у Кракові",
    description:
      "Здаємо в оренду автомобілі, готові до реєстрації в таксі, Uber, Bolt та FreeNow, і допомагаємо знайти роботу водієм у Кракові. Обслуговування польською та українською.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pl";
  return pageMetadata({ locale, path: "", ...META[locale] });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const [cars, homeContent, settings] = await Promise.all([
    prisma.car.findMany({
      orderBy: [{ available: "desc" }, { order: "asc" }],
      include: { photos: { orderBy: { order: "asc" }, take: 1 } },
      take: 3,
    }),
    prisma.pageContent.findUnique({ where: { key: "home" } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  const heroTitle = (locale === "pl" ? homeContent?.titlePl : homeContent?.titleUk) || dict.hero.title;
  const heroSubtitle = (locale === "pl" ? homeContent?.bodyPl : homeContent?.bodyUk) || dict.hero.subtitle;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "X-Partner",
    url: `${siteUrl()}/${locale}`,
    telephone: settings?.phone,
    email: settings?.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kraków",
      addressCountry: "PL",
    },
    areaServed: "Kraków",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-gradient-to-b from-brand-navy to-brand-navy-light text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-5 text-lg text-white/80">{heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/cars`}
                className="rounded-lg bg-brand-amber px-5 py-3 text-sm font-semibold text-brand-navy hover:opacity-90"
              >
                {dict.hero.ctaCars}
              </Link>
              <Link
                href={`/${locale}/jobs`}
                className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {dict.hero.ctaJobs}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-brand-navy sm:text-3xl">
          {dict.home.servicesTitle}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            href={`/${locale}/cars`}
            className="group rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-amber/15 text-brand-amber-dark">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2a2 2 0 0 1 1.9 1.5L21 13" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7.5" cy="17.5" r="1.4"/>
                <circle cx="16.5" cy="17.5" r="1.4"/>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-brand-navy">{dict.home.carsCardTitle}</h3>
            <p className="mt-2 text-sm text-foreground/70">{dict.home.carsCardText}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-amber-dark group-hover:underline">
              {dict.hero.ctaCars} →
            </span>
          </Link>

          <Link
            href={`/${locale}/jobs`}
            className="group rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-amber/15 text-brand-amber-dark">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="8" r="3.2"/>
                <path d="M16.5 5.5a3 3 0 0 1 0 6" strokeLinecap="round"/>
                <path d="M20 20v-1a3.7 3.7 0 0 0-2.3-3.4" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-brand-navy">{dict.home.jobsCardTitle}</h3>
            <p className="mt-2 text-sm text-foreground/70">{dict.home.jobsCardText}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-amber-dark group-hover:underline">
              {dict.hero.ctaJobs} →
            </span>
          </Link>
        </div>
      </section>

      {cars.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">{dict.nav.cars}</h2>
            <Link href={`/${locale}/cars`} className="text-sm font-semibold text-brand-amber-dark hover:underline">
              {dict.hero.ctaCars} →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-brand-navy sm:text-3xl">{dict.home.whyUsTitle}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.whyUsItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border-subtle bg-surface p-5">
              <h3 className="font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{dict.home.ctaSectionTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">{dict.home.ctaSectionText}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-block rounded-lg bg-brand-amber px-6 py-3 text-sm font-semibold text-brand-navy hover:opacity-90"
          >
            {dict.form.contactPromise}
          </Link>
        </div>
      </section>
    </div>
  );
}
