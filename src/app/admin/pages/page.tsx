import Link from "next/link";

const PAGES = [
  { key: "home", label: "Головна (заголовок і підзаголовок)" },
  { key: "cars", label: "Авто в оренду (вступний текст)" },
  { key: "jobs", label: "Робота водієм (заголовок і вступ)" },
  { key: "about", label: "Про нас / O nas" },
  { key: "privacy", label: "Політика конфіденційності / Polityka prywatności" },
  { key: "contact", label: "Контакти / Kontakt (вступний текст)" },
];

export default function AdminPagesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy">Сторінки</h1>
      <p className="mt-1 text-sm text-slate-500">Редагування текстового вмісту сторінок сайту.</p>

      <div className="mt-6 space-y-3">
        {PAGES.map((page) => (
          <Link
            key={page.key}
            href={`/admin/pages/${page.key}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 font-medium text-brand-navy hover:shadow-sm"
          >
            {page.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
