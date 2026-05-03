# Authentication Pages Setup

## Overview
Two professional authentication pages have been created with form validation and mock handlers. The pages feature a clean dark theme design with centered card layouts.

## Pages Created

### 1. Login Page
**Route:** `/auth/login`

**Features:**
- Email and password input fields with icons
- Email format validation
- Password minimum length validation (6 characters)
- "Forgot password?" link
- "Sign up" link for new users
- Demo credentials display
- Form state management with error display
- Mock login handler with 1-second delay
- Successful login redirects to dashboard (`/`)

**Validation Rules:**
- Email: Required and must be valid format
- Password: Required and minimum 6 characters

### 2. Signup Page
**Route:** `/auth/signup`

**Features:**
- Full name input with validation
- Email input with format validation
- Password input with strength requirements
- Confirm password input with matching validation
- Role selection with two options:
  - **Manager:** Manage team and evaluations
  - **Employee:** Participate in evaluations
- Professional card layout with descriptions
- Form state management with field-level error clearing
- Mock signup handler with 1-second delay
- Successful signup redirects to dashboard (`/`)

**Validation Rules:**
- Full Name: Required, minimum 2 characters
- Email: Required and must be valid format
- Password: Required, minimum 8 characters, must contain uppercase letter and number
- Confirm Password: Must match password field
- Role: Default is "Employee"

## Form Features

### Input Fields
All input fields include:
- Icons (Mail, Lock, User, Briefcase, Users)
- Placeholder text
- Disabled state during submission
- Error styling with red border when invalid
- Auto-clearing validation errors when user starts typing

### Error Handling
- Real-time error clearing as user corrects input
- Red error text below fields
- Comprehensive validation messages
- Submit-level error alerts

### User Experience
- Loading states: "Signing in..." and "Creating account..."
- Disabled form inputs during submission
- Smooth transitions and hover effects
- Mobile-responsive centered layout
- Dark theme with proper contrast

## File Structure

```
app/
├── auth/
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
```

## Styling

Both pages use:
- Tailwind CSS with dark theme (`dark` class)
- Design tokens for colors and spacing
- Gradient background (subtle to background)
- shadcn/ui components:
  - Card, CardContent, CardHeader, CardTitle, CardDescription
  - Button, Input, Label
  - RadioGroup, RadioGroupItem
  - Alert, AlertDescription
- Lucide React icons

## Mock Handlers

Both pages include mock authentication handlers that:
1. Validate form data
2. Simulate a 1-second API call delay
3. Log successful authentication to console
4. Redirect to the dashboard on success

```typescript
// Example mock handler
await new Promise((resolve) => setTimeout(resolve, 1000))
router.push('/')
```

## Demo Credentials

For testing the login page:
- Email: `demo@example.com`
- Password: `password123`

## Next Steps

To implement real authentication:
1. Replace mock handlers with actual API calls
2. Add backend authentication (Supabase, custom auth, etc.)
3. Implement session management
4. Add OAuth providers if needed
5. Add password reset functionality
6. Add email verification

## Component Dependencies

- `@/components/ui/button`
- `@/components/ui/input`
- `@/components/ui/label`
- `@/components/ui/card`
- `@/components/ui/radio-group`
- `@/components/ui/alert`
- `lucide-react` (icons)
- `next/navigation` (useRouter)
