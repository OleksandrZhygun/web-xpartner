import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePageContentAction } from "@/lib/actions/pages";
import PageContentForm from "@/components/admin/PageContentForm";

const KNOWN_KEYS: Record<string, string> = {
  about: "Про нас / O nas",
  privacy: "Політика конфіденційності / Polityka prywatności",
  contact: "Контакти / Kontakt (вступний текст)",
};

export default async function AdminPageContentEditPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!KNOWN_KEYS[key]) notFound();

  const page = await prisma.pageContent.findUnique({ where: { key } });

  return (
    <div className="max-w-4xl">
      <Link href="/admin/pages" className="text-sm text-slate-500 hover:text-brand-navy">
        ← Всі сторінки
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-navy">{KNOWN_KEYS[key]}</h1>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <PageContentForm
          action={updatePageContentAction.bind(null, key)}
          defaults={{
            titlePl: page?.titlePl ?? "",
            titleUk: page?.titleUk ?? "",
            bodyPl: page?.bodyPl ?? "",
            bodyUk: page?.bodyUk ?? "",
          }}
        />
      </div>
    </div>
  );
}
