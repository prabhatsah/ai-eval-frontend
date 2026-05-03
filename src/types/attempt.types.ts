import { SectionType } from "./evaluation.types";

export interface Attempt {
  id: string;
  userId: string;
  evaluationId: string;
  status: "IN_PROGRESS" | "PASSED" | "FAILED";
  aiScore?: number;
  finalScore?: number;
  submittedAt?: string;
}

export interface SubmitAnswerRequest {
  attemptId: string;
  question: string;
  answer: string;
  type: SectionType;
}
