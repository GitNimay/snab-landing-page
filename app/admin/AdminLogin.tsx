"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, LockKeyhole } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/careers/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: formData.get("password") }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Could not sign in.");
      setLoading(false);
      return;
    }
    router.replace("/admin/careers");
  }

  return (
    <main className="admin-login">
      <a href="/careers"><ArrowLeft size={16} /> Careers site</a>
      <form onSubmit={login}>
        <span className="admin-login-icon"><LockKeyhole /></span>
        <p>SNAB / Hiring desk</p>
        <h1>Admin access</h1>
        <label>Password<input name="password" type="password" autoFocus required /></label>
        {error ? <p className="admin-error" role="alert">{error}</p> : null}
        <button disabled={loading}>{loading ? "Checking…" : "Enter dashboard"}<ChevronRight size={18} /></button>
      </form>
    </main>
  );
}
