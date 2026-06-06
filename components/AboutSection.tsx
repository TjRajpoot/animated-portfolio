"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { div } from "framer-motion/client";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function AboutSection() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 360]);

  return (
    <div className="relative flex min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-[20px] flex justify-center items-center opacity-10 pointer-events-none overflow-hidden">
        <motion.img
          src="/vercel.svg"
          alt=""
          className="w-[700px] h-[600px] object-contain scale-[1.2] absolute right-0 bottom-0"
          style={{ rotate }}
        />
      </div>

      <section
        id="about"
        className="section-padding relative z-10 bg-transparent flex items-center w-full"
        style={{ paddingLeft: "clamp(1.25rem, 5vw, 4rem)", paddingRight: "clamp(1.25rem, 5vw, 4rem)" }}
        data-about
      >
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ staggerChildren: 0.12 }}
          >
            {/* Label */}
            <motion.p
              variants={fadeUp}
              className="lime-badge mb-6 w-fit"
            >
              About Me
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-10 max-w-3xl"
            >
              Building interfaces that{" "}
              <span className="text-accent">feel fast</span> & look
              <span className="text-accent"> premium</span>.
            </motion.h2>

            {/* Content */}
            <motion.div
              variants={fadeUp}
              className="max-w-2xl mb-16"
            >
              <p className="text-muted text-base md:text-lg leading-relaxed">
                Full Stack Developer specializing in React, Next.js, and modern
                UI systems. I build scalable, high-performance applications with a
                strong focus on clean design and smooth user experience.
              </p>
            </motion.div>

            {/* Stats (Upgraded UI) */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {[
                { value: "3+", label: "Projects Built" },
                { value: "2+", label: "Certifications" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 md:p-10 rounded-3xl border border-white/10 bg-white/5 text-center backdrop-blur-md hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <p className="text-2xl md:text-3xl font-bold text-accent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}