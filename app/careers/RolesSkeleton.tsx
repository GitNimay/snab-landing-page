import { Skeleton } from "@/components/ui/skeleton";

export function RolesSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="roles-list roles-skeleton" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div className="role-card role-card-skeleton" key={index}>
          <Skeleton className="role-skeleton-index" />
          <div className="role-details">
            <Skeleton className="role-skeleton-label" />
            <Skeleton className="role-skeleton-title" />
            <Skeleton className="role-skeleton-summary" />
          </div>
          <div className="role-facts">
            <Skeleton className="role-skeleton-fact" />
            <Skeleton className="role-skeleton-fact" />
            <Skeleton className="role-skeleton-fact" />
          </div>
          <Skeleton className="role-skeleton-action" />
        </div>
      ))}
    </div>
  );
}
