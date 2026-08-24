import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import PageBody from "@/components/site/PageBody";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const page = await prisma.pageContent.findUnique({ where: { key: "about" } });
  const title = page ? (locale === "pl" ? page.titlePl : page.titleUk) : dict.nav.about;
  const body = page ? (locale === "pl" ? page.bodyPl : page.bodyUk) : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{title}</h1>
      <div className="mt-6">
        <PageBody text={body} />
      </div>
    </div>
  );
}
