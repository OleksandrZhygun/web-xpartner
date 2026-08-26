type FaqItem = { q: string; a: string };

export default function FaqSection({ title, items }: { title: string; items: readonly FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="mt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="text-xl font-bold text-brand-navy">{title}</h2>
      <div className="mt-4 divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface">
        {items.map((item) => (
          <details key={item.q} className="group p-4 open:pb-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-brand-navy">
              {item.q}
              <span className="flex-none text-foreground/40 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm text-foreground/70">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
