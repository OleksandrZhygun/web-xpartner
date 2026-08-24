"use client";

import { useActionState } from "react";
import type { PageContentFormState } from "@/lib/actions/pages";

type Defaults = { titlePl: string; titleUk: string; bodyPl: string; bodyUk: string };
type BoundAction = (state: PageContentFormState, formData: FormData) => Promise<PageContentFormState>;

export default function PageContentForm({ action, defaults }: { action: BoundAction; defaults: Defaults }) {
  const [state, formAction, isPending] = useActionState(action, {});

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
  const labelCls = "mb-1 block text-sm font-medium text-slate-700";

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="titlePl">
            Заголовок (PL)
          </label>
          <input id="titlePl" name="titlePl" defaultValue={defaults.titlePl} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="titleUk">
            Заголовок (UA)
          </label>
          <input id="titleUk" name="titleUk" defaultValue={defaults.titleUk} className={inputCls} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="bodyPl">
            Текст (PL)
          </label>
          <textarea
            id="bodyPl"
            name="bodyPl"
            rows={16}
            defaultValue={defaults.bodyPl}
            className={inputCls}
          />
          <p className="mt-1 text-xs text-slate-400">Порожній рядок = новий абзац.</p>
        </div>
        <div>
          <label className={labelCls} htmlFor="bodyUk">
            Текст (UA)
          </label>
          <textarea
            id="bodyUk"
            name="bodyUk"
            rows={16}
            defaultValue={defaults.bodyUk}
            className={inputCls}
          />
          <p className="mt-1 text-xs text-slate-400">Порожній рядок = новий абзац.</p>
        </div>
      </div>

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
