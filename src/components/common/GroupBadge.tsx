import { cn } from "@/lib/utils";

interface GroupBadgeProps {
  group: string;
  className?: string;
}

const groupColors: Record<string, string> = {
  "Technical SEO": "border-info text-info",
  "Content Strategy": "border-success text-success",
  "Analytics & Reporting": "border-warning text-warning",
};

export function GroupBadge({ group, className }: GroupBadgeProps) {
  const colorClass = groupColors[group] || "border-muted-foreground text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium truncate max-w-[140px]",
        colorClass,
        className
      )}
    >
      {group}
    </span>
  );
}
