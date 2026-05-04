"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Edit2, Eye, Trash2, Plus } from "lucide-react";

interface Evaluation {
  id: string;
  title: string;
  skill: string;
  createdDate: string;
  candidatesAssigned: number;
  completedCount: number;
}

export default function EvaluationsListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const evaluations: Evaluation[] = [
    {
      id: "1",
      title: "Senior Frontend Developer Assessment",
      skill: "Frontend Development",
      createdDate: "2024-04-15",
      candidatesAssigned: 5,
      completedCount: 3,
    },
    {
      id: "2",
      title: "Python Developer Evaluation",
      skill: "Python",
      createdDate: "2024-04-10",
      candidatesAssigned: 8,
      completedCount: 6,
    },
    {
      id: "3",
      title: "Full Stack Engineering Challenge",
      skill: "Full Stack",
      createdDate: "2024-04-05",
      candidatesAssigned: 6,
      completedCount: 4,
    },
    {
      id: "4",
      title: "Data Science Evaluation",
      skill: "Data Science",
      createdDate: "2024-03-28",
      candidatesAssigned: 4,
      completedCount: 4,
    },
    {
      id: "5",
      title: "Backend Developer Assessment",
      skill: "Backend Development",
      createdDate: "2024-03-20",
      candidatesAssigned: 7,
      completedCount: 5,
    },
  ];

  const filteredEvaluations = evaluations.filter(
    (evaluation) =>
      evaluation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evaluation.skill.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this evaluation?")) {
      console.log("Deleted evaluation:", id);
      alert("Evaluation deleted successfully!");
    }
  };

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Evaluations</h1>
          <p className="text-muted-foreground">
            {"Manage and view all evaluations you've created"}
          </p>
        </div>
        <Link href="/manager/create-evaluation">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Evaluation
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Evaluations ({filteredEvaluations.length})</CardTitle>
          <CardDescription>
            {filteredEvaluations.length} of {evaluations.length} evaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30">
                  <TableHead>Title</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-center">Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.length > 0 ? (
                  filteredEvaluations.map((evaluation) => (
                    <TableRow
                      key={evaluation.id}
                      className="border-border/30 hover:bg-muted/30"
                    >
                      <TableCell className="font-medium">
                        {evaluation.title}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary/80">
                          {evaluation.skill}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(evaluation.createdDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 justify-center text-sm">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500"
                              style={{
                                width: `${(evaluation.completedCount / evaluation.candidatesAssigned) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {evaluation.completedCount}/
                            {evaluation.candidatesAssigned}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link href={`/manager/evaluation/${evaluation.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 hover:bg-muted"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 hover:bg-muted"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 hover:bg-destructive/10 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(evaluation.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-border/30">
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No evaluations found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
