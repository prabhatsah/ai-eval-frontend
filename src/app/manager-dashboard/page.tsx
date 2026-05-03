'use client'

import { BarChart3, Users, FileText, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface StatCard {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function ManagerDashboard() {
  const stats: StatCard[] = [
    {
      title: 'Total Employees',
      value: 24,
      description: 'Active team members',
      icon: <Users className="w-6 h-6" />,
      trend: { value: 2, isPositive: true },
    },
    {
      title: 'Evaluations Created',
      value: 12,
      description: 'Total assessments',
      icon: <FileText className="w-6 h-6" />,
      trend: { value: 4, isPositive: true },
    },
    {
      title: 'Pending Reviews',
      value: 8,
      description: 'Awaiting evaluation',
      icon: <Clock className="w-6 h-6" />,
      trend: { value: 1, isPositive: false },
    },
    {
      title: 'Avg. Score',
      value: '78%',
      description: 'Overall performance',
      icon: <BarChart3 className="w-6 h-6" />,
      trend: { value: 5, isPositive: true },
    },
  ]

  const recentActivity = [
    { name: 'John Doe', action: 'Completed Frontend Evaluation', time: '2 hours ago', status: 'Passed' },
    { name: 'Sarah Smith', action: 'Started Python Assessment', time: '4 hours ago', status: 'In Progress' },
    { name: 'Mike Johnson', action: 'Completed Backend Evaluation', time: '1 day ago', status: 'Failed' },
    { name: 'Emma Wilson', action: 'Completed Full Stack Evaluation', time: '2 days ago', status: 'Passed' },
  ]

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your team&apos;s evaluation performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="text-muted-foreground opacity-60">{stat.icon}</div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              {stat.trend && (
                <div className={`text-xs font-medium flex items-center gap-1 ${stat.trend.isPositive ? 'text-emerald-500' : 'text-amber-500'}`}>
                  <span>{stat.trend.isPositive ? '↑' : '↓'}</span>
                  <span>{Math.abs(stat.trend.value)}% from last month</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/manager/create-evaluation" className="block">
              <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                <FileText className="w-4 h-4 mr-2" />
                Create Evaluation
              </Button>
            </Link>
            <Link href="/manager/evaluations" className="block">
              <Button variant="outline" className="w-full justify-start border-border/50">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Evaluations
              </Button>
            </Link>
            <Link href="/manager/candidate-results" className="block">
              <Button variant="outline" className="w-full justify-start border-border/50">
                <Users className="w-4 h-4 mr-2" />
                View Results
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest evaluation completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start justify-between border-b border-border/30 pb-4 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      activity.status === 'Passed'
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                        : activity.status === 'Failed'
                        ? 'bg-red-500/20 text-red-700 dark:text-red-400'
                        : 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
