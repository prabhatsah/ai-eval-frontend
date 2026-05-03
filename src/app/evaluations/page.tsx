import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function EvaluationsPage() {
  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Evaluations</h2>
              <p className="text-muted-foreground mt-2">
                Manage and review your evaluations
              </p>
            </div>
            <Button>New Evaluation</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Evaluations', value: '124' },
                { label: 'Completed', value: '87' },
                { label: 'Pending', value: '37' },
              ].map((card) => (
                <Card key={card.label} className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {card.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Evaluations List */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Recent Evaluations</CardTitle>
                <CardDescription>
                  Your latest evaluation records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Q1 Performance Review', date: 'Mar 15, 2024', status: 'Completed' },
                    { name: 'Q1 Team Assessment', date: 'Mar 20, 2024', status: 'In Progress' },
                    { name: 'Annual Evaluation', date: 'Apr 1, 2024', status: 'Pending' },
                  ].map((evaluation) => (
                    <div
                      key={evaluation.name}
                      className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-sm">{evaluation.name}</p>
                        <p className="text-xs text-muted-foreground">{evaluation.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          evaluation.status === 'Completed'
                            ? 'bg-green-500/10 text-green-700'
                            : evaluation.status === 'In Progress'
                            ? 'bg-blue-500/10 text-blue-700'
                            : 'bg-yellow-500/10 text-yellow-700'
                        }`}>
                          {evaluation.status}
                        </span>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
