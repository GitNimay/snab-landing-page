"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight, Check, FileText, LoaderCircle, Upload, X } from "lucide-react";
import { insforge } from "@/lib/insforge";
import type { CareerJob } from "@/lib/careers";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type ApplicationFormProps = {
  job?: Pick<CareerJob, "id" | "title">;
};

function cleanFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-");
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Your résumé could not be read."));
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.readAsDataURL(file);
  });
}

export function ApplicationForm({ job }: ApplicationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function chooseFile(nextFile?: File) {
    setError("");
    if (!nextFile) return;
    if (!ALLOWED_TYPES.has(nextFile.type)) {
      setError("Please upload a PDF, DOC, or DOCX résumé.");
      return;
    }
    if (nextFile.size > MAX_FILE_SIZE) {
      setError("Your résumé must be 5 MB or smaller.");
      return;
    }
    setFile(nextFile);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!file) {
      setError("Please attach your résumé before submitting.");
      fileInputRef.current?.focus();
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get("website")) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationId = crypto.randomUUID();
      const resumeBase64 = await fileToBase64(file);

      const optional = (name: string) => {
        const value = String(formData.get(name) || "").trim();
        return value || null;
      };

      const application = {
        id: applicationId,
        application_type: job ? "job" : "general",
        job_id: job?.id ?? null,
        first_name: String(formData.get("first_name") || "").trim(),
        last_name: String(formData.get("last_name") || "").trim(),
        email: String(formData.get("email") || "").trim().toLowerCase(),
        phone: optional("phone"),
        location: String(formData.get("location") || "").trim(),
        linkedin_url: optional("linkedin_url"),
        portfolio_url: optional("portfolio_url"),
        years_experience: optional("years_experience"),
        current_company: optional("current_company"),
        current_title: optional("current_title"),
        notice_period: optional("notice_period"),
        preferred_role: job ? null : String(formData.get("preferred_role") || "").trim(),
        cover_note: String(formData.get("cover_note") || "").trim(),
        resume_name: cleanFileName(file.name),
        resume_size: file.size,
        resume_type: file.type,
        consent: formData.get("consent") === "on",
      };

      const { error: insertError } = await insforge.database.rpc("submit_career_application", {
        p_application: application,
        p_resume_base64: resumeBase64,
      });

      if (insertError) throw new Error(insertError.message || "Your application could not be saved.");

      form.reset();
      setFile(null);
      setSubmitted(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="application-success" role="status">
        <span className="application-success-icon"><Check aria-hidden="true" /></span>
        <p className="form-kicker">Application received</p>
        <h2>Thank you for raising your hand.</h2>
        <p>
          We&apos;ll review your application carefully. If there&apos;s a strong match, our team will contact you using the email you provided.
        </p>
        <a href="/careers">View other opportunities <ArrowRight size={17} /></a>
      </div>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-intro-row">
        <div>
          <p className="form-kicker">Your application</p>
          <h2>{job ? `Apply for ${job.title}` : "Join our talent network"}</h2>
        </div>
        <p>About 4 minutes · No account needed</p>
      </div>

      <fieldset>
        <legend><span>01</span> About you</legend>
        <div className="form-grid two-columns">
          <label>First name <span>*</span><input name="first_name" autoComplete="given-name" required /></label>
          <label>Last name <span>*</span><input name="last_name" autoComplete="family-name" required /></label>
          <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone number <em>Optional</em><input name="phone" type="tel" autoComplete="tel" /></label>
          <label className="full-width">Current city / location <span>*</span><input name="location" autoComplete="address-level2" placeholder="e.g. Nashik, Maharashtra" required /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend><span>02</span> Your work</legend>
        <div className="form-grid two-columns">
          {!job ? <label className="full-width">Role or field you&apos;re interested in <span>*</span><input name="preferred_role" placeholder="e.g. Product engineering, AI research" required /></label> : null}
          <label>LinkedIn profile <em>Optional</em><input name="linkedin_url" type="url" inputMode="url" placeholder="https://linkedin.com/in/..." /></label>
          <label>Portfolio / GitHub <em>Optional</em><input name="portfolio_url" type="url" inputMode="url" placeholder="https://" /></label>
          <label>Years of experience <em>Optional</em>
            <select name="years_experience" defaultValue="">
              <option value="">Select</option><option>0–1 year</option><option>2–3 years</option><option>4–6 years</option><option>7–10 years</option><option>10+ years</option>
            </select>
          </label>
          <label>Notice period / availability <em>Optional</em><input name="notice_period" placeholder="e.g. 30 days" /></label>
          <label>Current company <em>Optional</em><input name="current_company" autoComplete="organization" /></label>
          <label>Current title <em>Optional</em><input name="current_title" autoComplete="organization-title" /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend><span>03</span> The useful context</legend>
        <label className="textarea-label">
          {job ? "Why this role, and what would you bring?" : "What kind of work are you looking to do?"} <span>*</span>
          <textarea name="cover_note" rows={6} maxLength={1800} placeholder="A short, honest note is perfect — no formal cover letter needed." required />
        </label>

        <div className="resume-field">
          <div className="resume-field-copy">
            <p>Résumé / CV <span>*</span></p>
            <small>PDF, DOC, or DOCX · Maximum 5 MB</small>
          </div>
          <input
            ref={fileInputRef}
            className="visually-hidden-file"
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => chooseFile(event.target.files?.[0])}
            required={!file}
          />
          {file ? (
            <div className="resume-selected">
              <FileText size={21} aria-hidden="true" />
              <span><strong>{file.name}</strong><small>{(file.size / 1024 / 1024).toFixed(2)} MB</small></span>
              <button type="button" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} aria-label="Remove résumé"><X size={18} /></button>
            </div>
          ) : (
            <label className="resume-drop" htmlFor="resume"><Upload size={20} aria-hidden="true" /> Choose résumé</label>
          )}
        </div>
      </fieldset>

      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <label className="consent-row">
        <input type="checkbox" name="consent" required />
        <span>I agree that SNAB Innovations may use my information to evaluate this application and contact me about relevant opportunities. <strong>*</strong></span>
      </label>

      {error ? <p className="application-error" role="alert">{error}</p> : null}

      <button className="application-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <><LoaderCircle className="spin" size={19} /> Sending application</> : <>Submit application <ArrowRight size={19} /></>}
      </button>
      <p className="privacy-note">We only ask for information our hiring team can actually use. Please don&apos;t include sensitive personal data.</p>
    </form>
  );
}
