import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{dict.testimonials.pageTitle}</h1>
      <p className="mt-3 max-w-2xl text-foreground/70">{dict.testimonials.intro}</p>

      {testimonials.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border-subtle p-8 text-center text-foreground/60">
          {dict.testimonials.emptyState}
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex-none overflow-hidden rounded-full bg-slate-100">
                  {t.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.photoUrl} alt={t.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="font-semibold text-brand-navy">{t.name}</div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {locale === "pl" ? t.textPl : t.textUk}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
