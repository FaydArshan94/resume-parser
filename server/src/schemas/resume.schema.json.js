export const PersonalInfoSchema = {
  type: "object",
  properties: {
    fullName: {
      type: "string",
      description: "Candidate's full name"
    },
    email: {
      type: "string",
      description: "Primary email address"
    },
    phone: {
      type: "string",
      description: "Primary phone number"
    },
    location: {
      type: "string",
      description: "City, State or Country"
    }
  },
  required: []
};


export const ProfessionSchema = {
  type: "object",
  properties: {
    currentDesignation: {
      type: "string"
    },
    targetRole: {
      type: "string"
    },
    industry: {
      type: "string"
    },
    experienceLevel: {
      type: "string",
      enum: [
        "Student",
        "Fresher",
        "Junior",
        "Mid-Level",
        "Senior",
        "Lead",
        "Manager",
        "Executive"
      ]
    }
  },
  required: []
};

export const SkillsSchema = {
  type: "array",
  description: "List of all skills mentioned in the resume",
  items: {
    type: "string"
  }
};


export const ExperienceSchema = {
  type: "object",
  properties: {
    company: {
      type: "string"
    },
    designation: {
      type: "string"
    },
    employmentType: {
      type: "string"
    },
    location: {
      type: "string"
    },
    startDate: {
      type: "string"
    },
    endDate: {
      type: "string"
    },
    isCurrent: {
      type: "boolean"
    },
    description: {
      type: "string"
    }
  },
  required: []
};



export const EducationSchema = {
  type: "object",
  properties: {
    institution: {
      type: "string"
    },
    degree: {
      type: "string"
    },
    field: {
      type: "string"
    },
    startYear: {
      type: "string"
    },
    endYear: {
      type: "string"
    },
    grade: {
      type: "string"
    }
  },
  required: []
};

export const ProjectSchema = {
  type: "object",
  properties: {
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    technologies: {
      type: "array",
      items: {
        type: "string"
      }
    },
    url: {
      type: "string"
    }
  },
  required: []
};


export const CertificationSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    issuer: {
      type: "string"
    },
    issueDate: {
      type: "string"
    }
  },
  required: []
};


export const AchievementSchema = {
  type: "object",
  properties: {
    title: {
      type: "string"
    },
    description: {
      type: "string"
    }
  },
  required: []
};


export const LanguageSchema = {
  type: "array",
  items: {
    type: "string"
  }
};


export const SocialLinksSchema = {
  type: "object",
  properties: {
    linkedin: {
      type: "string"
    },
    github: {
      type: "string"
    },
    portfolio: {
      type: "string"
    },
    website: {
      type: "string"
    },
    leetcode: {
      type: "string"
    },
    kaggle: {
      type: "string"
    },
    behance: {
      type: "string"
    },
    dribbble: {
      type: "string"
    },
    stackoverflow: {
      type: "string"
    }
  },
  required: []
};


export const ResumeJsonSchema = {
  type: "object",

  properties: {
    personalInfo: PersonalInfoSchema,

    summary: {
      type: "string",
      description: "Professional summary or objective"
    },

    profession: ProfessionSchema,

    skills: SkillsSchema,

    experience: {
      type: "array",
      items: ExperienceSchema
    },

    education: {
      type: "array",
      items: EducationSchema
    },

    projects: {
      type: "array",
      items: ProjectSchema
    },

    certifications: {
      type: "array",
      items: CertificationSchema
    },

    achievements: {
      type: "array",
      items: AchievementSchema
    },

    languages: LanguageSchema,

    socialLinks: SocialLinksSchema
  },

  required: []
};