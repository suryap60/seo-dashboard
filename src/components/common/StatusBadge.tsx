import { cn } from "@/lib/utils";
import type { TaskStatus, ContentStatus } from "@/types/common";

type Status = TaskStatus | ContentStatus;

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  todo: {
    label: "todo",
    className: "bg-gray-100 text-gray-700 border border-gray-200",
  },
  in_progress: {
    label: "in progress",
    className: "bg-red-100 text-red-700 border border-red-200",
  },
  completed: {
    label: "completed",
    className: "bg-green-100 text-green-700 border border-green-200",
  },
  draft: {
    label: "draft",
    className: "bg-gray-100 text-gray-700 border border-gray-200",
  },
  in_review: {
    label: "in review",
    className: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  },
  published: {
    label: "published",
    className: "bg-green-100 text-green-700 border border-green-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
