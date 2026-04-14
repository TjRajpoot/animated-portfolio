// "use client";

// import { motion } from "framer-motion";

// /**
//  * SkillsSection — Categorized skill grid with lime accents.
//  * Subtle stagger entrance and hover glow.
//  */

// interface SkillCategory {
//   title: string;
//   skills: string[];
// }

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
//     },
//   },
// };
// const SKILL_CATEGORIES: SkillCategory[] = [
//   {
//     title: "Frontend",
//     skills: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
//   },
//   {
//     title: "Backend",
//     skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Nodemailer"],
//   },
//   {
//     title: "Mobile",
//     skills: ["Flutter", "Dart", "Hive (Offline DB)"],
//   },
//   {
//     title: "Database",
//     skills: ["MongoDB", "Mongoose"],
//   },
//   {
//     title: "Tools & Design",
//     skills: ["Git", "GitHub", "Figma", "VS Code", "Postman"],
//   },
//   {
//     title: "Concepts",
//     skills: ["Responsive Design", "Design Systems", "OTP Flows", "Component Architecture"],
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, x: -120 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
//   },
// };

// export default function SkillsSection() {
//   return (
//     <section
//       id="skills"
//     className="relative flex h-screen w-screen flex-shrink-0 items-center px-6 pb-10 md:px-8 lg:px-10"
//     >
//       <div className="pointer-events-none top-1/2 w-[3rem] -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
//       <div className="pointer-events-none absolute right-[-8%] top-[18%] rounded-full bg-white/6 blur-[110px]" />

//       <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//           className="mb-14 max-w-4xl"
//         >
//           <motion.p
//             variants={fadeUp}
//             className="lime-badge mb-6 w-fit"
//           >
//             Skills & Tools
//           </motion.p>
//           <h2 className="text-4xl items-start font-bold tracking-tight md:text-4xl lg:text-6xl">
//             The stack behind{" "}
//             <span className="gradient-text">fast, polished builds.</span>
//           </h2>
//           <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted/75 md:text-base">
//             A product-focused toolkit across frontend systems, backend architecture, and design-aware implementation.
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//           className="grid w-full gap-4 md:gap-5 mt-10 pt-10"
//         >
//           {SKILL_CATEGORIES.map((category) => (
//             <motion.div
//               key={category.title}
//               variants={cardVariants}
//               className="w-full rounded-[2rem] transition-colors duration-300 hover:border-accent/20 md:px-8 mt-5 pt-10"
//             >
//               <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
//                 <div className="md:min-w-44">
//                   <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
//                     {category.title}
//                   </h3>
//                 </div>

//                 {/* <div className="h-px w-full bg-white/8 md:h-16 md:w-px md:bg-accent/12" />*/}

//                 <div className="flex flex-wrap gap-4 mt-5">
//                   {category.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-5 py-2.5 text-xs font-medium text-muted transition-colors duration-200 hover:border-accent/20 hover:bg-accent/8 hover:text-foreground"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
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
        className="h-full w-full flex items-center"
        style={{ paddingLeft: "4rem", paddingRight: "2rem" }}
      >
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column — Heading */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center shrink-0">
            <p className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-5">
              Skills &amp; Tools
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
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