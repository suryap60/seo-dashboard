import { BarChart3, TrendingUp, Link, Award, type LucideIcon} from "lucide-react";
import type { KPIData } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  TrendingUp,
  Link,
  Award,
};

interface KPICardProps {
  data: KPIData;
}

export function KPICard({ data }: KPICardProps) {
  const Icon = iconMap[data.icon] || BarChart3;

  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{data.title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{data.value}</p>
          <p
            className={cn(
              "mt-2 flex items-center gap-1 text-sm",
              data.changeType === "positive" && "text-success",
              data.changeType === "negative" && "text-destructive",
              data.changeType === "neutral" && "text-muted-foreground"
            )}
          >
            {data.changeType === "positive" && "↗"}
            {data.changeType === "negative" && "↘"}
            {data.change}
          </p>
        </div>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
}
