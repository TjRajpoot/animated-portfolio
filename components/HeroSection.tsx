"use client";

import { motion } from "framer-motion";

/**
 * HeroSection Component
 *
 * - Large heading with name and role
 * - Subtle text reveal: fade + slight upward motion (Framer Motion)
 * - Staggered entrance for child elements
 * - CTA buttons with hover micro-interactions
 */

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Subtle background gradient orbs — purely decorative */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Tag line */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base font-medium tracking-widest uppercase text-accent mb-6"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          John{" "}
          <span className="gradient-text">Doe</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-muted font-light mb-10"
        >
          Full Stack Developer
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-muted/70 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I build high-performance web applications with modern technologies.
          Focused on clean code, great UX, and pixel-perfect design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            id="cta-projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative px-8 py-4 bg-accent text-background font-semibold rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View Projects</span>
            {/* Hover shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </a>

          <a
            href="#contact"
            id="cta-contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 border border-border text-foreground font-semibold rounded-xl transition-all duration-300 hover:border-accent/50 hover:text-accent hover:scale-105 active:scale-95"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted/50 tracking-widest uppercase">
            Scroll down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-muted/30 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-muted/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
