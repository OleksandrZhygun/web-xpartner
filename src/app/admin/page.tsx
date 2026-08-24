import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [carsTotal, carsAvailable, leadsNew, leadsTotal] = await Promise.all([
    prisma.car.count(),
    prisma.car.count({ where: { available: true } }),
    prisma.lead.count({ where: { seen: false } }),
    prisma.lead.count(),
  ]);

  const cards = [
    { label: "Авто в базі", value: carsTotal, href: "/admin/cars" },
    { label: "Доступні авто", value: carsAvailable, href: "/admin/cars" },
    { label: "Нові заявки", value: leadsNew, href: "/admin/leads", highlight: leadsNew > 0 },
    { label: "Заявок всього", value: leadsTotal, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy">Дашборд</h1>
      <p className="mt-1 text-sm text-slate-500">Загальний стан сайту X-Partner.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
              card.highlight ? "border-brand-amber bg-brand-amber/10" : "border-slate-200 bg-white"
            }`}
          >
            <div className="text-3xl font-bold text-brand-navy">{card.value}</div>
            <div className="mt-1 text-sm text-slate-500">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/cars/new"
          className="rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          + Додати авто
        </Link>
        <Link
          href="/admin/leads"
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Переглянути заявки
        </Link>
      </div>
    </div>
  );
}
