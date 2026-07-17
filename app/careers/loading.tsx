import { Skeleton } from "@/components/ui/skeleton";
import { RolesSkeleton } from "./RolesSkeleton";

export default function CareersLoading() {
  return (
    <main className="careers-page careers-route-skeleton" aria-busy="true" aria-label="Loading careers">
      <header className="careers-header careers-skeleton-header">
        <Skeleton className="careers-skeleton-brand" />
        <Skeleton className="careers-skeleton-menu" />
      </header>
      <section className="careers-hero">
        <div className="careers-hero-copy">
          <Skeleton className="careers-skeleton-kicker" />
          <Skeleton className="careers-skeleton-heading" />
          <Skeleton className="careers-skeleton-heading short" />
          <Skeleton className="careers-skeleton-copy" />
          <Skeleton className="careers-skeleton-button" />
        </div>
      </section>
      <section className="careers-roles">
        <div className="roles-header">
          <div><Skeleton className="careers-skeleton-kicker" /><Skeleton className="careers-skeleton-section-title" /></div>
        </div>
        <RolesSkeleton />
      </section>
      <span className="sr-only">Loading careers content…</span>
    </main>
  );
}
