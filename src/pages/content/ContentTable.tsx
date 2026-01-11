import type { ContentTask } from "@/types/task";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
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
import { Button } from "@/components/ui/button";
import { Calendar, User, FileText, Eye, MoreVertical, Edit, Trash2, ChevronDown } from "lucide-react";

interface ContentTableProps {
  tasks: ContentTask[];
  onViewTask: (task: ContentTask) => void;
  onEditTask?: (task: ContentTask) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateField?: (taskId: string, field: keyof ContentTask, value: string) => void;
}

export function ContentTable({ tasks, onViewTask, onEditTask, onDeleteTask, onUpdateField }: ContentTableProps) {
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
    { value: "draft", label: "Draft" },
    { value: "in_review", label: "In Review" },
    { value: "published", label: "Published" },
  ];

  const getSubtaskProgress = (task: ContentTask) => {
    if (task.subtasks.length === 0) return "-";
    const completed = task.subtasks.filter((s) => s.completed).length;
    return `${completed}/${task.subtasks.length}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground w-[220px]">Title</TableHead>
            <TableHead className="text-muted-foreground w-[120px]">Assignee</TableHead>
            <TableHead className="text-muted-foreground w-[110px]">Due Date</TableHead>
            <TableHead className="text-muted-foreground w-[100px]">Word Count</TableHead>
            <TableHead className="text-muted-foreground w-[100px]">Priority</TableHead>
            <TableHead className="text-muted-foreground w-[120px]">Status</TableHead>
            <TableHead className="text-muted-foreground w-[80px]">Subtasks</TableHead>
            <TableHead className="text-muted-foreground w-[150px]">Tags</TableHead>
            <TableHead className="text-muted-foreground w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-border">
              <TableCell className="font-medium text-foreground w-[220px] align-top">
                <div className="w-full">
                  <EditableCell
                    value={task.title}
                    onSave={(value) => onUpdateField?.(task.id, "title", value)}
                    placeholder="Content title"
                    className="w-full"
                  />
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
              <TableCell className="text-muted-foreground w-[100px] align-top">
                <div className="w-full">
                  <EditableCell
                    value={task.wordCount.toString()}
                    onSave={(value) => onUpdateField?.(task.id, "wordCount", value)}
                    placeholder="Word count"
                    className="w-full"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{task.wordCount.toLocaleString()}</span>
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
              <TableCell className="text-muted-foreground w-[80px] text-center align-top">
                <div className="w-full">
                  {getSubtaskProgress(task)}
                </div>
              </TableCell>
              <TableCell className="w-[150px] align-top">
                <div className="w-full">
                  <div className="flex flex-wrap gap-1">
                    {task.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground truncate"
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
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewTask(task)}
                    className="text-primary hover:text-primary"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
