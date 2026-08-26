import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { pageMetadata } from "@/lib/seo";
import LeadForm from "@/components/site/LeadForm";
import WhatsAppLink from "@/components/site/WhatsAppLink";
import { submitLeadAction } from "@/lib/actions/leads";

const META = {
  pl: {
    title: "Kontakt",
    description: "Skontaktuj się z X-Partner w Krakowie w sprawie wynajmu auta lub pracy jako kierowca.",
  },
  uk: {
    title: "Контакти",
    description: "Зв'яжіться з X-Partner у Кракові щодо оренди авто або роботи водієм.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "pl";
  return pageMetadata({ locale, path: "/contact", ...META[locale] });
}

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

  const offices = [
    {
      city: dict.contact.cities.krakow,
      phone: settings?.phone,
      email: settings?.email,
      whatsapp: true,
    },
    {
      city: dict.contact.cities.katowice,
      phone: settings?.katowicePhone,
      email: settings?.katowiceEmail,
      whatsapp: false,
    },
    {
      city: dict.contact.cities.wroclaw,
      phone: settings?.wroclawPhone,
      email: settings?.wroclawEmail,
      whatsapp: false,
    },
  ].filter((office) => office.phone || office.email);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-brand-navy">{title}</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">{intro}</p>

      <div className="mt-10 rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-navy">{dict.contact.formTitle}</h2>
        <div className="mt-4 max-w-xl">
          <LeadForm action={submitLeadAction.bind(null, "CONTACT", null)} dict={dict} />
        </div>
      </div>

      {offices.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-brand-navy">{dict.contact.detailsTitle}</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {offices.map((office) => (
              <div key={office.city} className="rounded-2xl border border-border-subtle bg-surface p-5">
                <div className="font-semibold text-brand-navy">{office.city}</div>
                <dl className="mt-3 space-y-3 text-sm">
                  {office.phone && (
                    <div>
                      <dt className="text-foreground/50">{dict.common.phoneLabel}</dt>
                      <dd className="mt-0.5 flex items-center gap-2">
                        <a
                          href={`tel:${office.phone.replace(/\s+/g, "")}`}
                          className="font-medium text-brand-navy hover:underline"
                        >
                          {office.phone}
                        </a>
                        {office.whatsapp && <WhatsAppLink phone={office.phone} />}
                      </dd>
                    </div>
                  )}
                  {office.email && (
                    <div>
                      <dt className="text-foreground/50">{dict.common.emailLabel}</dt>
                      <dd className="mt-0.5">
                        <a href={`mailto:${office.email}`} className="font-medium text-brand-navy hover:underline">
                          {office.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {office.city === dict.contact.cities.krakow && address && (
                    <div>
                      <dt className="text-foreground/50">{dict.common.addressLabel}</dt>
                      <dd className="mt-0.5 font-medium text-brand-navy">{address}</dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
