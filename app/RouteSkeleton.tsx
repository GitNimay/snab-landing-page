import { Skeleton } from "@/components/ui/skeleton";

export function RouteSkeleton() {
  return (
    <main className="route-skeleton" aria-busy="true" aria-label="Loading page">
      <header className="route-skeleton-nav">
        <Skeleton className="route-skeleton-brand" />
        <Skeleton className="route-skeleton-menu" />
      </header>
      <section className="route-skeleton-hero">
        <div className="route-skeleton-copy">
          <Skeleton className="route-skeleton-kicker" />
          <Skeleton className="route-skeleton-title" />
          <Skeleton className="route-skeleton-title route-skeleton-title-short" />
          <Skeleton className="route-skeleton-line" />
          <Skeleton className="route-skeleton-line route-skeleton-line-short" />
          <Skeleton className="route-skeleton-button" />
        </div>
        <Skeleton className="route-skeleton-visual" />
      </section>
      <span className="sr-only">Loading page content…</span>
    </main>
  );
}
