"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * TextRevealHero — Scroll-driven intro animation.
 *
 * Phase 1: "TANUJ" white → red
 * Phase 2: Scale up dramatically
 * Phase 3: Red → lime, text becomes a mask
 * Phase 4: Lime fills screen, content fades in
 * Phase 5: Hero fades out, revealing the About section behind
 */
export default function TextRevealHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const limeOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const text = textRef.current;
      const limeOverlay = limeOverlayRef.current;
      const content = contentRef.current;
      const about = document.querySelector("[data-about]") as HTMLElement;

      if (!section || !text || !limeOverlay || !content || !about) return;

      // About starts invisible, fixed behind the hero
      // gsap.set(about, {
      //   position: "fixed",
      //   top: 0,
      //   left: 0,Z
      //   right: 0,
      //   bottom: 0,
      //   opacity: 0,
      //   zIndex: 0,
      // });

      // Initialize text state for vertical reveal
      gsap.set(text, {
        backgroundImage: "linear-gradient(to top, #BFFF00 50%, #aaa4a4ff 50%)",
        backgroundSize: "100% 200%",
        backgroundPosition: "0% 0%",   // start from top now
        backgroundColor: "transparent",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            // Restore About to normal flow when pin releases
            gsap.set(about, {
              position: "relative",
              top: "auto",
              left: "auto",
              right: "auto",
              bottom: "auto",
              opacity: 1,
              zIndex: "auto",
              clearProps: "position,top,left,right,bottom,zIndex",
            });
          },
          // onEnterBack: () => {
          //   // Re-fix About when scrolling back into the hero
          //   gsap.set(about, {
          //     position: "fixed",
          //     top: 0,
          //     left: 0,
          //     right: 0,
          //     bottom: 0,
          //     zIndex: 0,
          //   });
          // },
        },
      });

      // Phase 1 (0–15%): Vertical Reveal (White → Lime)
      tl.to(text, { backgroundPosition: "0% 100%", duration: 0.15, ease: "none" }, 0);

      // Phase 2 (15–35%): Scale up
      tl.to(text, { scale: 6, duration: 0.20, ease: "power2.inOut" }, 0.15);

      // Phase 3 (35–55%): Red → Lime + massive scale
      tl.to(text, {
        backgroundColor: "#BFFF00", fontSize: "30vw",
        lineHeight: 1, duration: 0.10, ease: "power3.inOut"
      }, 0.25);

      // Phase 4 (53–60%): Lime overlay fills
      tl.to(limeOverlay, { opacity: 1, duration: 0.07, ease: "power1.inOut" }, 0.30);

      // Phase 5 (58–72%): Content fades in
      tl.fromTo(
        content,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" },
        0.20
      );

      // Phase 5 (58–72%): Content fades in
      tl.fromTo(
        content,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" },
        0.20
      );

      // Phase 6 (75–100%): Crossfade — hero out, about in
      // Enlarge content massively just like "TANUJ" text
      tl.to(section, { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.42);
      tl.to(about, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, 0.30);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="text-reveal-hero" id="intro">
      <h1 ref={textRef} className="reveal-text">Tanuj.</h1>
      <div ref={limeOverlayRef} className="lime-overlay" />
      <div ref={contentRef} className="reveal-content">
        <p className="reveal-role">Full Stack Developer</p>
        <div className="reveal-divider" />
        <p className="reveal-subtitle">Scroll to explore</p>
      </div>
    </section>
  );
}
