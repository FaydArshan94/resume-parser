"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  Building2,
  Target,
  Calendar,
  BookOpen,
} from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

export default function InfoCards({
  profession = {},
  education = [],
}) {
  const latestEducation = education[education.length - 1];

  return (
   <FadeInSection >
     <section className="grid gap-6 lg:grid-cols-2 mb-10">

      {/* Profession */}

      <div className="rounded-3xl border border-white/10 bg-[#161B22] p-6 shadow-lg">

        <div className="flex items-center gap-3 mb-6">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
            <BriefcaseBusiness className="text-[#4A6FA5]" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Professional Profile
            </h2>

            <p className="text-sm text-zinc-400">
              Current career snapshot
            </p>
          </div>

        </div>

        <div className="space-y-5">

          <Item
            icon={<Target size={18} />}
            label="Current Role"
            value={profession.currentDesignation}
          />

          <Item
            icon={<Building2 size={18} />}
            label="Industry"
            value={profession.industry}
          />

          <Item
            icon={<BriefcaseBusiness size={18} />}
            label="Experience"
            value={profession.experienceLevel}
          />

          <Item
            icon={<Target size={18} />}
            label="Target Role"
            value={profession.targetRole}
          />

        </div>

      </div>

      {/* Education */}

      <div className="rounded-3xl border border-white/10 bg-[#161B22] p-6 shadow-lg">

        <div className="flex items-center gap-3 mb-6">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
            <GraduationCap className="text-[#4A6FA5]" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Education
            </h2>

            <p className="text-sm text-zinc-400">
              Latest qualification
            </p>
          </div>

        </div>

        {latestEducation ? (
          <div className="space-y-5">

            <Item
              icon={<BookOpen size={18} />}
              label="Degree"
              value={latestEducation.degree}
            />

            <Item
              icon={<Building2 size={18} />}
              label="Institution"
              value={latestEducation.institution}
            />

            <Item
              icon={<Calendar size={18} />}
              label="Duration"
              value={`${latestEducation.startYear || "-"} • ${
                latestEducation.endYear || "Present"
              }`}
            />

          </div>
        ) : (
          <p className="text-zinc-500 text-sm">
            No education data available.
          </p>
        )}

      </div>

    </section>
   </FadeInSection>
  );
}

function Item({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">

      <div className="mt-1 text-[#4A6FA5]">
        {icon}
      </div>

      <div>

        <p className="text-xs uppercase tracking-wider text-zinc-500">
          {label}
        </p>

        <p className="mt-1 text-[15px] text-white">
          {value || "—"}
        </p>

      </div>

    </div>
  );
}