"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function AboutMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Watermark parallax effect
      gsap.to(".about-watermark", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 2. Blueprint wipe-in effect (simulating lines drawing)
      const blocks = gsap.utils.toArray<HTMLElement>(
        ".about-sheet-header, .about-opening, .about-chapter-one, .about-statement, .about-name-rail, .about-approach-title, .about-approach-media, .about-playbook, .about-principles, .about-sheet-footer"
      );

      blocks.forEach((block) => {
        // Prepare block for clipPath animation
        gsap.set(block, { 
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          opacity: 0 
        });

        gsap.to(block, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          }
        });

        // 3. Stagger text content inside each block for a dynamic "loading" feel
        const textElements = block.querySelectorAll("h1, h2, h3, p, span:not(.about-sheet-menu span), a, li, strong, em");
        if (textElements.length > 0) {
          gsap.fromTo(textElements, 
            { opacity: 0, y: 15 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "power2.out",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
