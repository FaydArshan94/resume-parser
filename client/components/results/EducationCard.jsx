"use client";

import { GraduationCap, Calendar, Building2 } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

export default function EducationCard({ education = [] }) {
  if (!education.length) return null;

  return (
    <FadeInSection>
      <section className="mb-10">
        <div className="rounded-3xl border border-white/10 bg-[#161B22] p-7 shadow-lg">
          <div className="flex items-center gap-3 mb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
              <GraduationCap className="text-[#4A6FA5]" size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">Education</h2>
              <p className="text-sm text-zinc-400">Academic background</p>
            </div>
          </div>

          <div className="space-y-5">
            {education.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#1C2129] p-5"
              >
                <h3 className="font-semibold text-white text-lg">
                  {item.degree}
                </h3>

                {item.field && (
                  <p className="text-[#4A6FA5] mt-1">{item.field}</p>
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
