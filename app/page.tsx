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

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="site-shell">
            <section className="hero" id="home" aria-labelledby="hero-title">
              <div className="grid-plane" aria-hidden="true" />
              <div className="scanline" aria-hidden="true" />

              <div className="hero-copy">
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





            <section
              className="projects-section"
              id="projects"
              aria-labelledby="projects-title"
            >
              <div className="projects-header">
                <h2 id="projects-title">PROJECTS</h2>
                <p className="projects-intro">
                  AI products for real-world professional workflows.
                </p>
              </div>

              <div className="projects-panel">
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

              <div className="projects-footer">
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
              <video
                className="growth-tree-video"
                src="/tree-growing.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="business-growth-copy">
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
              <div className="testimonials-header">
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
              <div className="testimonials-carousel">
                <StaggerTestimonials />
              </div>
              <div className="bottom-rail" aria-hidden="true" />
            </section>

            <FAQSection />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
