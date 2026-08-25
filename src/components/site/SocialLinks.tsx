export default function SocialLinks({
  instagramUrl,
  tiktokUrl,
  variant = "light",
  className,
}: {
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  variant?: "light" | "dark";
  className?: string;
}) {
  if (!instagramUrl && !tiktokUrl) return null;

  const iconCls =
    variant === "dark"
      ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
      : "flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-brand-navy hover:bg-slate-100";

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
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
