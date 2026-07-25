export interface SkillItem {
  name: string;
  level: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  highlights: string[];
  techStack: string[];
  liveLink: string;
  githubLink: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  badgeType: 'Gold' | 'Silver' | 'Bronze';
  verificationId: string;
  skillsVerified: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  location: string;
  availableStatus: string;
  email: string;
}

export interface PortfolioData {
  profile: ProfileData;
  profilePhoto: string;
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
}
