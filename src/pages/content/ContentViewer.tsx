import type { ContentTask } from "@/types/task";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, FileText, Link, Target } from "lucide-react";

interface ContentViewerProps {
  task: ContentTask | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContentViewer({ task, isOpen, onClose }: ContentViewerProps) {
  if (!task) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">{task.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <StatusBadge status={task.status} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Priority</p>
              <PriorityBadge priority={task.priority} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Assignee</p>
                <p className="font-medium">{task.assignee}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">{formatDate(task.dueDate)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Word Count</p>
                <p className="font-medium">{task.wordCount.toLocaleString()} words</p>
              </div>
            </div>

            {task.slug && (
              <div className="flex items-center gap-3">
                <Link className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">URL Slug</p>
                  <p className="font-medium text-link">{task.slug}</p>
                </div>
              </div>
            )}

            {task.targetKeyword && (
              <div className="flex items-center gap-3">
                <Target className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Target Keyword</p>
                  <p className="font-medium">{task.targetKeyword}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Tags</p>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Subtasks */}
          {task.subtasks.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Subtasks ({task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length})
              </p>
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className={`flex items-center gap-2 rounded bg-muted px-3 py-2 text-sm ${
                      subtask.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      readOnly
                      className="rounded border-border"
                    />
                    {subtask.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Content */}
          {task.content && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Content Preview</p>
              <div className="rounded-lg bg-muted p-4">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                  {task.content}
                </pre>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
