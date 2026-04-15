"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);   // tall scroll-space div
  const sectionRef = useRef<HTMLElement>(null);       // sticky viewport-filling section
  const textRef = useRef<HTMLHeadingElement>(null);
  const limeOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force top-of-page on every load — prevents mobile restoring a mid-scroll position
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const text = textRef.current;
      const limeOverlay = limeOverlayRef.current;
      const content = contentRef.current;
      const about = document.querySelector("[data-about]") as HTMLElement;

      if (!wrapper || !text || !limeOverlay || !content || !about) return;

      // Inverse scale trick: render at final large size, scale down visually.
      // Browser always rasterizes at full resolution → no staircase aliasing.
      gsap.set(text, {
        fontSize: "30vw",
        scale: 0.1667,
        backgroundImage: "linear-gradient(to top, #BFFF00 50%, #aaa4a4ff 50%)",
        backgroundSize: "100% 200%",
        backgroundPosition: "0% 0%",
        backgroundColor: "transparent",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          // Watch the tall WRAPPER for scroll progress — NOT the sticky section.
          // The section stays fixed via CSS sticky; no JS pin needed → mobile-safe.
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0–15%): Vertical fill grey → lime
      tl.to(text, { backgroundPosition: "0% 100%", duration: 0.15, ease: "none" }, 0);

      // Phase 2 (15–35%): Scale to natural (downscale 1/6 → 1, never upscaled)
      tl.to(text, { scale: 1, duration: 0.20, ease: "power2.inOut" }, 0.15);

      // Phase 3 (25–35%): Lime background floods in
      tl.to(text, {
        backgroundColor: "#BFFF00",
        lineHeight: 1,
        duration: 0.10,
        ease: "power3.inOut",
      }, 0.25);

      // Phase 4 (30–37%): Lime overlay fills screen
      tl.to(limeOverlay, { opacity: 1, duration: 0.07, ease: "power1.inOut" }, 0.30);

      // Phase 5 (20–34%): Content fades in
      tl.fromTo(
        content,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" },
        0.20
      );

      // Phase 6: Hero fades out, about fades in
      tl.to(sectionRef.current, { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0.37);
      tl.to(about, { opacity: 1, duration: 0.25, ease: "power2.inOut" }, 0.30);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    /*
     * wrapperRef — 500vh tall div. Provides all the scroll space.
     * The browser scrolls through it natively; ScrollTrigger reads progress.
     *
     * sectionRef — position:sticky, 100svh tall. Stays glued to the top
     * of the viewport as the wrapper scrolls past. No JS pin math needed,
     * so the mobile address bar resizing cannot break it.
     *
     * 100svh (small viewport height) is used intentionally — it equals the
     * viewport height WITH the address bar visible, so nothing ever gets
     * clipped on first load on mobile.
     */
    <div ref={wrapperRef} style={{ height: "500vh" }}>
      <section
        ref={sectionRef}
        className="text-reveal-hero"
        id="intro"
        style={{ position: "sticky", top: 0, height: "100svh" }}
      >
        <h1 ref={textRef} className="reveal-text">Tanuj.</h1>
        <div ref={limeOverlayRef} className="lime-overlay" />
        <div ref={contentRef} className="reveal-content">
          <p className="reveal-role">Full Stack Developer</p>
          <div className="reveal-divider" />
          <p className="reveal-subtitle">Scroll to explore</p>
        </div>
      </section>
    </div>
  );
}