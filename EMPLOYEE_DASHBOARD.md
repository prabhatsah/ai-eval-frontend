# Employee Dashboard

## Overview
The Employee Dashboard page displays assigned evaluations for employees. It provides a clear overview of evaluation statuses, progress tracking, and action buttons to start or continue evaluations.

## Features

### Statistics Overview
Three cards at the top show quick stats:
- **Passed**: Number of completed evaluations
- **In Progress**: Number of evaluations currently being worked on
- **Pending**: Number of evaluations not yet started

### Evaluation Cards
Evaluations are displayed in a responsive grid (2 columns on larger screens, 1 on mobile).

Each card shows:
- **Title & Description**: Clear evaluation name and purpose
- **Status Badge**: Color-coded status indicator
  - Not Started (gray)
  - In Progress (blue)
  - Completed (purple)
  - Passed (green)
  - Failed (red)
- **Due Date**: Calendar icon with formatted date
- **Progress Bar**: Visual indicator of completion percentage
- **Action Button**: Context-aware button based on status
  - "Start Evaluation" - Not started evaluations
  - "Continue Evaluation" - In progress evaluations
  - "View Results" - Completed/Passed evaluations
  - "Retry Required" - Failed evaluations (disabled)

### Empty State
If no evaluations are assigned, a friendly empty state is displayed with a checkmark icon and helpful message.

## Components

### EvaluationStatusBadge
Reusable component that renders status badges with appropriate colors and labels.

**Props:**
- `status`: 'not-started' | 'in-progress' | 'completed' | 'passed' | 'failed'

**File:** `/components/evaluation-status-badge.tsx`

### Employee Dashboard Page
Main page component that displays the evaluation list and statistics.

**File:** `/app/employee-dashboard/page.tsx`

## Mock Data Structure

```typescript
interface Evaluation {
  id: string
  title: string
  description: string
  status: 'not-started' | 'in-progress' | 'completed' | 'passed' | 'failed'
  dueDate: string
  progress?: number
}
```

## Styling

The page uses:
- Tailwind CSS for responsive design
- OKLCH color tokens for dark theme
- Gradient progress bars (blue to cyan)
- Card-based layout with hover effects
- Icons from lucide-react

## Navigation

The page is accessible from the sidebar under "My Evaluations" or directly via `/employee-dashboard` route.

## Future Enhancements

- Connect to real backend API for fetching evaluations
- Add filtering/sorting by status or due date
- Implement real form submission handlers
- Add evaluation detail modal/page
- Implement real progress tracking
- Add deadline notifications
- Export evaluation reports
