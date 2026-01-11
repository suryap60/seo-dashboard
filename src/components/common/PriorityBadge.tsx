import { cn } from "@/lib/utils";
import type { Priority } from "@/types/common";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: {
    label: "low",
    className: "bg-green-100 text-green-700 border border-green-200",
  },
  medium: {
    label: "medium",
    className: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  },
  high: {
    label: "high",
    className: "bg-red-100 text-red-700 border border-red-200",
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

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
