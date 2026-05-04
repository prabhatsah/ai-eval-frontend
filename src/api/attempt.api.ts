import { Attempt, SubmitAnswerRequest } from "../types/attempt.types";
import { apiClient } from "./client";

export const startAttempt = async (evaluationId: string): Promise<Attempt> => {
  const res = await apiClient.post<Attempt>("/attempt/start", {
    evaluationId,
  });
  return res.data;
};

export const submitAnswer = async (
  payload: SubmitAnswerRequest,
): Promise<void> => {
  await apiClient.post("/attempt/answer", payload);
};

export const finalizeAttempt = async (attemptId: string): Promise<Attempt> => {
  const res = await apiClient.post<Attempt>("/attempt/submit", {
    attemptId,
  });
  return res.data;
};
