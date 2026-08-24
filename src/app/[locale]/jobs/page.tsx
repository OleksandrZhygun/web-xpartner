import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import LeadForm from "@/components/site/LeadForm";
import { submitLeadAction } from "@/lib/actions/leads";

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{dict.jobs.pageTitle}</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">{dict.jobs.intro}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-brand-navy">{dict.jobs.benefitsTitle}</h2>
          <ul className="mt-4 space-y-3">
            {dict.jobs.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-sm text-foreground/80">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-amber/20 text-brand-amber-dark">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-navy">{dict.jobs.formTitle}</h2>
          <p className="mt-1 text-sm text-foreground/60">{dict.jobs.formNote}</p>
          <div className="mt-4">
            <LeadForm action={submitLeadAction.bind(null, "DRIVER", null)} dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
