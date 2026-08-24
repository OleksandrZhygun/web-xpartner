"use client";

type Defaults = {
  name: string;
  textPl: string;
  textUk: string;
  published: boolean;
};

export default function TestimonialForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: Partial<Defaults>;
  submitLabel: string;
}) {
  const d: Defaults = {
    name: defaults?.name ?? "",
    textPl: defaults?.textPl ?? "",
    textUk: defaults?.textUk ?? "",
    published: defaults?.published ?? true,
  };

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
  const labelCls = "mb-1 block text-sm font-medium text-slate-700";

  return (
    <form action={action} className="space-y-6">
      <div>
        <label className={labelCls} htmlFor="name">
          Ім&apos;я водія *
        </label>
        <input id="name" name="name" required defaultValue={d.name} className={inputCls} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="textPl">
            Відгук (PL) *
          </label>
          <textarea id="textPl" name="textPl" required rows={5} defaultValue={d.textPl} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="textUk">
            Відгук (UA) *
          </label>
          <textarea id="textUk" name="textUk" required rows={5} defaultValue={d.textUk} className={inputCls} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" name="published" defaultChecked={d.published} className="h-4 w-4 rounded" />
        Показувати на сайті
      </label>

      <div>
        <label className={labelCls} htmlFor="photo">
          Фото (необов&apos;язково)
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}
