"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const underlineRef = useRef<HTMLSpanElement | null>(null);

  // ── Scroll shadow ──
  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 50);
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // ── Single active-section detector + underline sync ──
  // Uses getBoundingClientRect which works correctly with GSAP pinned sections
  useEffect(() => {
    const update = () => {
      // Find which nav-linked section is closest to the 40% viewport mark
      let bestId = "about";

      for (const link of NAV_LINKS) {
        const id = link.href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;

        // For elements inside GSAP pin-spacers, we check the spacer's position
        const pinSpacer = el.closest(".pin-spacer") as HTMLElement | null;
        const measurable = pinSpacer || el;
        const rect = measurable.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.4) {
          bestId = id;
        }
      }

      setActiveSection(bestId);

      // Sync underline position to the matching nav link
      const navIndex = NAV_LINKS.findIndex(
        (l) => l.href.slice(1) === bestId
      );
      const activeEl = navRefs.current[navIndex];
      const underline = underlineRef.current;

      if (activeEl && underline) {
        const linkRect = activeEl.getBoundingClientRect();
        const parentRect = activeEl.parentElement!.getBoundingClientRect();

        underline.style.width = `${linkRect.width}px`;
        underline.style.transform = `translateX(${linkRect.left - parentRect.left}px)`;
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    // Run once on mount so the underline is positioned immediately
    requestAnimationFrame(update);

    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── Smooth scroll click handler ──
  // Accounts for GSAP pin-spacers wrapping pinned sections
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();

      const target = document.querySelector(href) as HTMLElement;
      if (target) {
        // If the section is inside a GSAP pin-spacer, use the spacer's position
        const pinSpacer = target.closest(".pin-spacer") as HTMLElement | null;
        const scrollTarget = pinSpacer || target;

        const y =
          scrollTarget.getBoundingClientRect().top + window.scrollY - 80;

        window.scrollTo({ top: y, behavior: "smooth" });
      }

      setIsMobileOpen(false);
    },
    []
  );

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-bold tracking-tight text-accent"
        >
          TS<span className="text-foreground">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="relative hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => { navRefs.current[i] = el; }}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-accent ${activeSection === link.href.slice(1)
                ? "text-accent"
                : "text-muted"
                }`}
            >
              {link.label}
            </a>
          ))}

          {/* Animated underline */}
          <span
            ref={underlineRef}
            className="absolute -bottom-1 h-[2px] bg-accent rounded-full transition-all duration-300 ease-out"
          />
        </div>

        {/* Mobile Menu Button */}
      </div>
      <div className="fixed top-0 right-[51%] md:right-0">
        <button
          id="mobile-menu-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-foreground"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[1.5px] bg-foreground"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-foreground"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="flex flex-col px-6 py-5 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base font-medium transition-colors duration-300 ${activeSection === link.href.slice(1)
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}