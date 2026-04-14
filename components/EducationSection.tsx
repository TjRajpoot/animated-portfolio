"use client";

import { motion } from "framer-motion";

/**
 * EducationSection — Timeline-style education and certifications.
 */

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}

interface CertItem {
  title: string;
  issuer: string;
  period: string;
}

const EDUCATION: EducationItem[] = [
  {
    degree: "B.Tech, Information Technology",
    institution: "Indian Institute of Information Technology, Bhopal",
    period: "2024 — 2028",
  },
  {
    degree: "Senior Secondary (XII), PCM",
    institution: "The Lovedale, Bagaha, Satna",
    period: "2023",
    detail: "Percentage: 91.50%",
  },
];

const CERTIFICATIONS: CertItem[] = [
  {
    title: "Ethical Hacking & Penetration Testing",
    issuer: "CDAC, Bhopal",
    period: "Jan 2025 — Mar 2025",
  },
  {
    title: "Problem-Solving Challenge",
    issuer: "GeeksforGeeks, Bhopal",
    period: "Dec 2024 — Feb 2025",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function EducationSection() {
  return (
    <section id="education" className="w-screen h-screen flex-shrink-0 section-padding flex flex-col justify-center overflow-auto snap-center relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <p className="lime-badge mb-6 w-fit">Education</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Academic background
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h3
              variants={fadeUp}
              className="text-sm font-semibold text-accent mb-6 tracking-wide uppercase"
            >
              Degrees
            </motion.h3>

            <div className="space-y-6 perspective-[1200px]">
              {EDUCATION.map((item) => (
                <motion.div
                  key={item.degree}
                  variants={fadeUp}
                  whileInView={{
                    scale: [0.95, 1],
                    opacity: [0.6, 1],
                    filter: ["blur(4px)", "blur(0px)"],
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-6 border-l-2 border-border hover:border-accent/30 transition-all duration-500"
                >


                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h4 className="text-base md:text-lg font-semibold">
                      {item.degree}
                    </h4>
                    <span className="text-xs font-mono text-accent/70 shrink-0">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{item.institution}</p>
                  {item.detail && (
                    <p className="text-sm text-accent/80 mt-1 font-medium">
                      {item.detail}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.h3
              variants={fadeUp}
              className="text-sm font-semibold text-accent mb-6 tracking-wide uppercase"
            >
              Certifications
            </motion.h3>

            <div className="space-y-6">
              {CERTIFICATIONS.map((cert) => (
                <motion.div
                  key={cert.title}
                  variants={fadeUp}
                  whileInView={{
                    scale: [0.95, 1],
                    opacity: [0.6, 1],
                    filter: ["blur(4px)", "blur(0px)"],
                  }}
                  className="relative pl-6 border-l-2 border-border hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h4 className="text-base md:text-lg font-semibold">
                      {cert.title}
                    </h4>
                    <span className="text-xs font-mono text-accent/70 shrink-0">
                      {cert.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
