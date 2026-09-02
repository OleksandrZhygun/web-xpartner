const SOURCE_HOSTS: { match: (host: string) => boolean; source: string }[] = [
  { match: (h) => h.includes("google."), source: "google" },
  { match: (h) => h.includes("bing.com"), source: "bing" },
  { match: (h) => h.includes("duckduckgo.com"), source: "duckduckgo" },
  { match: (h) => h.includes("facebook.com") || h.includes("fb.com"), source: "facebook" },
  { match: (h) => h.includes("instagram.com"), source: "instagram" },
  { match: (h) => h.includes("tiktok.com"), source: "tiktok" },
  { match: (h) => h.includes("wa.me") || h.includes("whatsapp.com"), source: "whatsapp" },
  { match: (h) => h.includes("t.me") || h.includes("telegram"), source: "telegram" },
  { match: (h) => h.includes("olx.pl"), source: "olx" },
];

export function detectSource(referrer: string | null, ownHost: string): string {
  if (!referrer) return "direct";
  try {
    const host = new URL(referrer).host.toLowerCase();
    if (host === ownHost || host === `www.${ownHost}` || `www.${host}` === ownHost) return "internal";
    for (const rule of SOURCE_HOSTS) {
      if (rule.match(host)) return rule.source;
    }
    return "other";
  } catch {
    return "direct";
  }
}
