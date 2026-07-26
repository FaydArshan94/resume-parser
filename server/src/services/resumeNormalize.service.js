export const normalizeResume = (resume) => {
  // ---------- Root ----------
  resume.summary ??= "";
  resume.skills ??= [];
  resume.experience ??= [];
  resume.education ??= [];
  resume.projects ??= [];
  resume.certifications ??= [];
  resume.achievements ??= [];
  resume.languages ??= [];

  // ---------- Personal Info ----------
  resume.personalInfo ??= {};

  resume.personalInfo.fullName ??= "";
  resume.personalInfo.email ??= "";
  resume.personalInfo.phone ??= "";
  resume.personalInfo.location ??= "";

  // ---------- Profession ----------
  resume.profession ??= {};

  resume.profession.currentDesignation ??= "";
  resume.profession.targetRole ??= "";
  resume.profession.industry ??= "";
  resume.profession.experienceLevel ??= "";

  // ---------- Social Links ----------
  resume.socialLinks ??= {};

  const socialKeys = [
    "linkedin",
    "github",
    "portfolio",
    "website",
    "leetcode",
    "kaggle",
    "behance",
    "dribbble",
    "stackoverflow",
  ];

  socialKeys.forEach((key) => {
    resume.socialLinks[key] ??= "";
  });

  // ---------- Experience ----------
  resume.experience = resume.experience.map((exp) => ({
    company: exp.company ?? exp.organization ?? "",
    designation: exp.designation ?? "",
    location: exp.location ?? "",
    employmentType: exp.employmentType ?? "",
    startDate: exp.startDate ?? "",
    endDate: exp.endDate ?? "",
    isCurrent: exp.isCurrent ?? false,
    description: exp.description ?? "",
    industry: exp.industry ?? "",
    skillsUsed: exp.skillsUsed ?? [],
  }));

  // ---------- Education ----------
  resume.education = resume.education.map((edu) => ({
    institution: edu.institution ?? "",
    degree: edu.degree ?? "",
    field: edu.field ?? "",
    startYear: edu.startYear ?? "",
    endYear: edu.endYear ?? "",
    grade: edu.grade ?? "",
  }));

  // ---------- Projects ----------
  resume.projects = resume.projects.map((project) => ({
    title: project.title ?? "",
    description: project.description ?? "",
    technologies: project.technologies ?? project.technologiesOrTools ?? [],
    url: project.url ?? "",
  }));

  // ---------- Certifications ----------
  resume.certifications = resume.certifications.map((cert) => ({
    name: cert.name ?? "",
    issuer: cert.issuer ?? "",
    issueDate: cert.issueDate ?? "",
  }));

  return resume;
};