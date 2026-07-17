import { MessageSquare } from "lucide-react";
import { homeFaqs } from "@/lib/faqs";

export function FAQSection() {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faq-title">
        Frequently
        <br />
        Asked Questions
      </h2>
      <div className="faq-container">
        <div className="faq-left-col">
          <div className="faq-list">
            {homeFaqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary className="faq-question-row">
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    <span className="faq-plus">+</span>
                    <span className="faq-minus">−</span>
                  </span>
                </summary>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.answer}</div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="faq-right-col">
          <div className="faq-more-card">
            <div className="faq-icon-wrapper" aria-hidden="true">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3>Do you have more questions?</h3>
            <p>
              Tell us about the product or workflow you want to improve. We&apos;ll
              help you identify a practical route from idea to production.
            </p>
            <a className="faq-btn" href="/contact">
              Ask us directly
            </a>
          </div>
        </div>
      </div>
      <div className="bottom-rail" aria-hidden="true" />
    </section>
  );
}
