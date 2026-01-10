import type { NormalTask } from "@/types/task";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { GroupBadge } from "@/components/common/GroupBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, User, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskTableProps {
  tasks: NormalTask[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  };

  return (
    <div className="bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground min-w-[200px]">Task</TableHead>
            <TableHead className="text-muted-foreground min-w-[220px]">Description</TableHead>
            <TableHead className="text-muted-foreground">Group</TableHead>
            <TableHead className="text-muted-foreground">Assignee</TableHead>
            <TableHead className="text-muted-foreground">Due Date</TableHead>
            <TableHead className="text-muted-foreground">Priority</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-border">
              <TableCell className="font-medium text-foreground">
                {task.title}
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[220px] truncate">
                {task.description}
              </TableCell>
              <TableCell>
                <GroupBadge group={task.group} />
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
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
