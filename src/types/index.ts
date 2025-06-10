export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    title: string;
  };
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  achievements: string[];
  confidence: ConfidenceScores;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

export interface ConfidenceScores {
  personalInfo: number;
  summary: number;
  experience: number;
  education: number;
  skills: number;
  projects: number;
  overall: number;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  category: 'executive' | 'creative' | 'technical' | 'academic' | 'startup';
  preview: string;
  features: string[];
}

export interface CustomizationOptions {
  theme: 'indigo' | 'emerald' | 'rose' | 'amber' | 'sky' | 'violet';
  font: 'modern-sans' | 'classic-serif' | 'minimal' | 'creative';
  layout: 'standard' | 'sidebar' | 'minimal' | 'creative';
  sections: {
    contact: boolean;
    skills: boolean;
    education: boolean;
    experience: boolean;
    projects: boolean;
  };
}

export interface BuilderState {
  step: 'upload' | 'analyze' | 'template' | 'customize' | 'preview';
  resumeFile: File | null;
  resumeData: ResumeData | null;
  selectedTemplate: PortfolioTemplate | null;
  customization: CustomizationOptions;
  isProcessing: boolean;
  error: string | null;
}