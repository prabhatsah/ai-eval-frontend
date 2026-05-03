'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Code2 } from 'lucide-react'

interface CodingEditorProps {
  title: string
  description?: string
  placeholder?: string
  language?: string
  value?: string
  onChange?: (value: string) => void
  readOnly?: boolean
}

export function CodingEditor({
  title,
  description,
  placeholder = 'Write your code here...',
  language = 'javascript',
  value = '',
  onChange,
  readOnly = false,
}: CodingEditorProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-muted/50 border-t px-4 py-3">
          <span className="text-xs font-mono text-muted-foreground">
            {language === 'javascript' && 'JavaScript'}
            {language === 'python' && 'Python'}
            {language === 'java' && 'Java'}
            {language === 'cpp' && 'C++'}
          </span>
        </div>
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            className="min-h-64 font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            spellCheck="false"
          />
          {/* Line numbers would go here in a more complete implementation */}
        </div>
      </CardContent>
    </Card>
  )
}
