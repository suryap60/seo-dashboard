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
    className: "border-status-todo text-status-todo",
  },
  in_progress: {
    label: "in progress",
    className: "border-status-in-progress text-status-in-progress",
  },
  completed: {
    label: "completed",
    className: "border-status-completed text-status-completed",
  },
  draft: {
    label: "draft",
    className: "border-status-draft text-status-draft",
  },
  in_review: {
    label: "in review",
    className: "border-status-in-review text-status-in-review",
  },
  published: {
    label: "published",
    className: "border-status-published text-status-published",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
