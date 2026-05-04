import { CreateEvaluationRequest, Evaluation } from "../types/evaluation.types";
import { apiClient } from "./client";

export const createEvaluation = async (
  data: CreateEvaluationRequest,
): Promise<Evaluation> => {
  const res = await apiClient.post<Evaluation>("/evaluations", data);
  return res.data;
};

export const getEvaluations = async (): Promise<Evaluation[]> => {
  const res = await apiClient.get<Evaluation[]>("/evaluations");
  return res.data;
};

export const getEvaluationById = async (id: string): Promise<Evaluation> => {
  const res = await apiClient.get<Evaluation>(`/evaluations/${id}`);
  return res.data;
};
