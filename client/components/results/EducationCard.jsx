"use client";

import { GraduationCap, Calendar, Building2 } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

export default function EducationCard({ education = [] }) {
  if (!education.length) return null;

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
          <div className="flex items-center gap-3 mb-7">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(160deg, #2a2a2a, #131313)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <GraduationCap className="text-white/60" size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">Education</h2>
              <p className="text-sm text-zinc-400">Academic background</p>
            </div>
          </div>

          <div className="space-y-5">
            {education.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(165deg, #1c1c1c, #141414)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="font-semibold text-white text-lg tracking-[-0.01em]">
                  {item.degree}
                </h3>

                {item.field && (
                  <p className="text-white/50 mt-1">{item.field}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Building2 size={15} />
                    {item.institution}
                  </span>

                  <span className="flex items-center gap-2">
                    <Calendar size={15} />
                    {item.startYear} — {item.endYear}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}