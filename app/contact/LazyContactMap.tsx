"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function MapSkeleton() {
  return <div className="contact-map-skeleton" aria-hidden="true">
    <Skeleton className="contact-map-skeleton-grid" />
    <Skeleton className="contact-map-skeleton-pin" />
    <span>Map loading</span>
  </div>;
}

const ContactMap = dynamic(
  () => import("./ContactMap").then((module) => module.ContactMap),
  { ssr: false, loading: MapSkeleton },
);

export function LazyContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "350px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return <div ref={ref} className="contact-map-lazy-shell">{visible ? <ContactMap /> : <MapSkeleton />}</div>;
}
