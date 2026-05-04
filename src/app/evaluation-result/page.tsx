"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertCircle,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Progress } from "@/components/ui/progress";

interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  status: "pass" | "fail";
}

// Mock result data
const RESULT_DATA = {
  evaluationTitle: "Full Stack Developer Evaluation",
  totalScore: 78,
  maxScore: 100,
  status: "pass",
  completedAt: new Date("2024-05-01T14:30:00"),
  sections: [
    {
      name: "Multiple Choice Questions",
      score: 85,
      maxScore: 100,
      status: "pass",
      details: {
        correct: 17,
        total: 20,
        timeSpent: "12 minutes",
      },
    },
    {
      name: "Coding Challenge",
      score: 75,
      maxScore: 100,
      status: "pass",
      details: {
        testsPassed: 7,
        totalTests: 10,
        timeSpent: "28 minutes",
      },
    },
    {
      name: "AI Interview",
      score: 68,
      maxScore: 100,
      status: "fail",
      details: {
        communicationScore: 7,
        technicalDepth: 6,
        clarity: 7,
      },
    },
  ] as SectionScore[],
};

const FEEDBACK = [
  {
    title: "Strengths",
    items: [
      "Strong fundamentals in data structures and algorithms",
      "Good problem-solving approach with clear logic",
      "Excellent communication of thought process",
    ],
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Areas for Improvement",
    items: [
      "Code optimization could be better for edge cases",
      "Could benefit from more experience with React hooks patterns",
      "Time management during coding section needs work",
    ],
    icon: AlertCircle,
    color: "text-yellow-500",
  },
  {
    title: "Recommendations",
    items: [
      "Practice more advanced system design problems",
      "Review recent changes in JavaScript ES2024 features",
      "Build a portfolio project combining frontend and backend skills",
    ],
    icon: TrendingUp,
    color: "text-blue-500",
  },
];

export default function EvaluationResultPage() {
  const isPassed = RESULT_DATA.status === "pass";
  const scorePercentage = (RESULT_DATA.totalScore / RESULT_DATA.maxScore) * 100;

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                {isPassed ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                    <CheckCircle2 className="h-20 w-20 text-green-500 relative" />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
                    <XCircle className="h-20 w-20 text-red-500 relative" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {isPassed ? "Congratulations!" : "Evaluation Complete"}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {RESULT_DATA.evaluationTitle}
                </p>
              </div>
            </div>

            {/* Main Score Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-6xl font-bold text-primary">
                      {RESULT_DATA.totalScore}
                    </div>
                    <div className="text-muted-foreground">
                      out of {RESULT_DATA.maxScore} points
                    </div>
                  </div>
                  <div className="space-y-2 pt-4">
                    <Progress value={scorePercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {isPassed ? (
                          <span className="text-green-500 font-semibold">
                            PASSED
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            FAILED
                          </span>
                        )}
                      </span>
                      <span>{scorePercentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Section Breakdown */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Section Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RESULT_DATA.sections.map((section, idx) => {
                  const sectionPercentage =
                    (section.score / section.maxScore) * 100;
                  const sectionPassed = section.status === "pass";

                  return (
                    <Card key={idx} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <CardTitle className="text-base">
                              {section.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              {sectionPassed ? (
                                <>
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  <span className="text-green-500">Passed</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4 text-red-500" />
                                  <span className="text-red-500">Failed</span>
                                </>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              {section.score}/{section.maxScore}
                            </span>
                            <span className="text-muted-foreground">
                              {sectionPercentage.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={sectionPercentage} className="h-2" />
                        </div>

                        {/* Section Details */}
                        <div className="text-sm space-y-1 pt-2 border-t">
                          {idx === 0 && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Correct Answers:
                                </span>
                                <span className="font-medium">
                                  {section.details.correct}/
                                  {section.details.total}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Time Spent:
                                </span>
                                <span className="font-medium">
                                  {section.details.timeSpent}
                                </span>
                              </div>
                            </>
                          )}
                          {idx === 1 && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Tests Passed:
                                </span>
                                <span className="font-medium">
                                  {section.details.testsPassed}/
                                  {section.details.totalTests}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Time Spent:
                                </span>
                                <span className="font-medium">
                                  {section.details.timeSpent}
                                </span>
                              </div>
                            </>
                          )}
                          {idx === 2 && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Communication:
                                </span>
                                <span className="font-medium">
                                  {section.details.communicationScore}/10
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Technical Depth:
                                </span>
                                <span className="font-medium">
                                  {section.details.technicalDepth}/10
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Clarity:
                                </span>
                                <span className="font-medium">
                                  {section.details.clarity}/10
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Detailed Feedback</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FEEDBACK.map((section, idx) => {
                  const Icon = section.icon;
                  return (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Icon className={`h-5 w-5 ${section.color}`} />
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex gap-2 text-sm">
                              <span
                                className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${section.color}`}
                              />
                              <span className="text-muted-foreground leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Summary Stats */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Evaluation Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {RESULT_DATA.completedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-2xl font-bold">55 min</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Sections</p>
                    <p className="text-2xl font-bold">
                      {RESULT_DATA.sections.length}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p
                      className={`text-2xl font-bold ${
                        isPassed ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isPassed ? "Passed" : "Failed"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button variant="outline">
                <ArrowRight className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button>
                <ArrowRight className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
