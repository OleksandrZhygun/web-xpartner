"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LeadForm from "@/components/site/LeadForm";
import type { LeadFormState } from "@/lib/actions/leads";

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

type BoundAction = (state: LeadFormState, formData: FormData) => Promise<LeadFormState>;

export default function CarCard({
  car,
  locale,
  dict,
  action,
}: {
  car: CarCardData;
  locale: Locale;
  dict: Dictionary;
  action: BoundAction;
}) {
  const [showForm, setShowForm] = useState(false);
  const title = locale === "pl" ? car.titlePl : car.titleUk;
  const description = locale === "pl" ? car.descriptionPl : car.descriptionUk;
  const unit = locale === "pl" ? car.priceUnitPl : car.priceUnitUk;
  const photo = car.photos[0]?.url;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm">
      <div className="relative aspect-[3/2] bg-slate-100">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">—</div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
            car.available ? "bg-emerald-500" : "bg-slate-500"
          }`}
        >
          {car.available ? dict.cars.availableLabel : dict.cars.unavailableLabel}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
        <p className="mt-1 text-sm text-foreground/70">{description}</p>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-brand-navy">{car.price} zł</span>
          <span className="text-sm text-foreground/60">/ {unit}</span>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="mt-4 w-full rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {dict.cars.contactBtn}
        </button>

        {showForm && (
          <div className="mt-4 border-t border-border-subtle pt-4">
            <LeadForm action={action} dict={dict} compact />
          </div>
        )}
      </div>
    </div>
  );
}
