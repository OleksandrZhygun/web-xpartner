import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";

export default async function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const address = locale === "pl" ? settings?.addressPl : settings?.addressUk;

  return (
    <footer className="mt-16 bg-brand-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="text-lg font-bold text-white">
            X<span className="text-brand-amber">-</span>Partner
          </div>
          <p className="mt-2 max-w-xs text-sm leading-relaxed">{dict.common.tagline}</p>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">{dict.footer.navTitle}</div>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <Link href={`/${locale}/cars`} className="hover:text-white">
              {dict.nav.cars}
            </Link>
            <Link href={`/${locale}/jobs`} className="hover:text-white">
              {dict.nav.jobs}
            </Link>
            <Link href={`/${locale}/testimonials`} className="hover:text-white">
              {dict.nav.testimonials}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-white">
              {dict.nav.about}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {dict.nav.privacy}
            </Link>
          </nav>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">{dict.footer.contactTitle}</div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {settings?.phone && (
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            )}
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            )}
            {address && <span>{address}</span>}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-6">
        &copy; {new Date().getFullYear()} X-Partner — {dict.footer.rights}
      </div>
    </footer>
  );
}
