'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Mic } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  type: 'question' | 'answer'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  title: string
  description?: string
  messages: Message[]
  currentInput?: string
  onSendMessage?: (message: string) => void
  isLoading?: boolean
}

export function ChatInterface({
  title,
  description,
  messages,
  currentInput = '',
  onSendMessage,
  isLoading = false,
}: ChatInterfaceProps) {
  const [input, setInput] = React.useState(currentInput)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage?.(input)
      setInput('')
    }
  }

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden">
      <CardHeader className="flex-shrink-0">
        <div className="space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4 p-0 overflow-hidden">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-center">
                <p className="text-muted-foreground text-sm">
                  Waiting for the interviewer to start...
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 animate-in fade-in-50 duration-300 ${
                    message.type === 'question' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'question'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t px-6 py-4 space-y-3">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type your response..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={isLoading}
            >
              <Mic className="h-4 w-4 mr-2" />
              Voice Answer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
