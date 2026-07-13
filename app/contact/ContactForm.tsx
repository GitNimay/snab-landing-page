"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [state, handleSubmit] = useForm("mrengaww");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (state.succeeded) {
    return (
      <p className="contact-form-status success" role="status">
        Message sent successfully! We&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="contact-form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="contact-form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={2}
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        className="contact-form-submit"
        disabled={state.submitting}
      >
        {state.submitting ? "Sending..." : "Send Message"}
        <Send size={16} aria-hidden="true" />
      </button>

      {state.errors && (
        <p className="contact-form-status error">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
