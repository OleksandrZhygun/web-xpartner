import Link from "next/link";
import { createCarAction } from "@/lib/actions/cars";
import CarForm from "@/components/admin/CarForm";

export default function NewCarPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/cars" className="text-sm text-slate-500 hover:text-brand-navy">
        ← Всі авто
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-navy">Нове авто</h1>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <CarForm action={createCarAction} submitLabel="Додати авто" />
      </div>
    </div>
  );
}
