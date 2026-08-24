import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonialAction, toggleTestimonialPublishedAction } from "@/lib/actions/testimonials";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">Відгуки водіїв</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          + Додати відгук
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Ще немає жодного відгуку.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="h-16 w-16 flex-none overflow-hidden rounded-full bg-slate-100">
                {t.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photoUrl} alt={t.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">Без фото</div>
                )}
              </div>

              <div className="flex-1">
                <div className="font-semibold text-brand-navy">{t.name}</div>
                <div className="mt-1 line-clamp-2 text-sm text-slate-600">{t.textPl}</div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <form action={toggleTestimonialPublishedAction.bind(null, t.id, !t.published)}>
                  <button
                    type="submit"
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      t.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {t.published ? "Опубліковано" : "Приховано"}
                  </button>
                </form>
                <Link
                  href={`/admin/testimonials/${t.id}`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Редагувати
                </Link>
                <form action={deleteTestimonialAction.bind(null, t.id)}>
                  <ConfirmButton
                    confirmText={`Видалити відгук "${t.name}"?`}
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
