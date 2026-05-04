"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateEvaluationPage() {
  const [formData, setFormData] = useState({
    title: "",
    skill: "",
    mcqCount: "5",
    includeCoding: false,
    aiInterviewCount: "3",
    passingCriteria: "60",
    mcqCutoff: "50",
    codingCutoff: "50",
    aiInterviewCutoff: "50",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Evaluation created:", formData);
    setIsSubmitting(false);

    // Show success message or redirect
    alert("Evaluation created successfully!");
  };

  const skills = [
    "Frontend Development",
    "Backend Development",
    "Full Stack",
    "Python",
    "Data Science",
    "DevOps",
    "Cloud Architecture",
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/manager-dashboard">
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Evaluation
          </h1>
          <p className="text-muted-foreground">
            Set up a new evaluation for your team members
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Name and skill for this evaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Evaluation Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Senior Frontend Developer Assessment"
                value={formData.title}
                onChange={handleChange}
                required
                className="border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill">Skill *</Label>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={skill}
                      name="skill"
                      value={skill}
                      checked={formData.skill === skill}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <Label
                      htmlFor={skill}
                      className="font-normal cursor-pointer"
                    >
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Structure */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Evaluation Structure</CardTitle>
            <CardDescription>
              Configure the types and number of questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mcqCount">Number of MCQ Questions *</Label>
              <Input
                id="mcqCount"
                name="mcqCount"
                type="number"
                min="1"
                max="50"
                value={formData.mcqCount}
                onChange={handleChange}
                className="border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 5-20 questions
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeCoding"
                  name="includeCoding"
                  checked={formData.includeCoding}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      includeCoding: checked as boolean,
                    }))
                  }
                />
                <Label
                  htmlFor="includeCoding"
                  className="font-normal cursor-pointer"
                >
                  Include Coding Challenge
                </Label>
              </div>
              {formData.includeCoding && (
                <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                  Candidates will be asked to solve 1 coding problem with test
                  cases
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="aiInterviewCount">
                Number of AI Interview Questions *
              </Label>
              <Input
                id="aiInterviewCount"
                name="aiInterviewCount"
                type="number"
                min="1"
                max="20"
                value={formData.aiInterviewCount}
                onChange={handleChange}
                className="border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 3-10 questions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Passing Criteria */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Passing Criteria</CardTitle>
            <CardDescription>
              Set the score thresholds for this evaluation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="passingCriteria">
                Overall Passing Percentage *
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="passingCriteria"
                  name="passingCriteria"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.passingCriteria}
                  onChange={handleChange}
                  className="border-border/50"
                />
                <span className="text-muted-foreground">%</span>
              </div>
            </div>

            <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
              <p className="font-medium text-sm">Section-wise Cutoff Scores</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mcqCutoff">MCQ Cutoff</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="mcqCutoff"
                      name="mcqCutoff"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.mcqCutoff}
                      onChange={handleChange}
                      className="border-border/50 w-24"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              {formData.includeCoding && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="codingCutoff">Coding Cutoff</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="codingCutoff"
                        name="codingCutoff"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.codingCutoff}
                        onChange={handleChange}
                        className="border-border/50 w-24"
                      />
                      <span className="text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="aiInterviewCutoff">AI Interview Cutoff</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="aiInterviewCutoff"
                      name="aiInterviewCutoff"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.aiInterviewCutoff}
                      onChange={handleChange}
                      className="border-border/50 w-24"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link href="/manager-dashboard">
            <Button variant="outline" className="border-border/50">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={!formData.title || !formData.skill || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              "Create Evaluation"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
