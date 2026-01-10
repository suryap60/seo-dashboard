import type { KeywordPerformance } from "@/types/dashboard";
import { DifficultyBadge } from "@/components/common/DifficultyBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface KeywordTableProps {
  data: KeywordPerformance[];
}

export function KeywordTable({ data }: KeywordTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card animate-fade-in">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">Top Keywords Performance</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Keyword</TableHead>
            <TableHead className="text-muted-foreground">Position</TableHead>
            <TableHead className="text-muted-foreground">Change</TableHead>
            <TableHead className="text-muted-foreground">Traffic</TableHead>
            <TableHead className="text-muted-foreground">Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((keyword) => (
            <TableRow key={keyword.keyword} className="border-border">
              <TableCell className="font-medium text-foreground">
                {keyword.keyword}
              </TableCell>
              <TableCell className="text-muted-foreground">
                #{keyword.position}
              </TableCell>
              <TableCell>
                {keyword.change !== null ? (
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      keyword.change > 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {keyword.change > 0 ? "↗" : "↘"}
                    {keyword.change > 0 ? "+" : ""}
                    {keyword.change}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-foreground">
                {keyword.traffic.toLocaleString()}
              </TableCell>
              <TableCell>
                <DifficultyBadge difficulty={keyword.difficulty} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
