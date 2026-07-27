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


  return (
    <FadeInSection>
      <section className="mb-10">
        <div
          className="rounded-3xl p-7"
          style={{
            background:
              "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 20px 40px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(160deg, #2a2a2a, #131313)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <Code2 size={22} className="text-white/60" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
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
                className="rounded-xl px-4 py-2 text-sm text-zinc-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40"
                style={{
                  background: "linear-gradient(165deg, #1c1c1c, #141414)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
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