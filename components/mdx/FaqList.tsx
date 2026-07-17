import { JsonLd } from "@/components/seo/JsonLd";

export type FaqItem = { question: string; answer: string };

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="mdx-faq" aria-label="Frequently asked questions">
      <JsonLd data={schema} />
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}

