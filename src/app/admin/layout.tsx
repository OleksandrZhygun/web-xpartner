import "../globals.css";
import { isAdminAuthenticated } from "@/lib/auth-guard";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "X-Partner — Адмін-панель",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();

  return (
    <html lang="uk" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">
        {authed ? <AdminShell>{children}</AdminShell> : children}
      </body>
    </html>
  );
}
