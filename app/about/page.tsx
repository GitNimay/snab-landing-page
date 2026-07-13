import type { Metadata } from "next";
import { Footer } from "../Footer";
import { MobileMenu } from "../MobileMenu";
import { AboutMotion } from "./AboutMotion";
import "./about.css";

const navItems = [
  { label: "home page", href: "/#home" },
  { label: "about us", href: "/about" },
  { label: "projects", href: "/#projects" },
  { label: "services", href: "/#services" },
  { label: "contact us", href: "/contact" }
];

export const metadata: Metadata = {
  title: "About Us | SNAB Innovations",
  description:
    "Learn how SNAB Innovations designs and builds AI products, intelligent software, and workflow automation."
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutMotion />
      
      <div className="about-watermark" aria-hidden="true">
        SNAB
      </div>

      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="SNAB Innovations home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-name">SNAB Innovations</span>
        </a>

        <MobileMenu items={navItems} />
      </header>



      <article className="about-sheet">
        <header className="about-sheet-header">
          <a href="/" aria-label="Return to the home page">
            <span className="about-sheet-menu" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </a>
          <span>ABOUT US</span>
          <span>OUR APPROACH</span>
          <span>WHAT WE BUILD</span>
          <span>AI PRODUCT STUDIO</span>
          <span>SNAB Innovations</span>
          <a href="/contact">CONTACT</a>
        </header>

        <section className="about-opening" aria-labelledby="about-title">


          <div className="about-opening-copy">
            <p className="about-label">SNAB Innovations</p>
            <h1 id="about-title">
              Building
              <br />
              With AI
            </h1>
            <p>
              We design and engineer AI-enabled products, internal tools,
              websites, desktop software, and automation systems for teams that
              need dependable production software.
            </p>
            <span className="about-location">PUNE, INDIA</span>
          </div>

          <div className="about-opening-note">
            <p>
              SNAB Innovations works across product strategy, interface design,
              full-stack engineering, AI integration, deployment, and ongoing
              iteration.
            </p>
          </div>

          <a className="about-opening-link" href="/contact">
            <span>
              START A PROJECT
              <br />
              TALK WITH OUR TEAM
            </span>
            <strong aria-hidden="true">-&gt;</strong>
          </a>
        </section>

        <section className="about-chapter-one" aria-labelledby="chapter-one-title">
          <div className="about-chapter-title">
            <h2 id="chapter-one-title">
              The AI Product
              <br />
              Era Begins
            </h2>
            <p>STRATEGY, SOFTWARE, AND AUTOMATION BUILT AS ONE SYSTEM.</p>
            <span aria-hidden="true">01</span>
          </div>



          <div className="about-grid-copy">
            <h3>WHAT WE BUILD</h3>
            <p>
              AI products, workflow platforms, intelligent websites, desktop
              software, agents, RAG systems, and connected business tools.
            </p>
          </div>

          <div className="about-grid-heading">ABOUT THE TEAM</div>

          <div className="about-grid-heading">ABOUT THE WORK</div>

          <div className="about-grid-copy">
            <h3>SNAB Innovations</h3>
            <p>
              A compact engineering partner for founders, operators, and teams
              turning AI opportunities into shipped product work.
            </p>
          </div>
        </section>

        <section className="about-chapter-two" aria-labelledby="chapter-two-title">
          <div className="about-statement">
            <span aria-hidden="true">02</span>
            <p>THE SNAB Innovations STATEMENT</p>
            <h2 id="chapter-two-title">
              System First.
              <br />
              AI Native.
            </h2>
          </div>

          <div className="about-name-rail" aria-hidden="true">
            <span>*</span>
            <strong>SNAB Innovations</strong>
            <em>AI PRODUCT STUDIO</em>
            <span>*</span>
            <strong>SNAB Innovations</strong>
            <em>PRODUCT + ENGINEERING</em>
          </div>

          <div className="about-approach-title">
            <h2>
              About Our
              <br />
              Approach
            </h2>
            <p>PRODUCT, ENGINEERING, AUTOMATION</p>
          </div>

          <div className="about-approach-media">
            <div className="about-approach-copy">
              <p>
                We start from the workflow, not the model. We map users, data,
                approvals, integrations, and failure states before choosing the
                AI layer.
              </p>
            </div>

            <div className="about-favorite-rail" aria-hidden="true">
              BUILD
              <br />
              TEST
              <br />
              LEARN
              <br />
              SHIP
              <br />
              BUILD
              <br />
              TEST
            </div>
          </div>

          <div className="about-playbook">
            <blockquote>
              We build the part of AI that has to survive real users, real
              data, and real operations.
            </blockquote>
            <h2>
              Product
              <br />
              Playbook
            </h2>
          </div>

          <div className="about-principles">
            <ol>
              <li>START WITH THE WORKFLOW</li>
              <li>DESIGN FOR REAL USERS</li>
              <li>CONNECT THE RIGHT DATA</li>
              <li>BUILD THE COMPLETE SYSTEM</li>
              <li>TEST IN PRODUCTION CONDITIONS</li>
              <li>IMPROVE AFTER LAUNCH</li>
            </ol>
            <a href="/#services">EXPLORE OUR SERVICES</a>
            <a className="about-next-button" href="/#services" aria-label="Next page">
              -&gt;
            </a>
          </div>
        </section>

        <footer className="about-sheet-footer">
          <a href="/">LAST PAGE</a>
          <span>SNAB Innovations / ABOUT US</span>
          <a href="/#services">NEXT PAGE</a>
        </footer>
      </article>

      <Footer />
    </main>
  );
}
