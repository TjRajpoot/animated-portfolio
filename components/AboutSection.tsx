"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      id="about"
      className="section-padding relative bg-transparent"
      style={{ paddingLeft: "4rem" }}
      data-about
    >
      <div className="max-w-6xl mx-auto">
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" //for boxes
          >
            {[
              { value: "3+", label: "Projects Built" },
              { value: "2+", label: "Certifications" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-16 rounded-3xl border border-white/10 bg-white/5 text-center  backdrop-blur-md hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-2xl md:text-3xl font-bold text-accent m-20">
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
  );
}