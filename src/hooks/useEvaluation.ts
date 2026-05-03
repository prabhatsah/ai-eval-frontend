import { useState } from "react";
import { createEvaluation, getEvaluations } from "../api/evaluation.api";
import { CreateEvaluationRequest, Evaluation } from "../types/evaluation.types";

export const useEvaluation = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const fetchEvaluations = async (): Promise<void> => {
    const res = await getEvaluations();
    setEvaluations(res);
  };

  const create = async (data: CreateEvaluationRequest): Promise<Evaluation> => {
    return createEvaluation(data);
  };

  return {
    evaluations,
    fetchEvaluations,
    create,
  };
};
