export type SectionType = "AI" | "MCQ" | "CODING";

export interface SectionConfig {
  weight: number;
}

export type Sections = Record<SectionType, SectionConfig>;

export interface CreateEvaluationRequest {
  title: string;
  skill: string;
  sections: Sections;
  passingScore: number;
}

export interface Evaluation {
  id: string;
  title: string;
  skill: string;
  config: {
    sections: Sections;
    passingScore: number;
  };
  createdBy: string;
  createdAt: string; // ISO string (comes from API)
}
