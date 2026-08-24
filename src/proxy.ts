import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";

const LOCALES = ["pl", "uk"];
const DEFAULT_LOCALE = "pl";

function detectLocale(req: NextRequest): string {
  const acceptLang = req.headers.get("accept-language") ?? "";
  const primary = acceptLang.split(",")[0] ?? "";
  if (/^uk|^ru/i.test(primary)) return "uk";
  return DEFAULT_LOCALE;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const valid = await verifySessionToken(token);

    if (pathname === "/admin/login") {
      if (valid) return NextResponse.redirect(new URL("/admin", req.url));
      return NextResponse.next();
    }

    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];
  if (LOCALES.includes(firstSegment)) {
    return NextResponse.next();
  }

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
