import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";
import CarGallery from "@/components/site/CarGallery";
import LeadForm from "@/components/site/LeadForm";
import { submitLeadAction } from "@/lib/actions/leads";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pl";
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) return pageMetadata({ locale, path: "/cars", title: "Auto", description: "" });

  const title = locale === "pl" ? car.titlePl : car.titleUk;
  const description = locale === "pl" ? car.descriptionPl : car.descriptionUk;
  return pageMetadata({ locale, path: `/cars/${id}`, title, description });
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const car = await prisma.car.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
  if (!car) notFound();

  const title = locale === "pl" ? car.titlePl : car.titleUk;
  const description = locale === "pl" ? car.descriptionPl : car.descriptionUk;
  const unit = locale === "pl" ? car.priceUnitPl : car.priceUnitUk;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link href={`/${locale}/cars`} className="text-sm text-foreground/60 hover:text-brand-navy">
        ← {dict.cars.pageTitle}
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <CarGallery photos={car.photos} alt={title} />

        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${
              car.available ? "bg-emerald-500" : "bg-slate-500"
            }`}
          >
            {car.available ? dict.cars.availableLabel : dict.cars.unavailableLabel}
          </span>
          <h1 className="mt-3 text-2xl font-bold text-brand-navy sm:text-3xl">{title}</h1>
          <p className="mt-3 text-foreground/70">{description}</p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-brand-navy">{car.price} zł</span>
            <span className="text-sm text-foreground/60">/ {unit}</span>
          </div>

          <div className="mt-8 rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-brand-navy">{dict.cars.contactBtn}</h2>
            <div className="mt-4">
              <LeadForm action={submitLeadAction.bind(null, "CAR", car.id)} dict={dict} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
