const footerColumns = [
  [
    { label: "Why SNAB Innovations", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "Use Cases", href: "/#services" },
    { label: "Pricing", href: "/contact" },
    { label: "FAQ's", href: "/#faq" }
  ],
  [
    { label: "AI Products", href: "/#services" },
    { label: "Automation", href: "/#services" },
    { label: "Consulting", href: "/contact" }
  ],
  [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" }
  ]
];

const capabilityBadges = ["AI", "WEB", "APP"];

export function Footer() {
  return (
    <footer className="site-footer" aria-labelledby="footer-brand">
      <div className="footer-grid-plane" aria-hidden="true" />
      <div className="footer-top-rail" aria-hidden="true" />

      <div className="footer-frame">
        <div className="footer-left">
          <div className="footer-brand-block">
            <a className="footer-brand" href="/#home" aria-label="SNAB Innovations home">
              <span className="brand-mark footer-brand-mark" aria-hidden="true">
                <span />
              </span>
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

          <div className="footer-badges" aria-label="Core capabilities">
            {capabilityBadges.map((badge) => (
              <span className="footer-badge" key={badge}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-socials" aria-label="Social links">
            <a className="footer-social footer-social-x" href="#">
              X / Twitter <span aria-hidden="true">X</span>
            </a>
            <a className="footer-social" href="#">
              LinkedIn <span aria-hidden="true">in</span>
            </a>
          </div>

          <div className="footer-media-slot" aria-label="Footer video placeholder">
            <video
              className="footer-media-video"
              src="/0DPAI75YDNDMgU2oIZR5R9KDWKA.mp4"
              autoPlay
              loop
              muted
              playsInline
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
