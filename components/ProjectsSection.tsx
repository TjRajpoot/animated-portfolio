"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ProjectsSection — Cinematic "Camera Zoom Timeline"
 *
 * Simulates a camera flying through 3D space. Each project card sits at a
 * different depth. As the user scrolls, the camera advances along the Z axis,
 * bringing each project into sharp focus before it flies past the viewport.
 *
 * Technique: perspective container + per-card GSAP transforms driven by
 * ScrollTrigger progress. Snap scrolling locks each project in centre view.
 */

interface Project {
  id: number;
  link: string;
  title: string;
  description: string;
  bullets: string[];
  tech: string[];
  image: string;
}
const PROJECTS: Project[] = [
  {
    id: 1,
    link: "https://flopkart-by-tanuj.vercel.app",
    title: "E-Commerce Website",
    description:
      "A full-stack e-commerce platform with product catalog, filtering, and a seamless shopping experience.",
    bullets: [
      "Built full-stack application using the MERN stack",
      "Designed reusable UI components for scalability",
      "Implemented product filtering and user-friendly interface",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    image: "/flopkart.png",
  },
  {
    id: 2,
    title: "MERN Auth System",
    link: "https://mern-front-pearl.vercel.app/login",
    description:
      "A secure authentication system with OTP-based verification and modern responsive UI.",
    bullets: [
      "Built secure authentication using JWT & Nodemailer",
      "Implemented OTP-based login flow",
      "Developed responsive UI using React + Tailwind",
    ],
    tech: ["React", "Tailwind", "Node.js", "JWT", "Nodemailer"],
    image: "/mern-auth.png",
  },
  {
    id: 3,
    title: "Money Manager App",
    link: "https://www.linkedin.com/in/tanuj-singh-rajpoot-154585338/details/projects/",
    description:
      "A mobile expense tracking app with offline persistence and intuitive data visualization.",
    bullets: [
      "Developed a local storage-based expense tracking app",
      "Designed intuitive UI for quick data entry and visualization",
      "Used Hive for efficient offline data persistence",
    ],
    tech: ["Flutter", "Dart", "Hive"],
    image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const dots = dotsRef.current.filter(Boolean) as HTMLDivElement[];
    const counter = counterRef.current;
    const numProjects = cards.length;
    const scrollPerProject = window.innerHeight;

    // Initial state — first card visible, rest hidden in the distance
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, {
          scale: 1,
          opacity: 1,
          z: 0,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
        });
      } else {
        gsap.set(card, {
          scale: 0.35,
          opacity: 0,
          z: -2000,
          y: 60,
          rotateX: 6,
          filter: "blur(18px)",
        });
      }
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scrollPerProject * numProjects}`,
        pin: true,
        scrub: 0.8,
        snap: {
          snapTo: 1 / (numProjects - 1),
          duration: { min: 0.15, max: 0.4 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;

          cards.forEach((card, i) => {
            const centerPoint =
              numProjects > 1 ? i / (numProjects - 1) : 0;
            const distance = progress - centerPoint;
            const absDistance = Math.abs(distance);

            let scale: number,
              opacity: number,
              z: number,
              blur: number,
              y: number,
              rotateX: number;

            if (distance >= 0) {
              // Card is at centre or has been passed (flying behind camera)
              scale = 1 + distance * 6;
              opacity = 1 - distance * 3.5;
              z = distance * 3500;
              blur = distance * 50;
              y = -distance * 250;
              rotateX = distance * -12;
            } else {
              // Card is approaching (ahead in the Z tunnel)
              scale = Math.max(0.25, 1 + distance * 1.8);
              opacity = Math.max(0, 1 - absDistance * 3);
              z = distance * 2800;
              blur = absDistance * 30;
              y = absDistance * 80;
              rotateX = absDistance * 6;
            }

            gsap.set(card, {
              scale: Math.max(0.1, Math.min(5, scale)),
              opacity: Math.max(0, Math.min(1, opacity)),
              z,
              y,
              rotateX,
              filter: `blur(${Math.max(0, Math.min(22, blur))}px)`,
              zIndex: Math.round((1 - absDistance) * 100),
            });
          });

          // Progress dots
          const activeIndex = Math.round(
            progress * (numProjects - 1)
          );
          dots.forEach((dot, i) => {
            if (i === activeIndex) {
              dot.style.background = "#BFFF00";
              dot.style.height = "24px";
              dot.style.boxShadow = "0 0 14px rgba(191,255,0,0.45)";
            } else {
              dot.style.background = "rgba(255,255,255,0.12)";
              dot.style.height = "8px";
              dot.style.boxShadow = "none";
            }
          });

          // Counter
          if (counter) {
            counter.textContent = String(activeIndex + 1).padStart(
              2,
              "0"
            );
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="relative h-screen w-full bg-background overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* 3D stage */}
      <div
        className="relative h-full w-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          perspectiveOrigin: "50% 45%",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute inset-0 flex items-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-20"
              style={{ paddingLeft: "clamp(1.25rem, 5vw, 4rem)", paddingRight: "clamp(1.25rem, 5vw, 4rem)" }}
            >
              {/* Left Column - Text Content */}
              <div className="w-full lg:w-1/2">
                {/* Project number */}
                <p className="text-accent/25 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4 md:mb-7">
                  Project 0{project.id} / 0{PROJECTS.length}
                </p>

                {/* Title */}
                <h3 className="text-2xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4 md:mb-6">
                  {project.title}
                </h3>
                <a href={project.link} target="_blank" className="text-accent px-4 py-2 text-xs font-mono hover:text-white hover:font-bold">Visit live</a>

                {/* Description */}
                <p className="text-white/50 text-sm md:text-xl leading-relaxed mb-4 md:mb-8 max-w-2xl mt-3">
                  {project.description}
                </p>

                {/* Bullet highlights */}
                <ul className="space-y-1.5 md:space-y-2 mb-6 md:mb-10 hidden md:block">
                  {project.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm text-muted/60"
                    >
                      {/* <span className="text-accent text-[6px]">-</span> */}
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 text-xs font-medium rounded-full text-accent/60 tracking-wider uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column - Image (hidden on mobile to prevent overflow) */}
              <div className="hidden lg:block w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(191,255,0,0.05)] opacity-90 group transition-all duration-500 hover:opacity-100 hover:shadow-[0_0_60px_rgba(191,255,0,0.1)]">
                <div className="absolute inset-0 bg-accent/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right progress dots */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:gap-4 z-50">
        {PROJECTS.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="w-1.5 rounded-full transition-all duration-300"
            style={{
              height: i === 0 ? "24px" : "8px",
              background:
                i === 0 ? "#BFFF00" : "rgba(255,255,255,0.12)",
              boxShadow:
                i === 0
                  ? "0 0 14px rgba(191,255,0,0.45)"
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Bottom-left counter */}
      <div
        className="absolute bottom-6 md:bottom-10 left-0 z-50 flex items-baseline gap-2"
        style={{ paddingLeft: "clamp(1.25rem, 5vw, 4rem)" }}
      >
        <span
          ref={counterRef}
          className="text-3xl md:text-5xl font-bold text-accent/70 tabular-nums"
        >
          01
        </span>
        <span className="text-sm text-muted/30 font-mono">
          / 0{PROJECTS.length}
        </span>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/[0.015] blur-[180px] pointer-events-none" />
    </div>
  );
}
