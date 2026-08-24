"use client";

type CarDefaults = {
  titlePl: string;
  titleUk: string;
  descriptionPl: string;
  descriptionUk: string;
  price: number;
  priceUnitPl: string;
  priceUnitUk: string;
  available: boolean;
};

export default function CarForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: Partial<CarDefaults>;
  submitLabel: string;
}) {
  const d: CarDefaults = {
    titlePl: defaults?.titlePl ?? "",
    titleUk: defaults?.titleUk ?? "",
    descriptionPl: defaults?.descriptionPl ?? "",
    descriptionUk: defaults?.descriptionUk ?? "",
    price: defaults?.price ?? 0,
    priceUnitPl: defaults?.priceUnitPl ?? "dzień",
    priceUnitUk: defaults?.priceUnitUk ?? "день",
    available: defaults?.available ?? true,
  };

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
  const labelCls = "mb-1 block text-sm font-medium text-slate-700";

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="titlePl">
            Назва (PL) *
          </label>
          <input id="titlePl" name="titlePl" required defaultValue={d.titlePl} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="titleUk">
            Назва (UA) *
          </label>
          <input id="titleUk" name="titleUk" required defaultValue={d.titleUk} className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="descriptionPl">
            Опис (PL) *
          </label>
          <textarea
            id="descriptionPl"
            name="descriptionPl"
            required
            rows={4}
            defaultValue={d.descriptionPl}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="descriptionUk">
            Опис (UA) *
          </label>
          <textarea
            id="descriptionUk"
            name="descriptionUk"
            required
            rows={4}
            defaultValue={d.descriptionUk}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="price">
            Ціна (zł) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={d.price}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="priceUnitPl">
            Одиниця (PL)
          </label>
          <input id="priceUnitPl" name="priceUnitPl" defaultValue={d.priceUnitPl} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="priceUnitUk">
            Одиниця (UA)
          </label>
          <input id="priceUnitUk" name="priceUnitUk" defaultValue={d.priceUnitUk} className={inputCls} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" name="available" defaultChecked={d.available} className="h-4 w-4 rounded" />
        Авто доступне для оренди
      </label>

      <div>
        <label className={labelCls} htmlFor="photos">
          Додати фото
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}
