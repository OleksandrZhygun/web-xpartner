import Link from "next/link";
import { createTestimonialAction } from "@/lib/actions/testimonials";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/testimonials" className="text-sm text-slate-500 hover:text-brand-navy">
        ← Всі відгуки
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-navy">Новий відгук</h1>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <TestimonialForm action={createTestimonialAction} submitLabel="Додати відгук" />
      </div>
    </div>
  );
}
