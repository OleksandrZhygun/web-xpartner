import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";

const NAV = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/cars", label: "Авто" },
  { href: "/admin/testimonials", label: "Відгуки" },
  { href: "/admin/leads", label: "Заявки" },
  { href: "/admin/analytics", label: "Аналітика" },
  { href: "/admin/pages", label: "Сторінки" },
  { href: "/admin/settings", label: "Налаштування" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 flex-none border-r border-slate-200 bg-white sm:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="text-lg font-bold text-brand-navy">
            <span className="text-brand-amber">X-</span>Partner
          </div>
          <div className="text-xs text-slate-400">Адмін-панель</div>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="p-3">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            Вийти
          </button>
        </form>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:hidden">
          <div className="text-lg font-bold text-brand-navy">
            <span className="text-brand-amber">X-</span>Partner
          </div>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-medium text-slate-500">
              Вийти
            </button>
          </form>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 sm:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-none rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
