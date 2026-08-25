import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";
import CarCard from "@/components/site/CarCard";
import Pagination from "@/components/site/Pagination";

const PAGE_SIZE = 9;

const META = {
  pl: {
    title: "Wynajem aut do taxi i Uber w Krakowie — oferta",
    description: "Auta gotowe do pracy w taxi, Uber, Bolt i FreeNow — sprawdź aktualną ofertę wynajmu w Krakowie.",
  },
  uk: {
    title: "Оренда авто для таксі та Uber у Кракові — авто в наявності",
    description: "Автомобілі, готові до роботи в таксі, Uber, Bolt та FreeNow — перегляньте поточний перелік оренди в Кракові.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pl";
  return pageMetadata({ locale, path: "/cars", ...META[locale] });
}

export default async function CarsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const { page: pageParam } = await searchParams;
  const pageContent = await prisma.pageContent.findUnique({ where: { key: "cars" } });
  const pageTitle = (locale === "pl" ? pageContent?.titlePl : pageContent?.titleUk) || dict.cars.pageTitle;
  const pageIntro = (locale === "pl" ? pageContent?.bodyPl : pageContent?.bodyUk) || dict.cars.pageIntro;
  const totalCars = await prisma.car.count();
  const totalPages = Math.max(1, Math.ceil(totalCars / PAGE_SIZE));
  const page = Math.min(Math.max(1, parseInt(pageParam ?? "1", 10) || 1), totalPages);

  const cars = await prisma.car.findMany({
    orderBy: [{ available: "desc" }, { order: "asc" }],
    include: { photos: { orderBy: { order: "asc" } } },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{pageTitle}</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">{pageIntro}</p>

      {cars.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border-subtle p-8 text-center text-foreground/60">
          {dict.cars.emptyState}
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} locale={locale} dict={dict} />
            ))}
          </div>
          <Pagination basePath={`/${locale}/cars`} page={page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
