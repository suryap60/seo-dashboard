import type { BacklinkTask } from "@/types/task";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, User } from "lucide-react";

interface BacklinkTableProps {
  tasks: BacklinkTask[];
}

export function BacklinkTable({ tasks }: BacklinkTableProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  };

  const getSubtaskProgress = (task: BacklinkTask) => {
    if (task.subtasks.length === 0) return "-";
    const completed = task.subtasks.filter((s) => s.completed).length;
    return `${completed}/${task.subtasks.length}`;
  };

  return (
    <div className="bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground min-w-[280px]">Task</TableHead>
            <TableHead className="text-muted-foreground min-w-[200px]">URL</TableHead>
            <TableHead className="text-muted-foreground">Assignee</TableHead>
            <TableHead className="text-muted-foreground">Due Date</TableHead>
            <TableHead className="text-muted-foreground">Priority</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Subtasks</TableHead>
            <TableHead className="text-muted-foreground">Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-border">
              <TableCell className="font-medium text-foreground">
                {task.title}
              </TableCell>
              <TableCell>
                <a href={task.url} className="text-link hover:underline" target="_blank" rel="noopener noreferrer">
                  {task.url}
                </a>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {task.assignee}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(task.dueDate)}
                </div>
              </TableCell>
              <TableCell>
                <PriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell>
                <StatusBadge status={task.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {getSubtaskProgress(task)}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {task.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag.name}
                    </span>
                  ))}
                  {task.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{task.tags.length - 2}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
