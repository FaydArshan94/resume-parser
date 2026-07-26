"use client";

import { BriefcaseBusiness, Calendar, Building2, MapPin } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";
import { motion } from "framer-motion";

export default function ExperienceTimeline({ experience = [] }) {
  if (!experience.length) return null;

  return (
    <FadeInSection>
      <section className="mb-10">
        <div className="rounded-3xl border border-white/10 bg-[#161B22] p-7 shadow-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
              <BriefcaseBusiness size={22} className="text-[#4A6FA5]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
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

                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#4A6FA5] ring-4 ring-[#161B22]">
                  <div className="h-2.5 w-2.5 rounded-full bg-white" />
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#1C2129] p-5 transition-all duration-300 hover:border-[#4A6FA5]/40 hover:bg-[#202632]">
                  <h3 className="text-lg font-semibold text-white">
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
                          className="rounded-lg bg-[#4A6FA5]/10 border border-[#4A6FA5]/20 px-3 py-1 text-xs text-[#8CB8FF]"
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
