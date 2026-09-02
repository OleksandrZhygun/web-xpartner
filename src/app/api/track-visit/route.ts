import { prisma } from "@/lib/prisma";
import { detectSource } from "@/lib/traffic-source";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const path = String(body.path ?? "").slice(0, 300);
    const ip = String(body.ip ?? "unknown").slice(0, 100);
    const referrer = body.referrer ? String(body.referrer).slice(0, 500) : null;
    const host = String(body.host ?? "");

    if (!path) return new Response(null, { status: 400 });

    const source = detectSource(referrer, host);

    await prisma.pageVisit.create({
      data: { path, ip, referrer, source },
    });

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
