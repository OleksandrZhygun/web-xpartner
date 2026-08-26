export default function SocialLinks({
  facebookUrl,
  instagramUrl,
  tiktokUrl,
  variant = "light",
  className,
}: {
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  variant?: "light" | "dark";
  className?: string;
}) {
  if (!facebookUrl && !instagramUrl && !tiktokUrl) return null;

  const iconCls =
    variant === "dark"
      ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
      : "flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-brand-navy hover:bg-slate-100";

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      {facebookUrl && (
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={iconCls}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 8.5h2.5V5.4C16.1 5.28 14.9 5 13.5 5c-2.8 0-4.7 1.76-4.7 5v2.5H6v3.4h2.8V21h3.5v-5.1H15l.5-3.4h-3.2v-2.1c0-1 .27-1.9 1.7-1.9Z" />
          </svg>
        </a>
      )}
      {instagramUrl && (
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconCls}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      )}
      {tiktokUrl && (
        <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={iconCls}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 2h-3v13.2a2.9 2.9 0 1 1-2.05-2.77v-3.08A6 6 0 1 0 16.5 15V8.8a7.5 7.5 0 0 0 4 1.16v-3a4.5 4.5 0 0 1-4-2.2V2z" />
          </svg>
        </a>
      )}
    </div>
  );
}
