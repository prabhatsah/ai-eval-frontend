import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ResultsPage() {
  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="border-b border-border p-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Results</h2>
            <p className="text-muted-foreground mt-2">
              View and analyze evaluation results
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Filter Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Results', value: '324', color: 'bg-blue-500/10' },
                { label: 'Average Score', value: '8.5/10', color: 'bg-green-500/10' },
                { label: 'Success Rate', value: '92%', color: 'bg-purple-500/10' },
                { label: 'This Month', value: '48', color: 'bg-orange-500/10' },
              ].map((stat) => (
                <Card key={stat.label} className={`${stat.color} border-border/50`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Results Table */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Evaluation Results</CardTitle>
                <CardDescription>
                  Detailed breakdown of all evaluation results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 'RES-001', evaluation: 'Q1 Performance', score: '9.2', status: 'Excellent' },
                    { id: 'RES-002', evaluation: 'Team Assessment', score: '8.1', status: 'Good' },
                    { id: 'RES-003', evaluation: 'Annual Review', score: '7.8', status: 'Good' },
                    { id: 'RES-004', evaluation: 'Project Delivery', score: '8.9', status: 'Excellent' },
                    { id: 'RES-005', evaluation: 'Communication', score: '7.5', status: 'Good' },
                  ].map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="font-mono text-xs text-muted-foreground">{result.id}</div>
                          <p className="font-medium">{result.evaluation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">{result.score}</p>
                          <p className="text-xs text-muted-foreground">/10</p>
                        </div>
                        <Badge variant={result.status === 'Excellent' ? 'default' : 'secondary'}>
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Distribution Chart Placeholder */}
            <Card className="mt-6 bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>
                  Distribution of evaluation scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Chart placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
