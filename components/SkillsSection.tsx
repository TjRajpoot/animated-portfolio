"use client";

import { motion } from "framer-motion";

const skillsData = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Nodemailer"],
  },
  {
    title: "Mobile",
    skills: ["Flutter", "Dart", "Hive"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Figma", "VS Code", "Postman"],
  },
];

export default function SkillsSection() {
  return (
    <div
      id="skills"
      className="relative h-screen w-screen shrink-0"
    >
      <div
        className="h-full w-full flex items-center overflow-y-auto"
        style={{ paddingLeft: "clamp(1.25rem, 5vw, 4rem)", paddingRight: "clamp(1.25rem, 3vw, 2rem)" }}
      >
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-24 py-16 lg:py-0">

          {/* Left Column — Heading */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center shrink-0">
            <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-5">
              Skills &amp; Tools
            </p>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              The stack behind{" "}
              <span className="text-accent">fast builds</span>
            </h2>

            <p className="mt-6 text-muted/70 max-w-md text-base leading-relaxed">
              A simple overview of technologies I use to build modern apps.
            </p>
          </div>

          {/* Right Column — Categorized skill rows */}
          <div className="lg:w-3/5 flex flex-col gap-0">
            {skillsData.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-40px" }}
                className="border-b border-white/8 py-6 first:pt-0 last:border-b-0"
              >
                <h3 className="text-accent text-xs font-semibold uppercase tracking-[0.22em] mb-4">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-4 py-2 text-sm bg-white/[0.03] text-muted font-medium transition-all duration-200 hover:border-accent/40 hover:bg-accent/8 hover:text-foreground cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}