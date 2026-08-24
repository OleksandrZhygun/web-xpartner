import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import LeadForm from "@/components/site/LeadForm";
import { submitLeadAction } from "@/lib/actions/leads";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const [page, settings] = await Promise.all([
    prisma.pageContent.findUnique({ where: { key: "contact" } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  const title = page ? (locale === "pl" ? page.titlePl : page.titleUk) : dict.contact.pageTitle;
  const intro = page ? (locale === "pl" ? page.bodyPl : page.bodyUk) : dict.contact.intro;
  const address = locale === "pl" ? settings?.addressPl : settings?.addressUk;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{title}</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">{intro}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-navy">{dict.contact.formTitle}</h2>
          <div className="mt-4">
            <LeadForm action={submitLeadAction.bind(null, "CONTACT", null)} dict={dict} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-brand-navy">{dict.contact.detailsTitle}</h2>
          <dl className="mt-4 space-y-4 text-sm">
            {settings?.phone && (
              <div>
                <dt className="text-foreground/50">{dict.common.phoneLabel}</dt>
                <dd className="mt-0.5">
                  <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="font-medium text-brand-navy hover:underline">
                    {settings.phone}
                  </a>
                </dd>
              </div>
            )}
            {settings?.email && (
              <div>
                <dt className="text-foreground/50">{dict.common.emailLabel}</dt>
                <dd className="mt-0.5">
                  <a href={`mailto:${settings.email}`} className="font-medium text-brand-navy hover:underline">
                    {settings.email}
                  </a>
                </dd>
              </div>
            )}
            {address && (
              <div>
                <dt className="text-foreground/50">{dict.common.addressLabel}</dt>
                <dd className="mt-0.5 font-medium text-brand-navy">{address}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
