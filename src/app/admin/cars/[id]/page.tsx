import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteCarAction, deletePhotoAction, updateCarAction } from "@/lib/actions/cars";
import CarForm from "@/components/admin/CarForm";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });
  if (!car) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/cars" className="text-sm text-slate-500 hover:text-brand-navy">
        ← Всі авто
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-navy">{car.titlePl}</h1>

      {car.photos.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-700">Фото</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {car.photos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-lg border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="aspect-square w-full object-cover" />
                <form action={deletePhotoAction.bind(null, photo.id, car.id)} className="absolute right-1 top-1">
                  <ConfirmButton
                    confirmText="Видалити це фото?"
                    className="rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white hover:bg-black/80"
                  >
                    ✕
                  </ConfirmButton>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <CarForm action={updateCarAction.bind(null, car.id)} defaults={car} submitLabel="Зберегти зміни" />
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-sm font-semibold text-red-700">Небезпечна зона</h2>
        <p className="mt-1 text-sm text-red-600">Видалення авто незворотне, разом з ним видаляться всі фото.</p>
        <form action={deleteCarAction.bind(null, car.id)} className="mt-3">
          <ConfirmButton
            confirmText={`Видалити авто "${car.titlePl}" назавжди?`}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Видалити авто
          </ConfirmButton>
        </form>
      </div>
    </div>
  );
}
