"use client";

import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EvaluationStatusBadge } from "@/components/evaluation-status-badge";
import { PlayCircle, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

interface Evaluation {
  id: string;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed" | "passed" | "failed";
  dueDate: string;
  progress?: number;
}

const mockEvaluations: Evaluation[] = [
  {
    id: "1",
    title: "Q1 Performance Review",
    description: "Annual performance evaluation for Q1 2025",
    status: "not-started",
    dueDate: "2025-03-15",
    progress: 0,
  },
  {
    id: "2",
    title: "Technical Skills Assessment",
    description: "Evaluate technical capabilities and proficiency",
    status: "in-progress",
    dueDate: "2025-02-28",
    progress: 45,
  },
  {
    id: "3",
    title: "Communication Skills Evaluation",
    description: "Assessment of communication and collaboration skills",
    status: "completed",
    dueDate: "2025-02-10",
    progress: 100,
  },
  {
    id: "4",
    title: "Project Leadership Assessment",
    description: "Evaluate leadership and project management abilities",
    status: "passed",
    dueDate: "2025-01-20",
    progress: 100,
  },
  {
    id: "5",
    title: "Code Quality Review",
    description: "Review code quality and best practices adherence",
    status: "failed",
    dueDate: "2025-01-15",
    progress: 100,
  },
];

export default function EmployeeDashboardPage() {
  const [evaluations] = useState<Evaluation[]>(mockEvaluations);
  const [startingEvalId, setStartingEvalId] = useState<string | null>(null);

  const handleStartEvaluation = async (evalId: string) => {
    setStartingEvalId(evalId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStartingEvalId(null);
    // In a real app, this would navigate to the evaluation page
    console.log("Starting evaluation:", evalId);
  };

  const completedCount = evaluations.filter(
    (e) => e.status === "passed",
  ).length;
  const inProgressCount = evaluations.filter(
    (e) => e.status === "in-progress",
  ).length;
  const pendingCount = evaluations.filter(
    (e) => e.status === "not-started",
  ).length;

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="border-b border-border p-6">
          <h2 className="text-3xl font-bold tracking-tight">My Evaluations</h2>
          <p className="text-muted-foreground mt-2">
            Track your assigned evaluations and submit responses
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Passed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedCount}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {completedCount} evaluations completed
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inProgressCount}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {inProgressCount} evaluations in progress
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingCount}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {pendingCount} waiting to start
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Evaluations List */}
            {evaluations.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Assigned Evaluations</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {evaluations.map((evaluation) => (
                    <Card
                      key={evaluation.id}
                      className="bg-card/50 border-border/50 hover:border-border/80 transition-colors"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-base">
                              {evaluation.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {evaluation.description}
                            </CardDescription>
                          </div>
                          <EvaluationStatusBadge status={evaluation.status} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Due Date */}
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Due:{" "}
                              {new Date(evaluation.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          {evaluation.progress !== undefined && (
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">
                                  Progress
                                </span>
                                <span className="text-xs font-medium">
                                  {evaluation.progress}%
                                </span>
                              </div>
                              <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                                  style={{ width: `${evaluation.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Action Button */}
                          <Button
                            onClick={() => handleStartEvaluation(evaluation.id)}
                            disabled={
                              startingEvalId === evaluation.id ||
                              evaluation.status === "failed"
                            }
                            className="w-full mt-4"
                            variant={
                              evaluation.status === "not-started"
                                ? "default"
                                : "outline"
                            }
                          >
                            {startingEvalId === evaluation.id ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                Starting...
                              </>
                            ) : evaluation.status === "not-started" ? (
                              <>
                                <PlayCircle className="h-4 w-4 mr-2" />
                                Start Evaluation
                              </>
                            ) : evaluation.status === "in-progress" ? (
                              "Continue Evaluation"
                            ) : evaluation.status === "failed" ? (
                              "Retry Required"
                            ) : (
                              "View Results"
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No Evaluations</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  You currently have no assigned evaluations. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
