"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroAboutTransition
 *
 * Both children overlap (absolute positioning).
 * GSAP pins the wrapper and scrubs through:
 *   Phase 1-5: text reveal animation
 *   Phase 6: crossfade — hero out, about in
 *
 * When pin releases, about is at full opacity and scrolls naturally.
 */
export default function HeroAboutTransition({
  children,
}: {
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const hero = wrapper.querySelector("[data-hero]") as HTMLElement;
      const text = wrapper.querySelector("[data-reveal-text]") as HTMLElement;
      const lime = wrapper.querySelector("[data-lime-overlay]") as HTMLElement;
      const content = wrapper.querySelector("[data-reveal-content]") as HTMLElement;
      const about = wrapper.querySelector("[data-about]") as HTMLElement;

      if (!hero || !text || !lime || !content || !about) return;

      // About starts invisible behind the hero
      gsap.set(about, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            // Ensure About is fully visible when pin releases
            gsap.set(hero, { opacity: 0 });
            gsap.set(about, { opacity: 1, position: "relative" });
          },
        },
      });

      // ── Hero text reveal (phases 1-5) ──

      // Phase 1 (0–15%): White → Red
      tl.to(text, { backgroundColor: "#ef4444", duration: 0.15, ease: "power1.inOut" }, 0);

      // Phase 2 (15–35%): Scale up
      tl.to(text, { scale: 4, duration: 0.20, ease: "power2.inOut" }, 0.15);

      // Phase 3 (35–55%): Red → Lime + massive scale
      tl.to(text, { backgroundColor: "#BFFF00", scale: 50, duration: 0.20, ease: "power2.in" }, 0.35);

      // Phase 4 (53–60%): Lime overlay fills
      tl.to(lime, { opacity: 1, duration: 0.07, ease: "power1.inOut" }, 0.53);

      // Phase 5 (58–72%): Content fades in
      tl.fromTo(
        content,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
        0.58
      );

      // ── Crossfade (phase 6, 75%–100%) ──
      tl.to(hero, { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.75);
      tl.to(about, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, 0.75);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="hero-about-wrapper">
      {children}
    </div>
  );
}
