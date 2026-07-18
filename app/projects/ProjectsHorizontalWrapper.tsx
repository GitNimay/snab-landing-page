"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsHorizontalWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".project-panel");
      
      if (sections.length > 1 && containerRef.current && wrapperRef.current) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            scrub: 1,
            // Only snap if not on mobile/touch since horizontal scroll on touch is tricky with snapping sometimes
            snap: {
                snapTo: 1 / (sections.length - 1),
                duration: { min: 0.2, max: 0.6 },
                delay: 0.1
            },
            end: () => "+=" + (wrapperRef.current!.offsetWidth * sections.length),
          }
        });
      }
    }, wrapperRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="projects-horizontal-wrapper" ref={wrapperRef}>
      <div className="projects-horizontal-container" ref={containerRef}>
        {children}
      </div>
    </div>
  );
}
