"use client";

import { BriefcaseBusiness, Calendar, Building2, MapPin } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";
import { motion } from "framer-motion";

export default function ExperienceTimeline({ experience = [] }) {
  if (!experience.length) return null;

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
          <div className="flex items-center gap-3 mb-8">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(160deg, #2a2a2a, #131313)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <BriefcaseBusiness size={22} className="text-white/60" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
                Work Experience
              </h2>

              <p className="text-sm text-zinc-400">
                {experience.length} professional position
                {experience.length > 1 && "s"}
              </p>
            </div>
          </div>

          <div className="relative">
            {experience.map((job, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 }}
                key={index}
                className="relative pl-10 pb-10 last:pb-0"
              >
                {/* Timeline line */}

                {index !== experience.length - 1 && (
                  <div className="absolute left-[11px] top-6 h-full w-px bg-white/10" />
                )}

                {/* Timeline dot */}

                <div
                  className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full ring-4"
                  style={{
                    background: "linear-gradient(160deg, #3a3a3a, #1a1a1a)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2)",
                    "--tw-ring-color": "#121212",
                  }}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-white/80" />
                </div>

                <div
                  className="rounded-2xl p-5 transition-all duration-300"
                  style={{
                    background: "linear-gradient(165deg, #1c1c1c, #141414)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3 className="text-lg font-semibold text-white tracking-[-0.01em]">
                    {job.designation || "Position"}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-400">
                    {job.company && (
                      <span className="flex items-center gap-2">
                        <Building2 size={15} />
                        {job.company}
                      </span>
                    )}

                    {job.location && (
                      <span className="flex items-center gap-2">
                        <MapPin size={15} />
                        {job.location}
                      </span>
                    )}

                    <span className="flex items-center gap-2">
                      <Calendar size={15} />
                      {job.startDate || "—"} —{" "}
                      {job.isCurrent ? "Present" : job.endDate || "Present"}
                    </span>
                  </div>

                  {job.description && (
                    <p className="mt-5 leading-7 text-zinc-300">
                      {job.description}
                    </p>
                  )}

                  {job.skillsUsed?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.skillsUsed.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg px-3 py-1 text-xs text-zinc-300"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}