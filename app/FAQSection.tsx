"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";

const faqs = [
  {
    question: "What AI models and tools do you work with?",
    answer: "We are model-agnostic. We build with leading models from OpenAI, Anthropic, Google, and Meta, and integrate tool-use/function-calling, RAG architectures, and custom workflows tailored to your stack."
  },
  {
    question: "How does the pricing work for custom AI products?",
    answer: "We offer clear, project-based pricing following an initial roadmap phase. There are no hidden fees or agency premiums—we price based on complexity, number of agent integrations, and delivery timeline."
  },
  {
    question: "Can Snabb AI help automate internal company workflows?",
    answer: "Absolutely. We specialize in connecting documents, systems, legacy databases, and teams into secure, automated pipelines that handle data processing, approval routes, and reporting."
  },
  {
    question: "Will we own the intellectual property (IP) of the software?",
    answer: "Yes. Once the project is completed and final payments are made, you own 100% of the custom code, architecture, and proprietary integrations we develop for your business."
  },
  {
    question: "Do you offer post-launch support and optimization?",
    answer: "Yes, we offer monthly retainer packages for continuous monitoring, model fine-tuning, bug fixes, and feature additions to ensure your AI systems run optimally in production."
  }
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? "active" : ""}`}
                  onClick={() => toggleAccordion(index)}
                  role="button"
                  aria-expanded={isOpen}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleAccordion(index);
                    }
                  }}
                >
                  <div className="faq-question-row">
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="faq-right-col">
          <div className="faq-more-card">
            <div className="faq-icon-wrapper" aria-hidden="true">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3>Do you have more questions?</h3>
            <p>
              Get in touch with our team of AI experts. We'll help you plan, integrate, and deploy custom intelligent software.
            </p>
            <a className="faq-btn" href="#contact">
              Shoot a Direct Mail
            </a>
          </div>
        </div>
      </div>
      <div className="bottom-rail" aria-hidden="true" />
    </section>
  );
}
