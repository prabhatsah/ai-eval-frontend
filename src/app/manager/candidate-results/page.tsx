'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Search, Eye } from 'lucide-react'

interface CandidateResult {
  id: string
  employeeName: string
  evaluation: string
  skill: string
  score: number
  status: 'PASS' | 'FAIL' | 'PENDING'
  completedDate: string
}

export default function CandidateResultsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PASS' | 'FAIL' | 'PENDING'>('ALL')

  const results: CandidateResult[] = [
    {
      id: '1',
      employeeName: 'John Doe',
      evaluation: 'Senior Frontend Developer Assessment',
      skill: 'Frontend Development',
      score: 85,
      status: 'PASS',
      completedDate: '2024-04-20',
    },
    {
      id: '2',
      employeeName: 'Sarah Smith',
      evaluation: 'Python Developer Evaluation',
      skill: 'Python',
      score: 62,
      status: 'PASS',
      completedDate: '2024-04-18',
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      evaluation: 'Full Stack Engineering Challenge',
      skill: 'Full Stack',
      score: 45,
      status: 'FAIL',
      completedDate: '2024-04-15',
    },
    {
      id: '4',
      employeeName: 'Emma Wilson',
      evaluation: 'Data Science Evaluation',
      skill: 'Data Science',
      score: 92,
      status: 'PASS',
      completedDate: '2024-04-10',
    },
    {
      id: '5',
      employeeName: 'Alex Brown',
      evaluation: 'Backend Developer Assessment',
      skill: 'Backend Development',
      score: 78,
      status: 'PASS',
      completedDate: '2024-04-08',
    },
    {
      id: '6',
      employeeName: 'Lisa Anderson',
      evaluation: 'Senior Frontend Developer Assessment',
      skill: 'Frontend Development',
      score: 55,
      status: 'FAIL',
      completedDate: '2024-04-05',
    },
    {
      id: '7',
      employeeName: 'Tom Davis',
      evaluation: 'Python Developer Evaluation',
      skill: 'Python',
      score: null,
      status: 'PENDING',
      completedDate: '',
    },
    {
      id: '8',
      employeeName: 'Rachel Green',
      evaluation: 'Full Stack Engineering Challenge',
      skill: 'Full Stack',
      score: 88,
      status: 'PASS',
      completedDate: '2024-04-02',
    },
  ]

  const filteredResults = results.filter(result => {
    const matchesSearch =
      result.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.evaluation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || result.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: results.length,
    passed: results.filter(r => r.status === 'PASS').length,
    failed: results.filter(r => r.status === 'FAIL').length,
    pending: results.filter(r => r.status === 'PENDING').length,
  }

  const getStatusBadge = (status: 'PASS' | 'FAIL' | 'PENDING') => {
    switch (status) {
      case 'PASS':
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Passed
          </span>
        )
      case 'FAIL':
        return (
          <span className="inline-flex items-center rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400">
            Failed
          </span>
        )
      case 'PENDING':
        return (
          <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
            Pending
          </span>
        )
    }
  }

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Candidate Results</h1>
        <p className="text-muted-foreground">Review and manage evaluation results from all candidates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Results</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-emerald-500/5">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-emerald-700 dark:text-emerald-400">Passed</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{stats.passed}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-red-500/5">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-red-700 dark:text-red-400">Failed</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">{stats.failed}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-amber-700 dark:text-amber-400">Pending</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="pt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by employee name or evaluation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border/50"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['ALL', 'PASS', 'FAIL', 'PENDING'] as const).map(status => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="border-border/50"
              >
                {status === 'ALL' ? 'All Results' : status === 'PENDING' ? 'Pending' : status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Results ({filteredResults.length})</CardTitle>
          <CardDescription>
            Showing {filteredResults.length} of {results.length} results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Evaluation</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Completed Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <TableRow key={result.id} className="border-border/30 hover:bg-muted/30">
                      <TableCell className="font-medium">{result.employeeName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{result.evaluation}</TableCell>
                      <TableCell className="text-center">
                        {result.score !== null ? (
                          <span className="font-semibold">{result.score}%</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(result.status)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {result.completedDate
                          ? new Date(result.completedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/manager/evaluation-detail/${result.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 hover:bg-muted"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-border/30">
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No results found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
