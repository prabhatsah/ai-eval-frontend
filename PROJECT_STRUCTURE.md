# SaaS Analytics Platform - Project Structure

## Overview

A modern SaaS analytics dashboard built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui with dark theme enabled by default.

## Key Features

✅ **Dark Theme by Default** - Dark mode is enabled globally with theme provider support  
✅ **Collapsible Sidebar** - Professional sidebar that collapses to icon view with tooltips  
✅ **Responsive Layout** - Mobile-friendly with adaptive sidebar (sheet drawer on mobile)  
✅ **Navigation** - Clean navigation structure with active state indicators  
✅ **SaaS-Style Design** - Linear/Stripe-inspired clean and minimal design  
✅ **TypeScript** - Full type safety throughout the codebase  
✅ **Tailwind CSS** - Utility-first styling with custom design tokens

## File Structure

```
app/
├── layout.tsx                 # Root layout with ThemeProvider (dark theme enabled)
├── page.tsx                   # Dashboard page
├── evaluations/
│   └── page.tsx              # Evaluations page
├── results/
│   └── page.tsx              # Results page
├── settings/
│   └── page.tsx              # Settings page
└── globals.css               # Global styles with design tokens

components/
├── app-layout.tsx            # Main app layout wrapper with sidebar & navbar
├── theme-provider.tsx        # Next-themes configuration
└── ui/                       # shadcn/ui components
    ├── sidebar.tsx           # Sidebar components (pre-installed)
    ├── card.tsx              # Card components
    ├── button.tsx            # Button components
    └── ... (other UI components)

lib/
├── utils.ts                  # Utility functions (cn for className merging)

styles/
└── globals.css              # Alternative global styles location
```

## Architecture

### Layout Components

**AppLayout** (`components/app-layout.tsx`)

- Wraps all pages with SidebarProvider
- Includes sidebar with navigation menu
- Top navbar with sidebar toggle
- Main content area with scroll support

**Theme System** (`app/layout.tsx`)

- Dark theme enabled by default with `<html className="dark">`
- ThemeProvider configured with next-themes
- Color tokens defined in globals.css (OKLCH color space)

### Pages

1. **Dashboard** (`/`) - Main analytics dashboard with metrics and cards
2. **Evaluations** (`/evaluations`) - Evaluation management interface
3. **Results** (`/results`) - Results visualization and analysis
4. **Settings** (`/settings`) - Account and application settings

## Styling

### Design Tokens

CSS custom properties defined in `globals.css`:

- Colors: primary, secondary, accent, destructive, muted
- Backgrounds: background, card, popover
- Foregrounds: foreground, muted-foreground
- Sidebar: sidebar, sidebar-foreground, sidebar-primary, sidebar-accent
- Borders: border, input, ring
- Radius: --radius (0.625rem)

### Color Mode

- Light mode: White backgrounds with dark text
- Dark mode: Dark backgrounds with light text (default)
- Theme colors adapt based on color scheme preference

## Navigation

### Sidebar Menu Items

```
Analytics (Logo)
├── Dashboard (icon: LayoutDashboard)
├── Evaluations (icon: FileText)
├── Results (icon: BarChart3)
└── Settings (icon: Settings)
```

- Icons from lucide-react
- Active state indicated on current page
- Tooltips shown when sidebar is collapsed
- Responsive: Shows as sheet drawer on mobile

## Development

### Start Dev Server

```bash
pnpm dev
```

### Add New Pages

1. Create directory in `app/` (e.g., `app/new-page/`)
2. Create `page.tsx` inside
3. Wrap content with `<AppLayout>` component
4. Add navigation item to sidebar in `components/app-layout.tsx`

### Customize Theme

Edit the CSS custom properties in `app/globals.css`:

- Modify `--primary`, `--accent`, etc.
- Update light/dark mode colors in `:root` and `.dark` selectors

### Add New Components

Use shadcn/ui components or create custom components in `components/`

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: lucide-react
- **Theme**: next-themes

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Dark mode support based on system preference

## Future Enhancements

- Add charts using recharts (placeholder ready)
- Implement data fetching with SWR
- Add user authentication
- Connect to database for real data
- Add more pages and features
- Implement form validation
- Add notifications/toast messages
