'use client'

import * as React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface Option {
  id: string
  text: string
  value: string
}

interface QuestionCardProps {
  questionNumber: number
  totalQuestions: number
  question: string
  description?: string
  options: Option[]
  selectedValue?: string
  onSelectOption?: (value: string) => void
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  description,
  options,
  selectedValue,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </div>
            <CardTitle className="text-lg">{question}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedValue || ''} onValueChange={onSelectOption}>
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.id} className="flex items-center gap-3">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer rounded-lg p-3 border border-transparent transition-colors hover:bg-accent"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
