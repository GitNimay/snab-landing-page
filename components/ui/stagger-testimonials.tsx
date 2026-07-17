"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "SNAB helped us turn a complicated workflow into a product our team could actually use every day.",
    role: "Product lead",
    context: "Professional services",
    initials: "PL"
  },
  {
    quote:
      "They understood the operational details before proposing the technology. That made every later decision stronger.",
    role: "Operations director",
    context: "Legal workflows",
    initials: "OD"
  },
  {
    quote:
      "The delivery was transparent from discovery through launch, and the system was designed for the next phase too.",
    role: "Founder",
    context: "B2B software",
    initials: "FO"
  },
  {
    quote:
      "We gained a practical AI workflow without losing the review steps and controls that matter to our team.",
    role: "Program manager",
    context: "People operations",
    initials: "PM"
  }
] as const;

export function StaggerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) =>
      (current + direction + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="feedback-stage">
      <div className="feedback-counter" aria-hidden="true">
        <span>0{activeIndex + 1}</span>
        <span>/ 0{testimonials.length}</span>
      </div>

      <article className="feedback-card" key={activeIndex} aria-live="polite">
        <div className="feedback-person" aria-hidden="true">
          {testimonial.initials}
        </div>
        <blockquote>“{testimonial.quote}”</blockquote>
        <p>
          <strong>{testimonial.role}</strong>
          <span>{testimonial.context}</span>
        </p>
      </article>

      <div className="feedback-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next testimonial">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
