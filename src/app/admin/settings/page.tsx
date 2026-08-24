import { prisma } from "@/lib/prisma";
import { SiteSettingsForm, ChangePasswordForm } from "@/components/admin/SettingsForms";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Налаштування</h1>
        <p className="mt-1 text-sm text-slate-500">Контактні дані, що показуються на сайті.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-700">Контактні дані</h2>
        <div className="mt-4">
          <SiteSettingsForm
            defaults={{
              phone: settings?.phone ?? "",
              email: settings?.email ?? "",
              addressPl: settings?.addressPl ?? "",
              addressUk: settings?.addressUk ?? "",
            }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-700">Зміна пароля адмінки</h2>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
