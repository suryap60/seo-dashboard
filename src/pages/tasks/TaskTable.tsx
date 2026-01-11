import type { NormalTask } from "@/types/task";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { GroupBadge } from "@/components/common/GroupBadge";
import { EditableCell } from "@/components/common/EditableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, User, MoreVertical, Edit, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskTableProps {
  tasks: NormalTask[];
  onEditTask?: (task: NormalTask) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateField?: (taskId: string, field: keyof NormalTask, value: string) => void;
}

export function TaskTable({ tasks, onEditTask, onDeleteTask, onUpdateField }: TaskTableProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  };

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const statusOptions = [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const groupOptions = [
    { value: "Technical SEO", label: "Technical SEO" },
    { value: "Content Strategy", label: "Content Strategy" },
    { value: "Analytics & Reporting", label: "Analytics & Reporting" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground w-[200px]">Task</TableHead>
            <TableHead className="text-muted-foreground w-[250px]">Description</TableHead>
            <TableHead className="text-muted-foreground w-[140px]">Group</TableHead>
            <TableHead className="text-muted-foreground w-[120px]">Assignee</TableHead>
            <TableHead className="text-muted-foreground w-[110px]">Due Date</TableHead>
            <TableHead className="text-muted-foreground w-[100px]">Priority</TableHead>
            <TableHead className="text-muted-foreground w-[120px]">Status</TableHead>
            <TableHead className="text-muted-foreground w-[60px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-border">
              <TableCell className="font-medium text-foreground w-[200px] align-top">
                <div className="w-full">
                  <EditableCell
                    value={task.title}
                    onSave={(value) => onUpdateField?.(task.id, "title", value)}
                    placeholder="Task title"
                    className="w-full"
                  />
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground w-[250px] align-top">
                <div className="w-full">
                  <EditableCell
                    value={task.description}
                    onSave={(value) => onUpdateField?.(task.id, "description", value)}
                    type="textarea"
                    placeholder="Task description"
                    className="w-full"
                  />
                </div>
              </TableCell>
              <TableCell className="w-[140px] align-top">
                <div className="w-full">
                  <GroupBadge group={task.group} />
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground w-[120px] align-top">
                <div className="w-full">
                  <EditableCell
                    value={task.assignee}
                    onSave={(value) => onUpdateField?.(task.id, "assignee", value)}
                    placeholder="Assignee name"
                    className="w-full"
                  >
                    <div className="flex items-center gap-2 truncate w-full">
                      <User className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{task.assignee}</span>
                    </div>
                  </EditableCell>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground w-[110px] align-top">
                <div className="w-full">
                  <EditableCell
                    value={task.dueDate}
                    onSave={(value) => onUpdateField?.(task.id, "dueDate", value)}
                    type="date"
                    className="w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{formatDate(task.dueDate)}</span>
                    </div>
                  </EditableCell>
                </div>
              </TableCell>
              <TableCell className="w-[100px] align-top">
                <div className="w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-auto p-1 hover:bg-transparent w-full justify-between">
                        <PriorityBadge priority={task.priority} />
                        <ChevronDown className="h-3 w-3 text-muted-foreground ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {priorityOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => onUpdateField?.(task.id, "priority", option.value)}
                          className={task.priority === option.value ? "bg-accent" : ""}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
              <TableCell className="w-[120px] align-top">
                <div className="w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-auto p-1 hover:bg-transparent w-full justify-between">
                        <StatusBadge status={task.status} />
                        <ChevronDown className="h-3 w-3 text-muted-foreground ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {statusOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => onUpdateField?.(task.id, "status", option.value)}
                          className={task.status === option.value ? "bg-accent" : ""}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditTask?.(task)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDeleteTask?.(task.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
