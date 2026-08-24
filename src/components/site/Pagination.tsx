import Link from "next/link";

export default function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Link
        href={page > 1 ? `${basePath}?page=${page - 1}` : `${basePath}?page=${page}`}
        aria-disabled={page <= 1}
        className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${
          page <= 1
            ? "pointer-events-none border-border-subtle text-foreground/30"
            : "border-border-subtle text-brand-navy hover:bg-slate-100"
        }`}
      >
        ‹
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${
            p === page
              ? "border-brand-navy bg-brand-navy text-white"
              : "border-border-subtle text-brand-navy hover:bg-slate-100"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={page < totalPages ? `${basePath}?page=${page + 1}` : `${basePath}?page=${page}`}
        aria-disabled={page >= totalPages}
        className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${
          page >= totalPages
            ? "pointer-events-none border-border-subtle text-foreground/30"
            : "border-border-subtle text-brand-navy hover:bg-slate-100"
        }`}
      >
        ›
      </Link>
    </nav>
  );
}
