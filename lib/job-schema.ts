import type { CareerJob } from "@/lib/careers";
import { absoluteUrl, siteConfig } from "@/lib/site";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function list(items: string[]) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function employmentType(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("part")) return "PART_TIME";
  if (normalized.includes("contract")) return "CONTRACTOR";
  if (normalized.includes("intern")) return "INTERN";
  if (normalized.includes("temporary")) return "TEMPORARY";
  return "FULL_TIME";
}

export function createJobPostingSchema(job: CareerJob) {
  const isRemote = job.work_mode.trim().toLowerCase() === "remote";
  const description = [
    `<p>${escapeHtml(job.summary)}</p>`,
    `<p>${escapeHtml(job.description)}</p>`,
    "<h2>Responsibilities</h2>",
    list(job.responsibilities),
    "<h2>Requirements</h2>",
    list(job.requirements),
    job.nice_to_have.length
      ? `<h2>Nice to have</h2>${list(job.nice_to_have)}`
      : "",
  ].join("");

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${absoluteUrl(`/careers/${job.slug}`)}#job`,
    title: job.title,
    description,
    identifier: {
      "@type": "PropertyValue",
      name: siteConfig.name,
      value: job.id,
    },
    datePosted: job.posted_at || job.created_at,
    ...(job.closes_at ? { validThrough: job.closes_at } : {}),
    employmentType: employmentType(job.employment_type),
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: absoluteUrl("/logo.png"),
    },
    ...(isRemote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: {
            "@type": "Country",
            name: "India",
          },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location,
              addressRegion: siteConfig.location.region,
              addressCountry: siteConfig.location.country,
            },
          },
        }),
  };
}

