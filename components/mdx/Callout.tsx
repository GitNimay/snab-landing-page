import type { ReactNode } from "react";

export function Callout({
  title = "Key point",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="mdx-callout" aria-label={title}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

