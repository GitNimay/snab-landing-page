import type { Metadata } from "next";
import { Footer } from "../Footer";
import { MobileMenu } from "../MobileMenu";
import { ArrowUpRight } from "lucide-react";
import "./careers.css";

const navItems = [
  { label: "home page", href: "/#home" },
  { label: "about us", href: "/about" },
  { label: "projects", href: "/#projects" },
  { label: "services", href: "/#services" },
  { label: "contact us", href: "/contact" },
  { label: "careers", href: "/careers" }
];

export const metadata: Metadata = {
  title: "Careers | SNAB Innovations",
  description:
    "Join SNAB Innovations and build the next generation of intelligent AI software, workflow automation, and enterprise products.",
};

const openRoles = [
  {
    id: "01",
    title: "AI Engineer",
    type: "Full-time",
    location: "Nashik / Hybrid",
    department: "Engineering",
  },
  {
    id: "02",
    title: "Full-Stack Developer",
    type: "Full-time",
    location: "Nashik / Remote",
    department: "Engineering",
  },
  {
    id: "03",
    title: "Product Designer (UI/UX)",
    type: "Full-time",
    location: "Nashik",
    department: "Design",
  },
];

export default function CareersPage() {
  return (
    <main className="careers-page">
      <div className="careers-watermark" aria-hidden="true">
        JOIN US
      </div>

      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="/#home" aria-label="SNAB Innovations home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">SNAB Innovations</span>
        </a>

        <MobileMenu items={navItems} />
      </header>

      <div className="careers-sheet">
        <section className="careers-hero">
          <p className="careers-kicker">Careers at SNAB</p>
          <h1>Build The Future<br />Of AI Products.</h1>
          <p className="careers-intro">
            We are looking for ambitious engineers, designers, and product minds to help us build intelligent software. If you believe in a system-first, AI-native approach to problem-solving, we want you on our team.
          </p>
        </section>

        <section className="careers-roles">
          <div className="roles-header">
            <h2>Open Positions</h2>
            <p>Join us in building state-of-the-art intelligent systems.</p>
          </div>

          <div className="roles-list">
            {openRoles.map((role) => (
              <a href={`mailto:hello@snab.ai?subject=Application%20for%20${role.title}`} key={role.id} className="role-card">
                <div className="role-meta">
                  <span className="role-id">{role.id}</span>
                  <span className="role-dept">{role.department}</span>
                </div>
                <div className="role-details">
                  <h3>{role.title}</h3>
                  <div className="role-tags">
                    <span>{role.type}</span>
                    <span className="dot" />
                    <span>{role.location}</span>
                  </div>
                </div>
                <div className="role-action">
                  Apply <ArrowUpRight size={24} />
                </div>
              </a>
            ))}
          </div>

          <div className="general-application">
            <p>Don&apos;t see a perfect fit? We are always looking for exceptional talent.</p>
            <a href="mailto:hello@snab.ai?subject=General%20Application">
              Send an open application <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
