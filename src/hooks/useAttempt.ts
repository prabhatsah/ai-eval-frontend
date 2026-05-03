import { useState } from "react";
import { startAttempt, submitAnswer, finalizeAttempt } from "../api/attempt.api";
import { Attempt, SubmitAnswerRequest } from "../types/attempt.types";

export const useAttempt = () => {
  const [attemptId, setAttemptId] = useState<string | null>(null);

  const start = async (evaluationId: string): Promise<Attempt> => {
    const data = await startAttempt(evaluationId);
    setAttemptId(data.id);
    return data;
  };

  const answer = async (payload: SubmitAnswerRequest): Promise<void> => {
    return submitAnswer(payload);
  };

  const submit = async (): Promise<Attempt | undefined> => {
    if (!attemptId) return;
    return finalizeAttempt(attemptId);
  };

  return {
    attemptId,
    start,
    answer,
    submit,
  };
};
