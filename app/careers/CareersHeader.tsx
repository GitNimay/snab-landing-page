import { MobileMenu } from "../MobileMenu";

const navItems = [
  { label: "home page", href: "/#home" },
  { label: "about us", href: "/about" },
  { label: "projects", href: "/#projects" },
  { label: "services", href: "/services" },
  { label: "contact us", href: "/contact" },
  { label: "careers", href: "/careers" },
];

export function CareersHeader() {
  return (
    <header className="topbar careers-topbar" aria-label="Primary navigation">
      <a className="brand" href="/#home" aria-label="SNAB Innovations home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="brand-name">SNAB Innovations</span>
      </a>
      <MobileMenu items={navItems} />
    </header>
  );
}
