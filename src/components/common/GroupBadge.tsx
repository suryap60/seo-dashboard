import { cn } from "@/lib/utils";

interface GroupBadgeProps {
  group: string;
  className?: string;
}

const groupColors: Record<string, string> = {
  "Technical SEO": "bg-blue-100 text-blue-700 border border-blue-200",
  "Content Strategy": "bg-green-100 text-green-700 border border-green-200",
  "Analytics & Reporting": "bg-purple-100 text-purple-700 border border-purple-200",
};

export function GroupBadge({ group, className }: GroupBadgeProps) {
  const colorClass = groupColors[group] || "bg-gray-100 text-gray-700 border border-gray-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium truncate max-w-full",
        colorClass,
        className
      )}
      title={group} // Show full text on hover
    >
      {group}
    </span>
  );
}
