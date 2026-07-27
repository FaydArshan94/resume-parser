"use client";

import {
  ArrowLeft,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  //   Github,
  //   Linkedin,
  Globe,
} from "lucide-react";
import { useState } from "react";
import FadeInSection from "../ui/FadeInSection";

export default function CandidateHeader({
  personalInfo = {},
  profession = {},
  rawData,
  onBack,
}) {
  const [copied, setCopied] = useState(false);

  const initials =
    personalInfo.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <FadeInSection >
      <header className="mb-10 ">
        
        <div
          className="rounded-3xl p-8"
          style={{
            background:
              "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 20px 40px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-6">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-bold text-white"
                style={{
                  background: "linear-gradient(160deg, #2c2c2c, #131313)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    "inset 0 1px 1px rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.5)",
                }}
              >
                {initials}
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-[-0.02em] text-white">
                  {personalInfo.fullName || "Unnamed Candidate"}
                </h1>

                <p className="mt-2 text-lg text-white/50">
                  {profession.currentDesignation ||
                    profession.targetRole ||
                    "Professional"}
                </p>

                {profession.experienceLevel && (
                  <span className="mt-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    {profession.experienceLevel}
                  </span>
                )}
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              {personalInfo.email && (
                <Info icon={<Mail size={17} />} value={personalInfo.email} />
              )}

              {personalInfo.phone && (
                <Info icon={<Phone size={17} />} value={personalInfo.phone} />
              )}

              {personalInfo.location && (
                <Info
                  icon={<MapPin size={17} />}
                  value={personalInfo.location}
                />
              )}

              {/* {personalInfo.linkedin && (
              <LinkInfo
                icon={<Linkedin size={17} />}
                value="LinkedIn"
                href={personalInfo.linkedin}
              />
            )}

            {personalInfo.github && (
              <LinkInfo
                icon={<Github size={17} />}
                value="GitHub"
                href={personalInfo.github}
              />
            )} */}

              {(personalInfo.website || personalInfo.portfolio) && (
                <LinkInfo
                  icon={<Globe size={17} />}
                  value="Portfolio"
                  href={personalInfo.website || personalInfo.portfolio}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </FadeInSection>
  );
}

function Info({ icon, value }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-4 py-3"
      style={{
        background: "linear-gradient(165deg, #1c1c1c, #141414)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
      }}
    >
      <div className="text-white/50">{icon}</div>

      <span className="truncate text-sm text-zinc-300">{value}</span>
    </div>
  );
}

function LinkInfo({ icon, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors"
      style={{
        background: "linear-gradient(165deg, #1c1c1c, #141414)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
      }}
    >
      <div className="text-white/50">{icon}</div>

      <span className="text-sm text-zinc-300">{value}</span>
    </a>
  );
}