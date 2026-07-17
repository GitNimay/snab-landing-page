"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function TestimonialsSkeleton() {
  return <div className="testimonials-skeleton" aria-hidden="true">
    <Skeleton className="testimonial-skeleton-card" />
    <Skeleton className="testimonial-skeleton-card" />
    <Skeleton className="testimonial-skeleton-card" />
  </div>;
}

const StaggerTestimonials = dynamic(
  () => import("@/components/ui/stagger-testimonials").then((module) => module.StaggerTestimonials),
  { ssr: false, loading: TestimonialsSkeleton },
);

export function LazyTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return <div ref={ref}>{visible ? <StaggerTestimonials /> : <TestimonialsSkeleton />}</div>;
}
