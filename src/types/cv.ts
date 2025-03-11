export interface PersonalInfo {
  title: string;
  currentRole: string;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  portfolio?: string;
  nationality?: string;
  seniority?: string;
  profileImage?: string;
  competencies: string[];
  professionalSummary?: string;
}

export interface CareerEntry {
  id: string;
  startDate: string;
  endDate: string | null;
  role: string;
  company: string;
  location?: string;
  description: string;
  department?: string;
  responsibilities?: string[];
  achievements?: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  client?: string;
  responsibilities: string[];
  technologies?: string[];
  outcomes?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  specialization?: string[];
  achievements?: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  location?: string;
  year: string;
  description?: string;
}

export interface Certificate {
  id: string;
  title: string;
  provider: string;
  certificateNumber?: string;
  issueDate: string;
  expiryDate?: string;
  description?: string;
}

export interface CVSection {
  id: string;
  type: 'personal' | 'career' | 'projects' | 'education' | 'courses' | 'certificates';
  title: string;
  visible: boolean;
  order: number;
}

export interface CVData {
  personalInfo: PersonalInfo;
  career: CareerEntry[];
  projects: ProjectEntry[];
  education: Education[];
  courses: Course[];
  certificates: Certificate[];
  sections: CVSection[];
}

export interface CVStore {
  data: CVData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addCareerEntry: (entry: Omit<CareerEntry, 'id'>) => void;
  updateCareerEntry: (id: string, entry: Partial<CareerEntry>) => void;
  addProjectEntry: (entry: Omit<ProjectEntry, 'id'>) => void;
  updateProjectEntry: (id: string, entry: Partial<ProjectEntry>) => void;
  addEducation: (entry: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, entry: Partial<Education>) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  addCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void;
  reorderSections: (sections: CVSection[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
}