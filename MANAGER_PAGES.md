# Manager Pages Documentation

This document outlines all the manager-specific pages created for the SaaS evaluation platform.

## Pages Overview

### 1. Manager Dashboard (`/manager-dashboard`)

**Purpose:** Provides an overview of team evaluation performance and quick access to manager functions.

**Features:**
- **Statistics Cards** (4 cards showing):
  - Total Employees: 24 active team members
  - Evaluations Created: 12 total assessments
  - Pending Reviews: 8 awaiting evaluation
  - Average Score: 78% overall performance
  - Each card includes trend indicators (up/down with percentage)

- **Quick Actions Panel**:
  - Create Evaluation button
  - View Evaluations button
  - View Results button

- **Recent Activity Section**:
  - Lists latest evaluation completions
  - Shows employee name, action, time, and status badge
  - Color-coded status (Passed - green, In Progress - yellow, Failed - red)

**Layout:** Responsive grid with sidebar integration

---

### 2. Create Evaluation Form (`/manager/create-evaluation`)

**Purpose:** Allows managers to set up new evaluations with customizable parameters.

**Form Sections:**

1. **Basic Information**
   - Evaluation Title (text input)
   - Skill Selection (radio buttons with 7 options):
     - Frontend Development
     - Backend Development
     - Full Stack
     - Python
     - Data Science
     - DevOps
     - Cloud Architecture

2. **Evaluation Structure**
   - Number of MCQ Questions (1-50, default: 5)
   - Include Coding Challenge (checkbox)
   - Number of AI Interview Questions (1-20, default: 3)

3. **Passing Criteria**
   - Overall Passing Percentage (0-100%, default: 60%)
   - Section-wise Cutoff Scores:
     - MCQ Cutoff: 50%
     - Coding Cutoff: 50% (shown only if coding enabled)
     - AI Interview Cutoff: 50%

**Features:**
- Form validation on submit
- Loading state during submission
- Cancel and Create buttons with proper styling
- Back navigation button at top

---

### 3. Evaluations List (`/manager/evaluations`)

**Purpose:** Browse and manage all evaluations created by the manager.

**Features:**

1. **Header with Quick Action**
   - Title and description
   - "Create Evaluation" button for quick access

2. **Search Functionality**
   - Search by title or skill name
   - Real-time filtering

3. **Evaluations Table**
   - **Columns:**
     - Title (main evaluation name)
     - Skill (badge display)
     - Created Date (formatted: MMM DD, YYYY)
     - Progress (visual progress bar with completed/assigned ratio)
     - Actions (View, Edit, Delete buttons)

4. **Status Indicators**
   - Shows number of evaluations displayed vs total
   - Empty state when no matches found

**Features:**
- Responsive table with horizontal scrolling
- Hover effects on rows
- Delete with confirmation dialog
- Skill badges with primary color background

---

### 4. Candidate Results (`/manager/candidate-results`)

**Purpose:** Review and track evaluation results from all candidates.

**Features:**

1. **Statistics Dashboard** (4 cards):
   - Total Results: 8
   - Passed: 5 (green background)
   - Failed: 2 (red background)
   - Pending: 1 (amber background)

2. **Filtering & Search**
   - Search by employee name or evaluation
   - Filter buttons: All Results, PASS, FAIL, Pending
   - Dynamic result count

3. **Results Table**
   - **Columns:**
     - Employee Name
     - Evaluation (title)
     - Score (percentage or dash for pending)
     - Status (color-coded badges)
     - Completed Date (formatted or dash)
     - Action: "View Details" button

4. **Status Badges**
   - Passed (green)
   - Failed (red)
   - Pending (amber)

**Features:**
- Empty state message when no results match filters
- Real-time filtering across all dimensions
- Responsive table layout

---

### 5. Evaluation Detail Page (`/manager/evaluation-detail/[id]`)

**Purpose:** Review complete evaluation details with scores, answers, and approval workflow.

**Layout:**

1. **Header Section**
   - Back button to results page
   - Page title "Evaluation Details"
   - Candidate name and evaluation title

2. **Summary Card**
   - Employee name
   - Skill badge
   - Score (large display: 85%)
   - Status badge (PASS/FAIL)
   - Duration (45 minutes)
   - Completed date

3. **Tabbed Interface** (3 tabs):

   **Tab 1: Answers**
   - **Multiple Choice Questions**
     - Shows each question with user answer vs correct answer
     - Green checkmark for correct, red X for incorrect
     - Question counter showing answered/total
   
   - **Coding Challenge**
     - Problem statement
     - User's code in styled code block
     - Score with feedback
     - Visual success/fail indicator

   **Tab 2: Scores & Feedback**
   - **Score Cards** (3 cards showing):
     - MCQ Score: 100% (3/3 correct)
     - Coding Score: 95% (1/1 problem solved)
     - AI Interview Score: 80% (strong performance)
   
   - **Detailed Feedback Section**:
     - Strengths (green card with checkmark)
     - Areas for Improvement (yellow card with alert icon)

   **Tab 3: AI Interview Feedback**
   - **Individual Metrics** (4 cards):
     - Communication Skills: 8/10 with progress bar
     - Technical Knowledge: 8.5/10 with progress bar
     - Problem Solving: 7.5/10 with progress bar
     - Feedback text for each metric
   
   - **Overall Assessment**:
     - Overall Score: 8/10
     - Overall progress bar
     - Comprehensive feedback

4. **Review Actions Section**
   - Approve Result button (green)
   - Reject Result button (red)
   - Shows success/rejection message after action
   - Loading state during processing

**Features:**
- Tabbed interface for organized information
- Color-coded feedback cards
- Progress bars for visual score representation
- Interactive approval workflow with confirmation states
- Mock 1-second delay on approval/rejection for realistic UX

---

## Design Specifications

**Color Scheme:**
- Primary: Used for action buttons and active states
- Status colors:
  - Success/Passed: Emerald green (#10b981)
  - Warning/In Progress: Amber (#f59e0b)
  - Danger/Failed: Red (#ef4444)
- Neutral: Gray tones for text and borders

**Typography:**
- Headings: Bold, larger font weights
- Body text: Regular, medium font weight
- Labels: Small, medium-to-semibold weight

**Components Used:**
- Card: For sections and data display
- Table: For list views
- Tabs: For multi-section organization
- Badge: For status and skill tags
- Button: For actions
- Input: For search and form fields
- Progress Bar: For visual score representation

---

## Navigation

All manager pages are accessible from the sidebar under "Manager Dashboard" menu item. Quick navigation is available through action buttons on each page.

**Sidebar Navigation:**
- Manager Dashboard → Overview
- Create Evaluation → New assessment form
- My Evaluations → View evaluations list
- View Results → Candidate results table

---

## Mock Data

All pages use realistic mock data including:
- Real employee names
- Various evaluation titles and skills
- Score distributions (pass/fail)
- Realistic dates and durations
- Detailed Q&A content
- AI feedback metrics

Data structure is designed to be easily replaceable with real API responses.
