import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteTestimonialAction, updateTestimonialAction } from "@/lib/actions/testimonials";
import TestimonialForm from "@/components/admin/TestimonialForm";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/testimonials" className="text-sm text-slate-500 hover:text-brand-navy">
        ← Всі відгуки
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-navy">{testimonial.name}</h1>

      {testimonial.photoUrl && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-slate-700">Поточне фото</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={testimonial.photoUrl}
            alt={testimonial.name}
            className="mt-3 h-32 w-32 rounded-full object-cover"
          />
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <TestimonialForm
          action={updateTestimonialAction.bind(null, testimonial.id)}
          defaults={testimonial}
          submitLabel="Зберегти зміни"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-sm font-semibold text-red-700">Небезпечна зона</h2>
        <form action={deleteTestimonialAction.bind(null, testimonial.id)} className="mt-3">
          <ConfirmButton
            confirmText={`Видалити відгук "${testimonial.name}" назавжди?`}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Видалити відгук
          </ConfirmButton>
        </form>
      </div>
    </div>
  );
}
