"use client";

import { useActionState } from "react";
import { updateSettingsAction, changePasswordAction, type SettingsFormState, type PasswordFormState } from "@/lib/actions/settings";

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
const labelCls = "mb-1 block text-sm font-medium text-slate-700";

export function SiteSettingsForm({
  defaults,
}: {
  defaults: {
    phone: string;
    email: string;
    addressPl: string;
    addressUk: string;
    tiktokUrl: string;
    facebookUrl: string;
    katowicePhone: string;
    katowiceEmail: string;
    wroclawPhone: string;
    wroclawEmail: string;
  };
}) {
  const [state, formAction, isPending] = useActionState<SettingsFormState, FormData>(updateSettingsAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <p className="text-sm font-semibold text-slate-700">Краків (головний офіс)</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="phone">
            Телефон
          </label>
          <input id="phone" name="phone" required defaultValue={defaults.phone} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">
            E-mail
          </label>
          <input id="email" name="email" type="email" required defaultValue={defaults.email} className={inputCls} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="addressPl">
            Адреса (PL)
          </label>
          <input id="addressPl" name="addressPl" defaultValue={defaults.addressPl} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="addressUk">
            Адреса (UA)
          </label>
          <input id="addressUk" name="addressUk" defaultValue={defaults.addressUk} className={inputCls} />
        </div>
      </div>

      <p className="pt-2 text-sm font-semibold text-slate-700">Катовіце</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="katowicePhone">
            Телефон
          </label>
          <input id="katowicePhone" name="katowicePhone" defaultValue={defaults.katowicePhone} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="katowiceEmail">
            E-mail
          </label>
          <input id="katowiceEmail" name="katowiceEmail" type="email" defaultValue={defaults.katowiceEmail} className={inputCls} />
        </div>
      </div>

      <p className="pt-2 text-sm font-semibold text-slate-700">Вроцлав</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="wroclawPhone">
            Телефон
          </label>
          <input id="wroclawPhone" name="wroclawPhone" defaultValue={defaults.wroclawPhone} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="wroclawEmail">
            E-mail
          </label>
          <input id="wroclawEmail" name="wroclawEmail" type="email" defaultValue={defaults.wroclawEmail} className={inputCls} />
        </div>
      </div>

      <p className="pt-2 text-sm font-semibold text-slate-700">Соцмережі</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="facebookUrl">
            Facebook (посилання на сторінку)
          </label>
          <input
            id="facebookUrl"
            name="facebookUrl"
            placeholder="https://facebook.com/..."
            defaultValue={defaults.facebookUrl}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="tiktokUrl">
            TikTok (посилання на профіль)
          </label>
          <input
            id="tiktokUrl"
            name="tiktokUrl"
            placeholder="https://tiktok.com/@..."
            defaultValue={defaults.tiktokUrl}
            className={inputCls}
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm font-medium text-emerald-600">Збережено.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Збереження..." : "Зберегти"}
      </button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState<PasswordFormState, FormData>(changePasswordAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className={labelCls} htmlFor="currentPassword">
          Поточний пароль
        </label>
        <input id="currentPassword" name="currentPassword" type="password" required className={inputCls} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="newPassword">
            Новий пароль
          </label>
          <input id="newPassword" name="newPassword" type="password" required minLength={6} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="confirmPassword">
            Повторіть новий пароль
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} className={inputCls} />
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm font-medium text-emerald-600">Пароль змінено.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "Збереження..." : "Змінити пароль"}
      </button>
    </form>
  );
}
