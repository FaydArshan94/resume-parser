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
        <div className="flex  items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center  gap-2 text-sm text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:border-[#4A6FA5]/60 hover:bg-[#4A6FA5]/10 transition"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy JSON"}
        </button> */}
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#161B22] p-8 shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#4A6FA5] to-cyan-500 text-3xl font-bold text-white shadow-lg">
                {initials}
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  {personalInfo.fullName || "Unnamed Candidate"}
                </h1>

                <p className="mt-2 text-lg text-[#4A6FA5]">
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
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1C2129] px-4 py-3">
      <div className="text-[#4A6FA5]">{icon}</div>

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
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1C2129] px-4 py-3 transition hover:border-[#4A6FA5]/40 hover:bg-[#222834]"
    >
      <div className="text-[#4A6FA5]">{icon}</div>

      <span className="text-sm text-zinc-300">{value}</span>
    </a>
  );
}
