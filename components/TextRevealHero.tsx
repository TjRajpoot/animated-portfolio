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

      // Responsive values based on screen width
      const isMobile = window.innerWidth < 768;
      const finalFontSize = isMobile ? "18vw" : "30vw";
      const initialScale = isMobile ? 0.28 : 0.1667;
      const scrollLength = isMobile ? "+=250%" : "+=400%";

      // Initialize text state for vertical reveal.
      // Inverse scale trick: font-size is set at its final "zoomed" size so the
      // browser rasterizes full-resolution glyphs. We scale DOWN so it looks
      // small initially, then animate back to scale(1). No upscaling = no aliasing.
      gsap.set(text, {
        fontSize: finalFontSize,
        scale: initialScale,
        backgroundImage: "linear-gradient(to top, #BFFF00 50%, #aaa4a4ff 50%)",
        backgroundSize: "100% 200%",
        backgroundPosition: "0% 0%",
        backgroundColor: "transparent",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: scrollLength,
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
        },
      });

      // Phase 1 (0–15%): Vertical Reveal (White → Lime)
      tl.to(text, { backgroundPosition: "0% 100%", duration: 0.15, ease: "none" }, 0);

      // Phase 2 (15–35%): Animate to scale(1) — text was initialized at 0.1667 of 30vw,
      // so this is purely downscale-to-natural. No upscaling = no staircase aliasing.
      tl.to(text, { scale: 1, duration: 0.20, ease: "power2.inOut" }, 0.15);

      // Phase 3 (25–35%): Lime background floods in — no fontSize keeps GPU-only compositing path
      tl.to(text, {
        backgroundColor: "#BFFF00",
        lineHeight: 1, duration: 0.10, ease: "power3.inOut"
      }, 0.25);

      // Phase 4 (30–37%): Lime overlay fills screen — overlaps with scale so there's no dead zone
      tl.to(limeOverlay, { opacity: 1, duration: 0.07, ease: "power1.inOut" }, 0.30);

      // Phase 4b: Fade text out in exact sync with overlay — eliminates dark letter-edge bleed-through
      tl.to(text, { opacity: 0, duration: 0.07, ease: "power1.inOut" }, 0.30);

      // Phase 5 (20–34%): Content fades in (single declaration — duplicate removed)
      tl.fromTo(
        content,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" },
        0.20
      );

      // Phase 6: Crossfade — hero fades out immediately after overlay fills (gap closed: 0.42 → 0.37)
      tl.to(section, { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.37);
      tl.to(about, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, 0.30);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="text-reveal-hero" style={{
      position: "sticky",
      top: 0,
      height: "100svh",
      width: "100%",   // ✅ FIXED
      overflow: "hidden"
    }} id="intro">
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