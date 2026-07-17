import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "AI Product Engineering Insights",
  description:
    "Practical guides from SNAB Innovations on AI product development, workflow automation, evaluation, architecture, and production software delivery.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <section className="insights-index" aria-labelledby="insights-title">
      <p>Research & field notes</p>
      <h1 id="insights-title">Building intelligent software that holds up.</h1>
      <p className="insights-index-intro">
        Practical guidance for teams moving from an AI opportunity to a useful,
        measurable, and maintainable product.
      </p>
      <Link className="insights-card" href="/insights/ai-product-development">
        <div>
          <span>Guide · 9 min read</span>
          <h2>AI product development: from promising demo to production system</h2>
          <p>
            A clear framework for choosing the right workflow, designing the
            system, evaluating behavior, and launching with the controls that
            real operations need.
          </p>
        </div>
        <strong aria-hidden="true">↗</strong>
      </Link>
    </section>
  );
}

