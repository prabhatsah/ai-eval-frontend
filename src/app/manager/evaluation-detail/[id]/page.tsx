'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export default function EvaluationDetailPage({ params }: { params: { id: string } }) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [approvalStatus, setApprovalStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | null>(null)

  // Mock data
  const evaluationData = {
    employeeName: 'John Doe',
    evaluationTitle: 'Senior Frontend Developer Assessment',
    skill: 'Frontend Development',
    score: 85,
    status: 'PASS',
    completedDate: '2024-04-20',
    duration: '45 minutes',
  }

  const mcqAnswers = [
    {
      id: 1,
      question: 'What is the correct way to declare a variable in JavaScript?',
      userAnswer: 'const',
      correctAnswer: 'const',
      isCorrect: true,
      score: 1,
    },
    {
      id: 2,
      question: 'Which of the following is NOT a JavaScript framework?',
      userAnswer: 'Django',
      correctAnswer: 'Django',
      isCorrect: true,
      score: 1,
    },
    {
      id: 3,
      question: 'What does CSS stand for?',
      userAnswer: 'Cascading Style Sheets',
      correctAnswer: 'Cascading Style Sheets',
      isCorrect: true,
      score: 1,
    },
  ]

  const codingAnswers = [
    {
      id: 1,
      question: 'Implement a function to reverse a string',
      userCode: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
      score: 95,
      feedback: 'Excellent solution! Correct approach and handles edge cases well.',
    },
  ]

  const aiInterviewFeedback = {
    communication: {
      score: 8,
      feedback: 'Clear and articulate communication. Good structure in responses.',
    },
    technical: {
      score: 8.5,
      feedback: 'Strong technical knowledge. Demonstrated deep understanding of frontend concepts.',
    },
    problem_solving: {
      score: 7.5,
      feedback: 'Good approach to problem solving. Could have explored more edge cases.',
    },
    overall: {
      score: 8,
      feedback: 'Overall excellent performance. Shows great potential as a senior developer.',
    },
  }

  const handleApprove = async () => {
    setIsApproving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setApprovalStatus('APPROVED')
    setIsApproving(false)
  }

  const handleReject = async () => {
    setIsRejecting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setApprovalStatus('REJECTED')
    setIsRejecting(false)
  }

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/manager/candidate-results">
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Evaluation Details</h1>
          <p className="text-muted-foreground">{evaluationData.employeeName} - {evaluationData.evaluationTitle}</p>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Employee</p>
              <p className="font-semibold">{evaluationData.employeeName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Skill</p>
              <Badge className="w-fit" variant="outline">{evaluationData.skill}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Score</p>
              <p className="text-2xl font-bold">{evaluationData.score}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {evaluationData.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Duration</p>
              <p className="font-semibold">{evaluationData.duration}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-sm font-semibold">{new Date(evaluationData.completedDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="answers" className="space-y-4">
        <TabsList className="border-b border-border/30 bg-transparent w-full justify-start rounded-none p-0">
          <TabsTrigger
            value="answers"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Answers
          </TabsTrigger>
          <TabsTrigger
            value="scores"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Scores & Feedback
          </TabsTrigger>
          <TabsTrigger
            value="ai-feedback"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            AI Interview Feedback
          </TabsTrigger>
        </TabsList>

        {/* Answers Tab */}
        <TabsContent value="answers" className="space-y-6">
          {/* MCQ Answers */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Multiple Choice Questions</CardTitle>
              <CardDescription>Answered 3 out of 3 questions correctly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mcqAnswers.map((answer) => (
                <div key={answer.id} className="space-y-3 pb-4 border-b border-border/30 last:pb-0 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {answer.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{answer.question}</p>
                      <div className="mt-3 space-y-2 text-sm">
                        <p><span className="text-muted-foreground">User's Answer:</span> <span className="font-medium">{answer.userAnswer}</span></p>
                        <p><span className="text-muted-foreground">Correct Answer:</span> <span className="font-medium">{answer.correctAnswer}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Coding Answers */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Coding Challenge</CardTitle>
              <CardDescription>1 problem solved</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {codingAnswers.map((answer) => (
                <div key={answer.id} className="space-y-3">
                  <p className="font-medium">{answer.question}</p>
                  <div className="bg-muted/50 p-4 rounded-md border border-border/30 font-mono text-sm overflow-x-auto">
                    <pre>{answer.userCode}</pre>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Score: {answer.score}%</p>
                      <p className="text-sm text-muted-foreground mt-1">{answer.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scores Tab */}
        <TabsContent value="scores" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/50 bg-emerald-500/5">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">MCQ Score</p>
                  <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">100%</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500">3/3 correct</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-emerald-500/5">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">Coding Score</p>
                  <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">95%</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500">1/1 problem solved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-amber-500/5">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-amber-700 dark:text-amber-400">AI Interview Score</p>
                  <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">80%</p>
                  <p className="text-xs text-amber-600 dark:text-amber-500">Strong performance</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 p-4 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-700 dark:text-emerald-400">Strengths</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-1">
                      Excellent MCQ performance with perfect score. Strong coding fundamentals demonstrated in the challenge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-amber-500/10 rounded-md border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-700 dark:text-amber-400">Areas for Improvement</p>
                    <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">
                      Consider improving communication and explanation of approach. Some minor efficiency improvements possible in code.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Interview Feedback Tab */}
        <TabsContent value="ai-feedback" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(aiInterviewFeedback).map(([key, value]) => {
              if (key === 'overall') return null
              const labels = {
                communication: 'Communication Skills',
                technical: 'Technical Knowledge',
                problem_solving: 'Problem Solving',
              } as const
              return (
                <Card key={key} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{labels[key as keyof typeof labels]}</p>
                        <span className="text-2xl font-bold">{value.score}/10</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(value.score / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{value.feedback}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between pb-3">
                <span className="text-lg font-medium">Overall Score</span>
                <span className="text-3xl font-bold">{aiInterviewFeedback.overall.score}/10</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(aiInterviewFeedback.overall.score / 10) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground pt-2">{aiInterviewFeedback.overall.feedback}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approval Actions */}
      <Card className="border-border/50 bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Review Actions</CardTitle>
          <CardDescription>Approve or reject this evaluation result</CardDescription>
        </CardHeader>
        <CardContent>
          {approvalStatus === null ? (
            <div className="flex gap-3">
              <Button
                onClick={handleApprove}
                disabled={isApproving}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                {isApproving && <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />}
                {isApproving ? 'Approving...' : 'Approve Result'}
              </Button>
              <Button
                onClick={handleReject}
                disabled={isRejecting}
                variant="destructive"
                className="gap-2"
              >
                {isRejecting && <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />}
                {isRejecting ? 'Rejecting...' : 'Reject Result'}
              </Button>
            </div>
          ) : approvalStatus === 'APPROVED' ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-500/20 rounded-md border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-emerald-700 dark:text-emerald-400 font-medium">Result approved successfully!</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-red-500/20 rounded-md border border-red-500/30">
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-400 font-medium">Result rejected. Feedback has been sent to the candidate.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
