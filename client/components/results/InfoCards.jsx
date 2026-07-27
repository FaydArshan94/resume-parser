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

  const cardStyle = {
    background:
      "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 20px 40px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
  };

  const iconChipStyle = {
    background: "linear-gradient(160deg, #2a2a2a, #131313)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
  };

  return (
   <FadeInSection >
     <section className="grid gap-6 lg:grid-cols-2 mb-10">

      {/* Profession */}

      <div className="rounded-3xl p-6" style={cardStyle}>

        <div className="flex items-center gap-3 mb-6">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={iconChipStyle}>
            <BriefcaseBusiness className="text-white/60" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
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

      <div className="rounded-3xl p-6" style={cardStyle}>

        <div className="flex items-center gap-3 mb-6">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={iconChipStyle}>
            <GraduationCap className="text-white/60" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
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

      <div className="mt-1 text-white/50">
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