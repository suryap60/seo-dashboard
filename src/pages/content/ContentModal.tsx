import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ContentTask } from "@/types/task";
import type { Priority } from "@/types/common";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<ContentTask, "id">) => void;
  onUpdate?: (id: string, task: Omit<ContentTask, "id">) => void;
  editTask?: ContentTask | null;
}

export function ContentModal({ isOpen, onClose, onSubmit, onUpdate, editTask }: ContentModalProps) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [wordCount, setWordCount] = useState(1000);
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<"draft" | "in_review" | "published">("draft");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);

  // Populate form when editing
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setAssignee(editTask.assignee);
      setDueDate(editTask.dueDate);
      setWordCount(editTask.wordCount);
      setPriority(editTask.priority);
      setStatus(editTask.status);
      setTags(editTask.tags);
      setSubtasks(editTask.subtasks);
    } else {
      // Reset form for new task
      setTitle("");
      setAssignee("");
      setDueDate("");
      setWordCount(1000);
      setPriority("medium");
      setStatus("draft");
      setTags([]);
      setSubtasks([]);
    }
  }, [editTask]);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, { id: `tag-${Date.now()}`, name: tagInput.trim() }]);
      setTagInput("");
    }
  };

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, { id: `sub-${Date.now()}`, title: subtaskInput.trim(), completed: false }]);
      setSubtaskInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !assignee.trim() || !dueDate) return;

    const taskData = {
      title,
      assignee,
      dueDate,
      wordCount,
      priority,
      status,
      tags,
      subtasks,
    };

    if (editTask && onUpdate) {
      onUpdate(editTask.id, taskData);
    } else {
      onSubmit(taskData);
    }

    // Reset form
    setTitle("");
    setAssignee("");
    setDueDate("");
    setWordCount(1000);
    setPriority("medium");
    setStatus("draft");
    setTags([]);
    setSubtasks([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editTask ? "Edit Content Task" : "New Content Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Content Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Write blog post about SEO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-primary focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee *</Label>
              <Input
                id="assignee"
                placeholder="John Doe"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wordCount">Word Count</Label>
            <Input
              id="wordCount"
              type="number"
              placeholder="1000"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "in_review" | "published")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1 text-xs"
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((t) => t.id !== tag.id))}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Subtasks</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a subtask"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSubtask())}
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddSubtask}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {subtasks.length > 0 && (
              <div className="space-y-2 mt-2">
                {subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center justify-between rounded bg-muted px-3 py-2 text-sm"
                  >
                    {subtask.title}
                    <button
                      type="button"
                      onClick={() => setSubtasks(subtasks.filter((s) => s.id !== subtask.id))}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editTask ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}