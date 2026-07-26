"use client";

import { Code2 } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";
import { motion } from "framer-motion";

export default function SkillsCard({ skills = [] }) {
  if (!skills.length) return null;

  const sortedSkills = [...skills].sort((a, b) => {
    // Strip special characters like quotes from start for an accurate sort placement
    const cleanA = a.replace(/[^a-zA-Z0-9]/g, "");
    const cleanB = b.replace(/[^a-zA-Z0-9]/g, "");
    return cleanA.localeCompare(cleanB);
  });

  // 2. Group skills by their first letter
  // const groupedSkills = sortedSkills.reduce((acc, skill) => {
  //   // Strip special characters like quotes for safe letter grouping
  //   const firstLetter = skill
  //     .replace(/[^a-zA-Z]/g, "")
  //     .charAt(0)
  //     .toUpperCase();
  //   const key = firstLetter || "#"; // Fallback for items starting with symbols only
  //   if (!acc[key]) acc[key] = [];
  //   acc[key].push(skill);
  //   return acc;
  // }, {});

  return (
    <FadeInSection>
      <section className="mb-10">
        <div className="rounded-3xl border border-white/10 bg-[#161B22] p-7 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
              <Code2 size={22} className="text-[#4A6FA5]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Technical Skills
              </h2>

              <p className="text-sm text-zinc-400">
                {skills.length} skills identified
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {sortedSkills.map((skill, index) => (
              <motion.div
                key={skill}
                className="
            rounded-xl
            border
            border-white/10
            bg-[#1C2129]
            px-4
            py-2
            text-sm
            text-zinc-200
            transition-all
            duration-200
            hover:border-[#4A6FA5]/50
            hover:bg-[#232A35]
            hover:-translate-y-1
            hover:shadow-lg
            hover:shadow-[#4A6FA5]/10
          "
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  // Staggered animation delay applies perfectly across the single global timeline
                  delay: index * 0.02,
                  duration: 0.25,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.04,
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
