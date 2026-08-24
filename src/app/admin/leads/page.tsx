import { prisma } from "@/lib/prisma";
import { deleteLeadAction, markLeadSeenAction } from "@/lib/actions/leads";
import ConfirmButton from "@/components/admin/ConfirmButton";

const TYPE_LABELS: Record<string, string> = {
  CAR: "Авто",
  DRIVER: "Робота водієм",
  CONTACT: "Контакти",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { car: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy">Заявки</h1>
      <p className="mt-1 text-sm text-slate-500">Звернення з форм на сайті.</p>

      {leads.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Поки що немає заявок.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`rounded-xl border p-4 ${
                lead.seen ? "border-slate-200 bg-white" : "border-brand-amber bg-brand-amber/5"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {TYPE_LABELS[lead.type] ?? lead.type}
                    </span>
                    {lead.car && <span className="text-xs text-slate-500">{lead.car.titlePl}</span>}
                    {!lead.seen && (
                      <span className="rounded-full bg-brand-amber px-2.5 py-0.5 text-xs font-semibold text-brand-navy">
                        Нове
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 font-semibold text-brand-navy">{lead.name}</div>
                  <a href={`tel:${lead.phone.replace(/\s+/g, "")}`} className="text-sm text-slate-600 hover:underline">
                    {lead.phone}
                  </a>
                  {lead.message && <p className="mt-2 max-w-xl text-sm text-slate-600">{lead.message}</p>}
                  <div className="mt-2 text-xs text-slate-400">
                    {new Intl.DateTimeFormat("uk-UA", { dateStyle: "medium", timeStyle: "short" }).format(
                      lead.createdAt
                    )}
                  </div>
                </div>

                <div className="flex flex-none flex-col gap-2 sm:flex-row">
                  <form action={markLeadSeenAction.bind(null, lead.id, !lead.seen)}>
                    <button
                      type="submit"
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      {lead.seen ? "Позначити новою" : "Позначити переглянутою"}
                    </button>
                  </form>
                  <form action={deleteLeadAction.bind(null, lead.id)}>
                    <ConfirmButton
                      confirmText="Видалити цю заявку?"
                      className="w-full rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Видалити
                    </ConfirmButton>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
