import { Skeleton } from "@/components/ui/skeleton";

export function AdminCareersSkeleton() {
  return <main className="admin-careers admin-careers-skeleton" aria-busy="true" aria-label="Loading hiring desk">
    <aside className="admin-sidebar">
      <Skeleton className="admin-skeleton-brand" />
      <Skeleton className="admin-skeleton-nav" />
      <Skeleton className="admin-skeleton-nav" />
    </aside>
    <div className="admin-workspace">
      <header className="admin-header"><div><Skeleton className="admin-skeleton-label" /><Skeleton className="admin-skeleton-title" /></div></header>
      <section className="admin-stats">
        <Skeleton className="admin-skeleton-stat" /><Skeleton className="admin-skeleton-stat" /><Skeleton className="admin-skeleton-stat" />
      </section>
      <section className="admin-skeleton-filters"><Skeleton /><Skeleton /><Skeleton /></section>
      <section className="applications-table admin-skeleton-table">
        {Array.from({ length: 6 }, (_, index) => <Skeleton className="admin-skeleton-row" key={index} />)}
      </section>
    </div>
  </main>;
}
