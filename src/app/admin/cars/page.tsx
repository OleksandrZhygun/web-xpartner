import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCarAction, toggleCarAvailableAction } from "@/lib/actions/cars";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({
    orderBy: [{ order: "asc" }],
    include: { photos: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">Авто</h1>
        <Link
          href="/admin/cars/new"
          className="rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          + Додати авто
        </Link>
      </div>

      {cars.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Ще немає жодного авто. Додайте перше.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="h-20 w-28 flex-none overflow-hidden rounded-lg bg-slate-100">
                {car.photos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={car.photos[0].url} alt={car.titlePl} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">Немає фото</div>
                )}
              </div>

              <div className="flex-1">
                <div className="font-semibold text-brand-navy">{car.titlePl}</div>
                <div className="text-sm text-slate-500">{car.titleUk}</div>
                <div className="mt-1 text-sm text-slate-600">
                  {car.price} zł / {car.priceUnitPl}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <form action={toggleCarAvailableAction.bind(null, car.id, !car.available)}>
                  <button
                    type="submit"
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      car.available ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {car.available ? "Доступне" : "Недоступне"}
                  </button>
                </form>
                <Link
                  href={`/admin/cars/${car.id}`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Редагувати
                </Link>
                <form action={deleteCarAction.bind(null, car.id)}>
                  <ConfirmButton
                    confirmText={`Видалити авто "${car.titlePl}"? Цю дію не можна скасувати.`}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Видалити
                  </ConfirmButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
