import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome to your SaaS analytics dashboard
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Users", value: "2,543", change: "+12%" },
              { label: "Revenue", value: "$45,231", change: "+8%" },
              { label: "Active Sessions", value: "341", change: "+5%" },
              { label: "Conversion Rate", value: "3.2%", change: "+2%" },
            ].map((stat) => (
              <Card key={stat.label} className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500/70 mt-2">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Monthly performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  {/* Chart will be added here */}
                  Chart placeholder
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key metrics summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Growth Rate", "User Retention", "Uptime"].map((item) => (
                    <div
                      key={item}
                      className="flex justify-between items-center py-2 border-b border-border/30"
                    >
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                      <span className="font-semibold">98%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-6 bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events from your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "New user registration",
                  "Payment received",
                  "System update completed",
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0"
                  >
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <span className="text-sm">{activity}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      2 hours ago
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
