import { BrandLogo } from "./BrandLogo";
import { LazyVideo } from "./LazyVideo";
import { siteConfig } from "@/lib/site";

const footerColumns = [
  [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/#projects" }
  ],
  [
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" }
  ],
  [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" }
  ]
];

export function Footer() {
  return (
    <footer className="site-footer" aria-labelledby="footer-brand">
      <div className="footer-grid-plane" aria-hidden="true" />
      <div className="footer-top-rail" aria-hidden="true" />

      <div className="footer-frame">
        <div className="footer-left">
          <div className="footer-brand-block">
            <a className="footer-brand" href="/#home" aria-label="SNAB Innovations home">
              <BrandLogo className="footer-brand-logo" />
              <span id="footer-brand" className="footer-brand-name">
                SNAB Innovations
              </span>
            </a>

            <p className="footer-tagline">
              Build AI With
              <br />
              Production Intelligence
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {footerColumns.map((column, columnIndex) => (
              <div className="footer-link-column" key={columnIndex}>
                {column.map((item) => (
                  <a href={item.href} key={item.label}>
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>

        </div>

        <div className="footer-right">
          <div className="footer-socials" aria-label="Social links">
            <a className="footer-social footer-social-x" href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
              X / Twitter <span aria-hidden="true">X</span>
            </a>
            <a className="footer-social" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">in</span>
            </a>
          </div>

          <div className="footer-media-slot" aria-label="Footer video placeholder">
            <LazyVideo
              className="footer-media-video"
              src="/0DPAI75YDNDMgU2oIZR5R9KDWKA.mp4"
            />
          </div>

          <div className="footer-copyright">
            &copy; 2026 SNAB Innovations
          </div>
        </div>
      </div>

      <div className="footer-bottom-rail" aria-hidden="true" />
    </footer>
  );
}
