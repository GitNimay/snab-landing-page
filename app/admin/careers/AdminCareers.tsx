"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminCareersSkeleton } from "./AdminCareersSkeleton";
import { AlertTriangle, ArrowUpRight, BriefcaseBusiness, CalendarClock, ChevronRight, FileText, LoaderCircle, LogOut, Mail, MapPin, Plus, Search, Trash2, Users, X } from "lucide-react";
import type { ApplicationStatus, CareerApplication, CareerJob, JobStatus } from "@/lib/careers";

const applicationStatuses: ApplicationStatus[] = ["new", "reviewing", "shortlisted", "interview", "offer", "hired", "rejected", "archived"];
const blankJob = { title: "", slug: "", department: "", employment_type: "Full-time", work_mode: "Hybrid", location: "", experience_level: "", summary: "", description: "", responsibilities: "", requirements: "", nice_to_have: "", closes_at: "", status: "draft" as JobStatus, featured: false };
type JobDraft = typeof blankJob & { id?: string };

function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
  return [];
}

function formatDate(value: string) { return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value)); }
function formatSize(bytes: number) { return `${(bytes / 1024 / 1024).toFixed(2)} MB`; }
function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}
function isExpired(job: CareerJob) { return Boolean(job.closes_at && new Date(job.closes_at).getTime() <= Date.now()); }
function deadlineLabel(job: CareerJob) {
  if (!job.closes_at) return "Open until filled";
  return `${isExpired(job) ? "Expired" : "Closes"} ${formatDate(job.closes_at)}`;
}

export function AdminCareers() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [activeView, setActiveView] = useState<"applications" | "jobs">("applications");
  const [typeFilter, setTypeFilter] = useState<"all" | "job" | "general">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ApplicationStatus>("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CareerApplication | null>(null);
  const [jobDraft, setJobDraft] = useState<JobDraft | null>(null);
  const [jobToDelete, setJobToDelete] = useState<CareerJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true); setError("");
    const response = await fetch("/api/admin/careers", { cache: "no-store" });
    if (response.status === 401) { setLoading(false); router.replace("/admin"); return; }
    const payload = await response.json();
    if (!response.ok) { setError(payload.error || "Could not load careers data."); setAuthenticated(true); setLoading(false); return; }
    setApplications(toArray(payload.applications) as CareerApplication[]);
    setJobs(toArray(payload.jobs) as CareerJob[]);
    setAuthenticated(true); setLoading(false);
  }, [router]);

  useEffect(() => { void loadData(); }, [loadData]);

  const filtered = useMemo(() => applications.filter((application) => {
    if (typeFilter !== "all" && application.application_type !== typeFilter) return false;
    if (statusFilter !== "all" && application.status !== statusFilter) return false;
    if (jobFilter !== "all" && application.job_id !== jobFilter) return false;
    const needle = query.trim().toLowerCase();
    return !needle || `${application.first_name} ${application.last_name} ${application.email} ${application.job_title || application.preferred_role || ""}`.toLowerCase().includes(needle);
  }), [applications, jobFilter, query, statusFilter, typeFilter]);

  async function logout() { await fetch("/api/admin/careers/session", { method: "DELETE" }); router.replace("/admin"); }

  async function updateStatus(application: CareerApplication, status: ApplicationStatus) {
    setError("");
    const response = await fetch("/api/admin/careers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "update_application_status", applicationId: application.id, status }) });
    const payload = await response.json();
    if (!response.ok) { setError(payload.error || "Could not update status."); return; }
    setApplications((current) => current.map((item) => item.id === application.id ? { ...item, status } : item));
    setSelected((current) => current?.id === application.id ? { ...current, status } : current);
  }

  function editJob(job: CareerJob) { setJobDraft({ ...job, closes_at: toDateTimeLocal(job.closes_at), responsibilities: job.responsibilities.join("\n"), requirements: job.requirements.join("\n"), nice_to_have: job.nice_to_have.join("\n") }); }

  async function saveJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!jobDraft) return; setLoading(true); setError("");
    const lines = (value: string) => value.split("\n").map((line) => line.trim()).filter(Boolean);
    const payloadJob = { ...jobDraft, closes_at: jobDraft.closes_at ? new Date(jobDraft.closes_at).toISOString() : null, responsibilities: lines(jobDraft.responsibilities), requirements: lines(jobDraft.requirements), nice_to_have: lines(jobDraft.nice_to_have) };
    const response = await fetch("/api/admin/careers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save_job", job: payloadJob }) });
    const payload = await response.json();
    if (!response.ok) { setError(payload.error || "Could not save job."); setLoading(false); return; }
    setJobDraft(null); await loadData();
  }

  async function deleteJob() {
    if (!jobToDelete) return;
    setLoading(true); setError("");
    const response = await fetch("/api/admin/careers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete_job", jobId: jobToDelete.id }) });
    const payload = await response.json();
    if (!response.ok) { setError(payload.error || "Could not delete this posting."); setLoading(false); return; }
    setJobToDelete(null); await loadData();
  }

  if (authenticated === null || (loading && authenticated === null)) return <AdminCareersSkeleton />;
  if (!authenticated) return <div className="admin-loading"><LoaderCircle className="spin" /><span>Redirecting to admin login</span></div>;

  const newCount = applications.filter((item) => item.status === "new").length;
  const generalCount = applications.filter((item) => item.application_type === "general").length;

  return <main className="admin-careers">
    <aside className="admin-sidebar">
      <a className="admin-brand" href="/careers"><span className="admin-brand-mark" />SNAB</a>
      <p>Hiring desk</p>
      <nav><button className={activeView === "applications" ? "active" : ""} onClick={() => setActiveView("applications")}><Users size={18} />Applications<span>{applications.length}</span></button><button className={activeView === "jobs" ? "active" : ""} onClick={() => setActiveView("jobs")}><BriefcaseBusiness size={18} />Job postings<span>{jobs.length}</span></button></nav>
      <div className="admin-sidebar-bottom"><a href="/careers" target="_blank">View careers site <ArrowUpRight size={15} /></a><button onClick={logout}><LogOut size={15} />Sign out</button></div>
    </aside>

    <div className="admin-workspace">
      <header className="admin-header"><div><p>Recruiting / {activeView}</p><h1>{activeView === "applications" ? "Candidate inbox" : "Job postings"}</h1></div>{activeView === "jobs" ? <button className="admin-primary" onClick={() => setJobDraft({ ...blankJob })}><Plus size={17} />New job</button> : null}</header>
      {error ? <div className="admin-banner" role="alert">{error}<button onClick={() => setError("")}><X size={16} /></button></div> : null}

      {activeView === "applications" ? <>
        <section className="admin-stats"><article><span>Total candidates</span><strong>{applications.length}</strong><Users size={19} /></article><article><span>New to review</span><strong>{newCount}</strong><FileText size={19} /></article><article><span>General applications</span><strong>{generalCount}</strong><Mail size={19} /></article></section>
        <section className="admin-filters"><div className="admin-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidate, email, or role" /></div><select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as typeof typeFilter)}><option value="all">All application types</option><option value="job">Job-specific</option><option value="general">General applications</option></select><select value={jobFilter} onChange={(event) => setJobFilter(event.target.value)}><option value="all">All roles</option>{jobs.map((job) => <option value={job.id} key={job.id}>{job.title}</option>)}</select><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}><option value="all">All stages</option>{applicationStatuses.map(status => <option value={status} key={status}>{status}</option>)}</select></section>
        <section className="applications-table"><div className="table-head"><span>Candidate</span><span>Application</span><span>Location</span><span>Received</span><span>Stage</span><span /></div>{filtered.length ? filtered.map((application) => <button className="application-row" key={application.id} onClick={() => setSelected(application)}><span className="candidate-cell"><i>{application.first_name[0]}{application.last_name[0]}</i><b>{application.first_name} {application.last_name}<small>{application.email}</small></b></span><span><strong>{application.application_type === "job" ? application.job_title : application.preferred_role}</strong><small>{application.application_type === "job" ? "Job-specific" : "General application"}</small></span><span><MapPin size={13} />{application.location}</span><span>{formatDate(application.created_at)}</span><span className={`status-badge status-${application.status}`}>{application.status}</span><ChevronRight size={17} /></button>) : <div className="admin-empty">No applications match these filters.</div>}</section>
      </> : <section className="jobs-admin-list">{jobs.map((job) => {
        const expired = isExpired(job);
        const displayStatus = expired && job.status === "published" ? "expired" : job.status;
        return <article key={job.id} className={job.status === "deleted" ? "job-deleted" : ""}>
          <div>
            <span className={`job-status job-status-${displayStatus}`}>{displayStatus}</span><p>{job.department}</p>
            <h2>{job.title}</h2>
            <small>{job.location} · {job.work_mode} · {job.employment_type}</small>
            <span className={`job-admin-deadline ${expired ? "expired" : ""}`}><CalendarClock size={13} />{deadlineLabel(job)}</span>
          </div>
          <div className="job-admin-count"><strong>{applications.filter(item => item.job_id === job.id).length}</strong><span>applications</span></div>
          <div className="job-actions">
            {job.status !== "deleted" ? <><button onClick={() => editJob(job)}>Edit posting</button><button className="job-delete-button" onClick={() => setJobToDelete(job)}><Trash2 size={14} />Delete</button></> : <span>Removed from careers</span>}
          </div>
        </article>;
      })}</section>}
    </div>

    {selected ? <div className="admin-drawer-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><aside className="admin-drawer"><button className="drawer-close" onClick={() => setSelected(null)}><X /></button><div className="drawer-candidate"><span>{selected.first_name[0]}{selected.last_name[0]}</span><p>{selected.application_type === "job" ? selected.job_title : "General application"}</p><h2>{selected.first_name} {selected.last_name}</h2><small>Applied {formatDate(selected.created_at)}</small></div><label className="drawer-stage">Hiring stage<select value={selected.status} onChange={(event) => updateStatus(selected, event.target.value as ApplicationStatus)}>{applicationStatuses.map(status => <option key={status}>{status}</option>)}</select></label><section className="drawer-section"><h3>Contact</h3><a href={`mailto:${selected.email}`}>{selected.email}</a>{selected.phone ? <a href={`tel:${selected.phone}`}>{selected.phone}</a> : null}<p>{selected.location}</p></section><section className="drawer-section"><h3>Professional profile</h3><dl><div><dt>Experience</dt><dd>{selected.years_experience || "—"}</dd></div><div><dt>Current role</dt><dd>{[selected.current_title, selected.current_company].filter(Boolean).join(" at ") || "—"}</dd></div><div><dt>Availability</dt><dd>{selected.notice_period || "—"}</dd></div></dl><div className="drawer-links">{selected.linkedin_url ? <a href={selected.linkedin_url} target="_blank">LinkedIn <ArrowUpRight size={14} /></a> : null}{selected.portfolio_url ? <a href={selected.portfolio_url} target="_blank">Portfolio / GitHub <ArrowUpRight size={14} /></a> : null}</div></section><section className="drawer-section"><h3>Candidate note</h3><p className="candidate-note">{selected.cover_note}</p></section><a className="resume-link" href={selected.resume_url} target="_blank"><FileText /><span><strong>{selected.resume_name}</strong><small>{formatSize(selected.resume_size)}</small></span><ArrowUpRight size={17} /></a></aside></div> : null}

    {jobDraft ? <div className="admin-modal-scrim"><form className="job-editor" onSubmit={saveJob}><header><div><p>Job posting</p><h2>{jobDraft.id ? "Edit role" : "Create role"}</h2></div><button type="button" onClick={() => setJobDraft(null)} aria-label="Close editor"><X /></button></header><div className="job-editor-body"><div className="editor-grid"><label>Role title<input value={jobDraft.title} onChange={e => setJobDraft({ ...jobDraft, title: e.target.value })} required /></label><label>URL slug<input value={jobDraft.slug} onChange={e => setJobDraft({ ...jobDraft, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })} required /></label><label>Department<input value={jobDraft.department} onChange={e => setJobDraft({ ...jobDraft, department: e.target.value })} required /></label><label>Experience level<input value={jobDraft.experience_level} onChange={e => setJobDraft({ ...jobDraft, experience_level: e.target.value })} placeholder="e.g. 2–5 years" required /></label><label>Employment type<input value={jobDraft.employment_type} onChange={e => setJobDraft({ ...jobDraft, employment_type: e.target.value })} required /></label><label>Work style<input value={jobDraft.work_mode} onChange={e => setJobDraft({ ...jobDraft, work_mode: e.target.value })} required /></label><label className="editor-full">Location<input value={jobDraft.location} onChange={e => setJobDraft({ ...jobDraft, location: e.target.value })} required /></label><label>Application deadline <small>Optional</small><input type="datetime-local" value={jobDraft.closes_at} onChange={e => setJobDraft({ ...jobDraft, closes_at: e.target.value })} /></label><label>Status<select value={jobDraft.status} onChange={e => setJobDraft({ ...jobDraft, status: e.target.value as JobStatus })}><option value="draft">Draft</option><option value="published">Published</option><option value="closed">Closed</option></select></label><label className="editor-full">Short summary<textarea rows={3} value={jobDraft.summary} onChange={e => setJobDraft({ ...jobDraft, summary: e.target.value })} required /></label><label className="editor-full">Role overview<textarea rows={5} value={jobDraft.description} onChange={e => setJobDraft({ ...jobDraft, description: e.target.value })} required /></label><label className="editor-full">Responsibilities <small>One item per line</small><textarea rows={6} value={jobDraft.responsibilities} onChange={e => setJobDraft({ ...jobDraft, responsibilities: e.target.value })} required /></label><label className="editor-full">Requirements <small>One item per line</small><textarea rows={6} value={jobDraft.requirements} onChange={e => setJobDraft({ ...jobDraft, requirements: e.target.value })} required /></label><label className="editor-full">Nice to have <small>One item per line</small><textarea rows={4} value={jobDraft.nice_to_have} onChange={e => setJobDraft({ ...jobDraft, nice_to_have: e.target.value })} /></label><label className="featured-check"><input type="checkbox" checked={jobDraft.featured} onChange={e => setJobDraft({ ...jobDraft, featured: e.target.checked })} />Feature this role</label></div></div><footer><button type="button" onClick={() => setJobDraft(null)}>Cancel</button><button className="admin-primary" disabled={loading}>{loading ? "Saving…" : "Save posting"}</button></footer></form></div> : null}

    {jobToDelete ? <div className="admin-modal-scrim"><section className="delete-job-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-job-title"><AlertTriangle /><p>Delete job posting</p><h2 id="delete-job-title">Remove {jobToDelete.title}?</h2><p>This removes the role from the careers site immediately. Existing applications and candidate history will remain available in this dashboard.</p><footer><button onClick={() => setJobToDelete(null)}>Keep posting</button><button className="confirm-delete" onClick={deleteJob} disabled={loading}>{loading ? "Deleting…" : "Delete posting"}</button></footer></section></div> : null}
  </main>;
}
