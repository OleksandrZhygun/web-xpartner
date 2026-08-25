import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import PhotoGallery from "@/components/site/PhotoGallery";

export type CarCardData = {
  id: string;
  titlePl: string;
  titleUk: string;
  descriptionPl: string;
  descriptionUk: string;
  price: number;
  priceUnitPl: string;
  priceUnitUk: string;
  available: boolean;
  photos: { url: string }[];
};

export default function CarCard({
  car,
  locale,
  dict,
}: {
  car: CarCardData;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = locale === "pl" ? car.titlePl : car.titleUk;
  const description = locale === "pl" ? car.descriptionPl : car.descriptionUk;
  const unit = locale === "pl" ? car.priceUnitPl : car.priceUnitUk;

  return (
    <Link
      href={`/${locale}/cars/${car.id}`}
      className="block overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/2] bg-slate-100">
        <PhotoGallery photos={car.photos} alt={title} />
        <span
          className={`pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
            car.available ? "bg-emerald-500" : "bg-slate-500"
          }`}
        >
          {car.available ? dict.cars.availableLabel : dict.cars.unavailableLabel}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-foreground/70">{description}</p>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-brand-navy">{car.price} zł</span>
          <span className="text-sm text-foreground/60">/ {unit}</span>
        </div>

        <span className="mt-4 block w-full rounded-lg bg-brand-navy px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90">
          {dict.cars.contactBtn}
        </span>
      </div>
    </Link>
  );
}
