"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalScrollWrapper — Creates a pinned horizontal scrolling viewport
 * for the sections passed as children.
 * 
 * Works best when children are sized to `w-screen h-screen`.
 */
export default function HorizontalScrollWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const scrollWrapper = scrollWrapperRef.current;
      if (!container || !scrollWrapper) return;

      // Calculate how far to translate continuously left
      // We want to translate exactly the width of the content minus the viewport width
      const getScrollAmount = () => -(scrollWrapper.scrollWidth - window.innerWidth);

      const tween = gsap.to(scrollWrapper, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWrapper.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculate on resize
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="horizontal-scroll-container w-full h-screen bg-background">
      <div
        ref={scrollWrapperRef}
        className="horizontal-scroll-wrapper flex h-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
