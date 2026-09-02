import { prisma } from "@/lib/prisma";

const SOURCE_LABELS: Record<string, string> = {
  direct: "Прямі заходи (ввели адресу)",
  google: "Google",
  bing: "Bing",
  duckduckgo: "DuckDuckGo",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  olx: "OLX",
  internal: "Внутрішні переходи по сайту",
  other: "Інше джерело",
};

export default async function AdminAnalyticsPage() {
  const [totalVisits, bySource, recentVisits, allIps] = await Promise.all([
    prisma.pageVisit.count(),
    prisma.pageVisit.groupBy({ by: ["source"], _count: { source: true } }),
    prisma.pageVisit.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.pageVisit.findMany({ select: { ip: true } }),
  ]);

  const uniqueIps = new Set(allIps.map((v) => v.ip)).size;
  const sortedSources = [...bySource].sort((a, b) => b._count.source - a._count.source);
  const maxCount = sortedSources[0]?._count.source ?? 1;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy">Аналітика</h1>
      <p className="mt-1 text-sm text-slate-500">
        Прості дані про відвідування сайту — без сторонніх сервісів типу Google Analytics.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-3xl font-bold text-brand-navy">{totalVisits}</div>
          <div className="mt-1 text-sm text-slate-500">Переглядів сторінок всього</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-3xl font-bold text-brand-navy">{uniqueIps}</div>
          <div className="mt-1 text-sm text-slate-500">Унікальних IP-адрес</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-700">Звідки приходять відвідувачі</h2>
        {sortedSources.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Даних ще немає — з&apos;являться після перших відвідувань.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {sortedSources.map((row) => (
              <div key={row.source}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{SOURCE_LABELS[row.source] ?? row.source}</span>
                  <span className="text-slate-500">{row._count.source}</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-amber"
                    style={{ width: `${(row._count.source / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-700">Останні відвідування</h2>
        {recentVisits.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Поки що порожньо.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-2 pr-4 font-medium">Час</th>
                  <th className="pb-2 pr-4 font-medium">Сторінка</th>
                  <th className="pb-2 pr-4 font-medium">Джерело</th>
                  <th className="pb-2 font-medium">IP</th>
                </tr>
              </thead>
              <tbody>
                {recentVisits.map((visit) => (
                  <tr key={visit.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 pr-4 text-slate-500">
                      {new Intl.DateTimeFormat("uk-UA", { dateStyle: "short", timeStyle: "short" }).format(
                        visit.createdAt
                      )}
                    </td>
                    <td className="py-2 pr-4 text-brand-navy">{visit.path}</td>
                    <td className="py-2 pr-4 text-slate-600">{SOURCE_LABELS[visit.source] ?? visit.source}</td>
                    <td className="py-2 text-slate-400">{visit.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
