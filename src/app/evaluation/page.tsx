'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QuestionCard } from '@/components/question-card'
import { CodingEditor } from '@/components/coding-editor'
import { ChatInterface } from '@/components/chat-interface'
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { AppLayout } from '@/components/app-layout'

type Section = 'mcq' | 'coding' | 'interview'

interface Message {
  id: string
  type: 'question' | 'answer'
  content: string
  timestamp: Date
}

// Mock data
const EVALUATION_DATA = {
  title: 'Full Stack Developer Evaluation',
  totalTime: 3600, // 60 minutes in seconds
  sections: {
    mcq: {
      label: 'Multiple Choice Questions',
      duration: 15,
      questions: [
        {
          id: '1',
          question: 'What is the time complexity of binary search?',
          description: 'Choose the correct answer',
          options: [
            { id: 'a', text: 'O(n)', value: 'a' },
            { id: 'b', text: 'O(log n)', value: 'b' },
            { id: 'c', text: 'O(n²)', value: 'c' },
            { id: 'd', text: 'O(n log n)', value: 'd' },
          ],
        },
        {
          id: '2',
          question: 'Which of the following is NOT a valid HTML5 semantic element?',
          description: 'Select the incorrect option',
          options: [
            { id: 'a', text: '<article>', value: 'a' },
            { id: 'b', text: '<section>', value: 'b' },
            { id: 'c', text: '<paragraph>', value: 'c' },
            { id: 'd', text: '<nav>', value: 'd' },
          ],
        },
        {
          id: '3',
          question: 'What is the correct way to select all elements with the class "active"?',
          description: 'CSS selector question',
          options: [
            { id: 'a', text: '.active', value: 'a' },
            { id: 'b', text: '#active', value: 'b' },
            { id: 'c', text: '[active]', value: 'c' },
            { id: 'd', text: 'active', value: 'd' },
          ],
        },
      ],
    },
    coding: {
      label: 'Coding Challenge',
      duration: 30,
      challenge:
        'Write a function that reverses a string without using built-in reverse methods.',
      template: 'function reverseString(str) {\n  // Your code here\n}\n\nreverseString("hello");',
    },
    interview: {
      label: 'AI Interview',
      duration: 15,
      initialQuestion: 'Tell me about your experience with React and how you handle state management.',
    },
  },
}

export default function EvaluationPage() {
  const [currentSection, setCurrentSection] = React.useState<Section>('interview')
  const [timeRemaining, setTimeRemaining] = React.useState(EVALUATION_DATA.totalTime)
  const [sectionAnswers, setSectionAnswers] = React.useState<Record<string, string>>({})
  const [codingAnswer, setCodingAnswer] = React.useState(
    EVALUATION_DATA.sections.coding.template
  )
  const [chatMessages, setChatMessages] = React.useState<Message[]>([
    {
      id: '1',
      type: 'question',
      content: EVALUATION_DATA.sections.interview.initialQuestion,
      timestamp: new Date(),
    },
  ])

  // Timer effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelectOption = (value: string) => {
    setSectionAnswers((prev) => ({
      ...prev,
      [`q-${Object.keys(sectionAnswers).length}`]: value,
    }))
  }

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Math.random().toString(),
      type: 'answer',
      content: message,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, newMessage])

    // Mock response after a delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'question',
          content: "That's interesting! Can you elaborate on how you handled state management challenges?",
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  const sections = Object.entries(EVALUATION_DATA.sections) as Array<
    [Section, (typeof EVALUATION_DATA.sections)[Section]]
  >
  const currentSectionIndex = sections.findIndex(([key]) => key === currentSection)
  const progressPercentage = ((currentSectionIndex + 1) / sections.length) * 100

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header with Timer */}
        <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{EVALUATION_DATA.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {currentSection === 'mcq' && 'Multiple Choice Questions'}
                  {currentSection === 'coding' && 'Coding Challenge'}
                  {currentSection === 'interview' && 'AI Interview'}
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-mono font-semibold">
                <Clock className="h-5 w-5" />
                {formatTime(timeRemaining)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  Section {currentSectionIndex + 1} of {sections.length}
                </span>
                <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* MCQ Section */}
            {currentSection === 'mcq' && (
              <div className="space-y-6">
                {EVALUATION_DATA.sections.mcq.questions.map((question, idx) => (
                  <QuestionCard
                    key={question.id}
                    questionNumber={idx + 1}
                    totalQuestions={EVALUATION_DATA.sections.mcq.questions.length}
                    question={question.question}
                    description={question.description}
                    options={question.options}
                    selectedValue={sectionAnswers[`q-${idx}`]}
                    onSelectOption={handleSelectOption}
                  />
                ))}
              </div>
            )}

            {/* Coding Section */}
            {currentSection === 'coding' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Coding Challenge</CardTitle>
                    <CardDescription>{EVALUATION_DATA.sections.coding.challenge}</CardDescription>
                  </CardHeader>
                </Card>
                <CodingEditor
                  title="Code Solution"
                  description="Write your solution below"
                  language="javascript"
                  value={codingAnswer}
                  onChange={setCodingAnswer}
                  placeholder="Write your code here..."
                />
              </div>
            )}

            {/* Interview Section */}
            {currentSection === 'interview' && (
              <div className="h-[600px]">
                <ChatInterface
                  title="AI Interview"
                  description="Answer the interviewer's questions. Press Enter or click Send to submit your answer."
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  const prevIndex = currentSectionIndex - 1
                  if (prevIndex >= 0) {
                    setCurrentSection(sections[prevIndex][0])
                  }
                }}
                disabled={currentSectionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Section
              </Button>

              <Button
                variant="default"
                onClick={() => {
                  if (currentSectionIndex === sections.length - 1) {
                    console.log('[v0] Evaluation submitted')
                  } else {
                    const nextIndex = currentSectionIndex + 1
                    setCurrentSection(sections[nextIndex][0])
                  }
                }}
              >
                {currentSectionIndex === sections.length - 1
                  ? 'Submit Evaluation'
                  : 'Next Section'}
                {currentSectionIndex < sections.length - 1 && (
                  <ChevronRight className="h-4 w-4 ml-2" />
                )}
              </Button>
            </div>

            {/* Section Summary */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {sections.map(([section, data]) => (
                <Card
                  key={section}
                  className={`cursor-pointer transition-all ${
                    currentSection === section
                      ? 'ring-2 ring-primary border-primary'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentSection(section)}
                >
                  <CardHeader>
                    <CardTitle className="text-base">
                      {section === 'mcq' && 'MCQ'}
                      {section === 'coding' && 'Coding'}
                      {section === 'interview' && 'Interview'}
                    </CardTitle>
                    <CardDescription>
                      {data.duration} {data.duration === 1 ? 'minute' : 'minutes'}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
