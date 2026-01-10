import { cn } from "@/lib/utils";

type Difficulty = "low" | "medium" | "high";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  low: {
    label: "low",
    className: "border-priority-low text-priority-low",
  },
  medium: {
    label: "medium",
    className: "border-priority-medium text-priority-medium",
  },
  high: {
    label: "high",
    className: "border-priority-high text-priority-high",
  },
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

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
