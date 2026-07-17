import { MobileMenu } from "./MobileMenu";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { FAQSection } from "./FAQSection";
import { Footer } from "./Footer";
import { HomeMotion } from "./HomeMotion";

const navItems = [
  { label: "home page", href: "#home" },
  { label: "about us", href: "/about" },
  { label: "projects", href: "#projects" },
  { label: "services", href: "/services" },
  { label: "contact us", href: "/contact" },
  { label: "careers", href: "/careers" }
];

const principles = [
  "Workflow before model",
  "Built for reliability",
  "Useful increments",
  "Ownership through launch"
];

const services = [
  {
    number: "01",
    title: "AI products",
    detail: "Product strategy · model integration",
    glyph: "product"
  },
  {
    number: "02",
    title: "Workflow automation",
    detail: "Systems · approvals · operations",
    glyph: "workflow"
  },
  {
    number: "03",
    title: "Web platforms",
    detail: "Interfaces · APIs · infrastructure",
    glyph: "platform"
  },
  {
    number: "04",
    title: "Agents & RAG",
    detail: "Retrieval · tools · evaluation",
    glyph: "agents"
  }
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function ServiceGlyph({ kind }: { kind: string }) {
  if (kind === "workflow") {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <path d="M12 18h18v18h18v18h12M30 27h30" />
        <rect x="6" y="12" width="12" height="12" />
        <rect x="30" y="30" width="12" height="12" />
        <rect x="54" y="21" width="12" height="12" />
        <rect x="54" y="48" width="12" height="12" />
      </svg>
    );
  }

  if (kind === "platform") {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <path d="m36 8 27 14-27 14L9 22 36 8Z" />
        <path d="m9 35 27 14 27-14M9 48l27 14 27-14" />
      </svg>
    );
  }

  if (kind === "agents") {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r="18" />
        <path d="M36 8v10M36 54v10M8 36h10M54 36h10" />
        <rect x="31" y="31" width="10" height="10" />
        <rect x="32" y="4" width="8" height="8" />
        <rect x="32" y="60" width="8" height="8" />
        <rect x="4" y="32" width="8" height="8" />
        <rect x="60" y="32" width="8" height="8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <rect x="16" y="16" width="40" height="40" />
      <rect x="26" y="26" width="20" height="20" />
      <path d="M36 4v12M36 56v12M4 36h12M56 36h12" />
    </svg>
  );
}



const projects = [
  {
    number: "01",
    name: "Interview Expert",
    categories: [
      "INTERVIEW AUTOMATION",
      "AI PRODUCT",
      "WORKFLOW SOFTWARE"
    ],
    description:
      "An AI-enabled platform that helps teams organize interview workflows, reduce administrative work, and turn interview information into structured, actionable records.",
    capabilities: [
      "Workflow Management",
      "Interview Assistance",
      "Summaries",
      "Evaluation Support"
    ],
    image: "/interviewxpert.png",
    imageAlt: "Interview Expert mark"
  },
  {
    number: "02",
    name: "Notary Expert",
    categories: ["NOTARY AUTOMATION", "LEGAL WORKFLOWS", "AI PRODUCT"],
    description:
      "An intelligent workflow platform that helps notary professionals manage documents, appointments, client communication, and case progress more efficiently.",
    capabilities: [
      "Client Intake",
      "Document Workflows",
      "Appointment Coordination",
      "Case Tracking"
    ],
    image: "/notary-expert.png",
    imageAlt: "Notary Expert seal"
  }
];

export default function Home() {
  return (
    <>
      <HomeMotion />
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#" aria-label="SNAB Innovations home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">SNAB Innovations</span>
        </a>

        <MobileMenu items={navItems} />
      </header>

      <main className="site-shell">
            <section className="hero" id="home" aria-labelledby="hero-title">
              <div className="grid-plane" aria-hidden="true" />
              <div className="scanline" aria-hidden="true" />

              <div className="hero-copy" data-reveal>
                <p className="eyebrow">
                  Your products are now AI-enabled.
                  <br />
                  Native agent workflows for teams, tools, and operations &rarr;
                </p>

                <h1 id="hero-title">The AI Brain Behind Your Business</h1>

                <p className="lead">
                  AI-enabled apps, websites, desktop software, and workflow agents
                  built from scratch or upgraded from your existing product.
                </p>

                <div className="cta-row">
                  <a className="btn btn-light btn-large" href="/contact">
                    Talk to us
                  </a>
                </div>
              </div>

              <img
                className="pixel-tree"
                src="/pixel-tree-wind.svg"
                alt=""
                aria-hidden="true"
              />

              <div className="bottom-rail" aria-hidden="true" />
            </section>

            <section className="home-about" aria-labelledby="home-about-title">
              <div className="home-section-rule" aria-hidden="true" />
              <div className="home-about-layout" data-reveal>
                <p className="home-section-index">
                  <span>01</span> / ABOUT
                </p>

                <h2 id="home-about-title">
                  We build the systems behind intelligent work<span>.</span>
                </h2>

                <div className="home-about-side">
                  <p>
                    Product thinking, engineering discipline, and domain
                    context—brought together to turn complex workflows into
                    dependable products.
                  </p>
                  <a className="home-outline-link" href="/about">
                    Meet SNAB <ArrowIcon />
                  </a>
                </div>

                <svg
                  className="home-branch-motif"
                  viewBox="0 0 220 164"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M110 164V92M110 120 64 83M64 83V45M64 70 28 48M110 104l45-38M155 66V28M155 52l34-28" />
                  <path d="M105 159h10v5h-10zM59 78h10v10H59zM23 43h10v10H23zM150 61h10v10h-10zM184 19h10v10h-10z" />
                </svg>
              </div>

              <ol className="home-principles" data-reveal>
                {principles.map((principle, index) => (
                  <li key={principle}>
                    <span>0{index + 1}</span>
                    <p>{principle}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section
              className="home-services"
              id="services"
              aria-labelledby="home-services-title"
            >
              <div className="home-services-grid" aria-hidden="true" />
              <div className="home-services-intro" data-reveal>
                <p className="home-section-index">
                  <span>02</span> / SERVICES
                </p>
                <h2 id="home-services-title">
                  From first sketch to always on<span>.</span>
                </h2>
                <p className="home-services-summary">
                  One accountable team to define, design, engineer, launch, and
                  improve your product.
                </p>
                <a className="home-outline-link" href="/services">
                  Explore services <ArrowIcon />
                </a>
              </div>

              <div className="home-services-system" data-reveal>
                <ol className="home-delivery-rail" aria-label="Delivery process">
                  {["Idea", "Define", "Design", "Engineer", "Launch", "Operate"].map(
                    (step) => <li key={step}>{step}</li>,
                  )}
                </ol>

                <ol className="home-service-list">
                  {services.map((service) => (
                    <li key={service.number}>
                      <span className="home-service-number">{service.number}</span>
                      <div>
                        <h3>{service.title}</h3>
                        <p>{service.detail}</p>
                      </div>
                      <span className="home-service-glyph">
                        <ServiceGlyph kind={service.glyph} />
                      </span>
                      <ArrowIcon />
                    </li>
                  ))}
                </ol>
              </div>
            </section>
            <section
              className="projects-section"
              id="projects"
              aria-labelledby="projects-title"
            >
              <div className="projects-header" data-reveal>
                <h2 id="projects-title">PROJECTS</h2>
                <p className="projects-intro">
                  AI products for real-world professional workflows.
                </p>
              </div>

              <div className="projects-panel" data-reveal>
                {projects.map((project) => (
                  <a className="project-row" href="#" key={project.number}>
                    <span className="project-number">{project.number}</span>

                    <span className="project-name-wrap">
                      <span className="project-name">{project.name}</span>
                      <span className="project-row-underline" aria-hidden="true" />
                    </span>

                    <span className="project-categories">
                      {project.categories.map((category) => (
                        <span key={category}>{category}</span>
                      ))}
                    </span>

                    <span className="project-summary">
                      <span className="project-description">
                        {project.description}
                      </span>
                      <span className="project-capabilities">
                        {project.capabilities.map((capability, index) => (
                          <span key={capability}>
                            {capability}
                            {index < project.capabilities.length - 1 ? (
                              <span aria-hidden="true"> &middot; </span>
                            ) : null}
                          </span>
                        ))}
                      </span>
                      <span className="project-link">VIEW PROJECT &#8599;</span>
                    </span>

                    <span className="project-media-slot">
                      <img
                        className="project-media-image"
                        src={project.image}
                        alt={project.imageAlt}
                      />
                    </span>
                  </a>
                ))}
              </div>

              <div className="projects-footer" data-reveal>
                <p>Have a workflow that should be more intelligent?</p>
                <a href="/contact">BUILD WITH SNAB Innovations &#8599;</a>
              </div>

              <a className="projects-view-all" href="#">
                View all projects
              </a>
              <div className="bottom-rail" aria-hidden="true" />
            </section>

            <section
              className="business-growth-section"
              id="contact"
              aria-labelledby="business-growth-title"
            >
              <img
                className="growth-tree-video"
                src="/pixel-tree.svg"
                alt=""
                aria-hidden="true"
              />
              <div className="business-growth-copy" data-reveal>
                <p className="business-growth-kicker">Growth systems for ambitious teams</p>
                <h2 id="business-growth-title">
                  Build The Next Branch Of Your Business With Us.
                </h2>
                <blockquote>
                  &ldquo;Grow your business with AI products, automation, and software
                  services that turn one strong idea into many working systems.&rdquo;
                </blockquote>
                <a className="business-growth-link" href="/contact">
                  START A PROJECT &#8599;
                </a>
              </div>
              <div className="bottom-rail" aria-hidden="true" />
            </section>

            <section className="testimonials-section" aria-labelledby="testimonials-title">
              <div className="testimonials-header" data-reveal>
                <p className="testimonials-eyebrow">Client Feedback</p>
                <h2 id="testimonials-title">
                  What Our Clients
                  <br />
                  Are Saying
                </h2>
                <p className="testimonials-intro">
                  Real feedback from teams who transformed their workflows with us.
                </p>
              </div>
              <div className="testimonials-carousel" data-reveal>
                <StaggerTestimonials />
              </div>
              <div className="bottom-rail" aria-hidden="true" />
            </section>

            <FAQSection />
            <Footer />
      </main>
    </>
  );
}
