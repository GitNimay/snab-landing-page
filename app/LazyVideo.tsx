"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = { className: string; src: string; label?: string };

export function LazyVideo({ className, src, label }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || active) return;
    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [active]);

  return (
    <video
      ref={ref}
      className={className}
      src={active ? src : undefined}
      autoPlay={active}
      loop
      muted
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
