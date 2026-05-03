'use client'

import * as React from 'react'
import { LayoutDashboard, FileText, BarChart3, Settings, Briefcase, Users } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      label: 'My Evaluations',
      href: '/employee-dashboard',
      icon: Briefcase,
    },
    {
      label: 'Evaluations',
      href: '/evaluations',
      icon: FileText,
    },
    {
      label: 'Results',
      href: '/results',
      icon: BarChart3,
    },
    {
      label: 'Manager Dashboard',
      href: '/manager-dashboard',
      icon: Users,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="border-b border-border">
          <div className="flex items-center justify-between px-2">
            <h1 className="text-lg font-bold">Analytics</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <a href={item.href} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="border-b border-border bg-background sticky top-0 z-40">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-6" />
              <div className="text-sm text-muted-foreground">
                {/* Breadcrumb area can be added here */}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* User menu or additional controls can be added here */}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
