"use client";
import { useState } from "react";
import CandidateHeader from "@/components/results/CandidateHeader";
import InfoCards from "./results/InfoCards";
import SummaryCard from "./results/SummaryCard";
import SkillsCard from "./results/SkillsCard";
import ExperienceTimeline from "./results/ExperienceTimeline";
import ProjectsGrid from "./results/ProjectsGrid";
import JsonViewer from "./results/JsonViewer";
import EducationCard from "./results/EducationCard";
import CertificationsCard from "./results/CertificationsCard";

export default function ResultsView({ data, onBack }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    personalInfo = {},
    summary,
    skills = [],
    experience = [],
    projects = [],
    education = [],
    certifications = [],
    achievements = [],
  } = data;



  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 text-[#F5F3EE]">
      <CandidateHeader
        personalInfo={personalInfo}
        profession={data.profession}
        rawData={data}
        onBack={onBack}
      />

      <InfoCards profession={data.profession} education={education} />

      <SummaryCard summary={summary} />

      <SkillsCard skills={skills} />

      <ExperienceTimeline experience={experience} />

      <ProjectsGrid projects={projects} />

      <EducationCard education={education} />

      <CertificationsCard
        certifications={certifications}
        achievements={achievements}
      />

      {/* JSON panel */}
      <JsonViewer data={data} />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-xl mb-3 text-[#F5F3EE]">{title}</h2>
      {children}
    </div>
  );
}
