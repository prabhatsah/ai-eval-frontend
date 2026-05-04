"use client";

import { Badge } from "@/components/ui/badge";

type EvaluationStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "passed"
  | "failed";

interface EvaluationStatusBadgeProps {
  status: EvaluationStatus;
}

const statusConfig: Record<
  EvaluationStatus,
  { label: string; className: string }
> = {
  "not-started": {
    label: "Not Started",
    className: "bg-slate-600 text-slate-50 hover:bg-slate-700",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-blue-600 text-blue-50 hover:bg-blue-700",
  },
  completed: {
    label: "Completed",
    className: "bg-purple-600 text-purple-50 hover:bg-purple-700",
  },
  passed: {
    label: "Passed",
    className: "bg-green-600 text-green-50 hover:bg-green-700",
  },
  failed: {
    label: "Failed",
    className: "bg-red-600 text-red-50 hover:bg-red-700",
  },
};

export function EvaluationStatusBadge({ status }: EvaluationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={`${config.className} capitalize`}>{config.label}</Badge>
  );
}
