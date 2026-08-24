import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import CarCard from "@/components/site/CarCard";
import { submitLeadAction } from "@/lib/actions/leads";

export default async function CarsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const cars = await prisma.car.findMany({
    orderBy: [{ available: "desc" }, { order: "asc" }],
    include: { photos: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{dict.cars.pageTitle}</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">{dict.cars.pageIntro}</p>

      {cars.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border-subtle p-8 text-center text-foreground/60">
          {dict.cars.emptyState}
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              locale={locale}
              dict={dict}
              action={submitLeadAction.bind(null, "CAR", car.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
