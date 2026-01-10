import { cn } from "@/lib/utils";
import type { Priority } from "@/types/common";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: {
    label: "low",
    className: "bg-priority-low/20 text-priority-low",
  },
  medium: {
    label: "medium",
    className: "bg-priority-medium/20 text-priority-medium",
  },
  high: {
    label: "high",
    className: "bg-priority-high/20 text-priority-high",
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
