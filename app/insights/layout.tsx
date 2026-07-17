import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { MobileMenu } from "../MobileMenu";

const navItems = [
  { label: "home page", href: "/" },
  { label: "about us", href: "/about" },
  { label: "services", href: "/services" },
  { label: "insights", href: "/insights" },
  { label: "contact us", href: "/contact" },
  { label: "careers", href: "/careers" },
];

export default function InsightsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="insights-site">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="SNAB Innovations home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">SNAB Innovations</span>
        </a>
        <MobileMenu items={navItems} />
      </header>
      {children}
      <Footer />
    </main>
  );
}

