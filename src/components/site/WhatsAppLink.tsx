export default function WhatsAppLink({ phone }: { phone: string }) {
  const digits = phone.replace(/[^\d]/g, "");

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-90"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.2 14.2c-.22.62-1.28 1.2-1.77 1.24-.45.05-1.02.07-1.65-.1-.38-.1-.87-.28-1.5-.55-2.64-1.14-4.36-3.8-4.5-3.98-.13-.18-1.08-1.44-1.08-2.74 0-1.3.68-1.93.93-2.2.24-.26.53-.33.7-.33h.5c.16 0 .38-.06.6.45.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.14.29-.27.45-.13.15-.28.34-.4.46-.13.13-.27.27-.12.53.16.26.7 1.16 1.51 1.88 1.04.93 1.91 1.22 2.17 1.36.27.13.42.11.58-.07.16-.18.67-.78.85-1.05.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.45.2.51.31.07.11.07.65-.15 1.27Z" />
      </svg>
    </a>
  );
}
