# Evaluation & Results Pages Documentation

## Overview

This documentation covers the evaluation interface and results pages, which are step-based assessment experiences for candidates. The system is fully UI/UX designed with no business logic - ready for backend integration.

## Pages Created

### 1. Evaluation Page (`/evaluation`)

A comprehensive multi-section evaluation interface with real-time timer, progress tracking, and section navigation.

**Features:**

- **Step-based Interface**: Navigate between 3 distinct sections (MCQ, Coding, Interview)
- **Timer Display**: Real-time countdown timer showing remaining evaluation time
- **Progress Bar**: Visual progress indicator for overall evaluation completion
- **Section Indicators**: Cards at the bottom showing all sections with duration info
- **Navigation Controls**: Previous/Next buttons for section navigation

**Sections:**

#### 1.1 MCQ Section

- Displays multiple-choice questions with radio button selections
- Shows question number and total question count
- Each option is clickable with hover effects
- Selected answers are tracked
- Uses the `QuestionCard` component

#### 1.2 Coding Section

- Styled code editor textarea with syntax highlighting placeholder
- Shows challenge description and requirements
- Language indicator (JavaScript, Python, Java, C++)
- Full editable code editor experience
- Uses the `CodingEditor` component

#### 1.3 AI Interview Section

- Chat-based interview interface
- Shows interviewer questions and candidate responses
- Scroll area that auto-scrolls to latest messages
- Input field with send button and voice answer option
- Mock AI response simulation
- Uses the `ChatInterface` component

**Technical Details:**

- State management for section navigation and answers
- Countdown timer with useEffect
- Conditional rendering based on current section
- Mock data structure with all evaluation content

### 2. Results Page (`/evaluation-result`)

Comprehensive results display showing scores, section breakdown, and detailed feedback.

**Features:**

- **Status Indicator**: Large visual icon (green checkmark for pass, red X for fail)
- **Main Score Card**: Prominent display of total score with progress bar
- **Section Breakdown**: 3-column grid showing:
  - Section name and pass/fail status
  - Score and percentage
  - Section-specific details (correct answers, tests passed, ratings)
- **Detailed Feedback**: 3-column feedback cards:
  - Strengths (green)
  - Areas for Improvement (yellow)
  - Recommendations (blue)
- **Evaluation Summary**: Stats card with completion date, duration, sections, and status
- **CTA Buttons**: Download Report and Back to Dashboard

**Status Handling:**

- PASS status: Green themed with checkmark
- FAIL status: Red themed with X mark
- Shows "Passed" or "Failed" status for each section
- Conditional feedback display based on overall result

## Reusable Components

### 1. QuestionCard

**Location**: `/components/question-card.tsx`

A card component for displaying MCQ questions with radio button options.

**Props:**

```typescript
interface QuestionCardProps {
  questionNumber: number; // Current question number (1, 2, 3...)
  totalQuestions: number; // Total questions in section
  question: string; // Question text
  description?: string; // Optional description/help text
  options: Option[]; // Array of options
  selectedValue?: string; // Currently selected option value
  onSelectOption?: (value: string) => void; // Selection callback
}
```

**Features:**

- Question counter display
- Optional description text
- Radio button group with labels
- Hover states for better UX
- Full accessibility support

### 2. CodingEditor

**Location**: `/components/coding-editor.tsx`

A styled code editor component for coding challenges.

**Props:**

```typescript
interface CodingEditorProps {
  title: string; // Editor title
  description?: string; // Optional description
  placeholder?: string; // Textarea placeholder
  language?: string; // Code language (javascript, python, java, cpp)
  value?: string; // Current code value
  onChange?: (value: string) => void; // Change callback
  readOnly?: boolean; // Whether editor is read-only
}
```

**Features:**

- Language indicator display
- Monospace font for code
- Minimum height of 256px (h-64)
- Language-specific styling
- Syntax highlighting ready (currently basic textarea)

### 3. ChatInterface

**Location**: `/components/chat-interface.tsx`

A chat/interview UI component for conversational evaluations.

**Props:**

```typescript
interface ChatInterfaceProps {
  title: string; // Chat title
  description?: string; // Optional description
  messages: Message[]; // Array of messages
  currentInput?: string; // Current input value
  onSendMessage?: (message: string) => void; // Send callback
  isLoading?: boolean; // Loading state
}
```

**Message Structure:**

```typescript
interface Message {
  id: string; // Unique message ID
  type: "question" | "answer"; // Message type
  content: string; // Message content
  timestamp: Date; // Message timestamp
}
```

**Features:**

- Scroll area with auto-scroll to latest message
- Animated message entry
- Send button with disabled state
- Voice answer button (placeholder)
- Timestamp display for each message
- Distinguishes between question and answer messages

## UI/UX Design

### Color System

- **Primary**: Used for active sections, pass status, and primary buttons
- **Destructive**: Used for timer and fail status
- **Green**: Success indicators and passed sections
- **Red**: Fail indicators
- **Yellow/Warning**: Areas for improvement feedback

### Typography

- **Headers**: Semibold, varying sizes for hierarchy
- **Body**: Regular weight for content
- **Code**: Monospace font for code editor
- **Time**: Monospace for timer display

### Layout

- **Evaluation Page**:
  - Sticky header with timer
  - Center-aligned main content (max 4xl)
  - Section cards at bottom
  - Responsive grid layouts
- **Results Page**:
  - Center-aligned header with icon
  - Card-based design for sections
  - 3-column grid for breakdowns
  - Feedback cards with icons
  - CTA buttons at bottom

### Responsive Design

- Mobile-first approach
- Grid layouts adapt from 1 to 3 columns
- Touch-friendly button sizes
- Scrollable content areas

## Mock Data Structure

### Evaluation Data

```typescript
{
  title: string
  totalTime: number (seconds)
  sections: {
    mcq: { label, duration, questions[] }
    coding: { label, duration, challenge, template }
    interview: { label, duration, initialQuestion }
  }
}
```

### Result Data

```typescript
{
  evaluationTitle: string
  totalScore: number
  maxScore: number
  status: 'pass' | 'fail'
  completedAt: Date
  sections: Array<{
    name: string
    score: number
    maxScore: number
    status: 'pass' | 'fail'
    details: {...section-specific-data}
  }>
}
```

## State Management

### Evaluation Page

- `currentSection`: Current evaluation section
- `timeRemaining`: Countdown timer state
- `sectionAnswers`: Object storing answers by section
- `codingAnswer`: Current code editor content
- `chatMessages`: Array of chat messages

### Results Page

- No interactive state (purely presentational)
- Uses mock data for demonstration

## Integration Points

### Ready for Backend Integration

1. **Answer Storage**: `sectionAnswers`, `codingAnswer`, `chatMessages` can be sent to backend
2. **Timer Submission**: Timer callback when time expires
3. **Section Submission**: Submit button triggers evaluation section submission
4. **Chat Messages**: Message sending can call API instead of mock
5. **Results Fetching**: Results page can fetch real data from backend

### Example Integration

```typescript
// Mock handler -> Real API call
onSendMessage={(message) => {
  // Instead of mock response, call:
  // await api.sendChatMessage(evaluationId, message)
}}
```

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels and roles on custom components
- Keyboard navigation support
- Color contrast compliance
- Focus indicators on interactive elements
- Screen reader friendly text

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)
- Responsive down to 320px width

## Future Enhancements

1. **Code Highlighting**: Add syntax highlighting library (Prism, Highlight.js)
2. **AI Responses**: Integrate actual AI chat API
3. **Code Execution**: Add code playground for coding challenges
4. **Real-time Validation**: Live code testing and validation
5. **Voice Recording**: Audio recording for voice answers
6. **PDF Report**: Generate PDF report from results
7. **Submission Analytics**: Track submission patterns and timing
8. **Comparison Charts**: Show score trends over multiple evaluations

## Files Reference

- `/app/evaluation/page.tsx` - Main evaluation page
- `/app/evaluation-result/page.tsx` - Results page
- `/components/question-card.tsx` - MCQ question component
- `/components/coding-editor.tsx` - Code editor component
- `/components/chat-interface.tsx` - Chat interface component
- `/components/app-layout.tsx` - Wrapper layout with sidebar

</content>
