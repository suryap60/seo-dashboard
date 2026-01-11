import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ContentTable } from "./ContentTable";
import { ContentViewer } from "./ContentViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialContentTasks } from "@/data/contentTasks";
import type { ContentTask } from "@/types/task";

export default function ContentTasks() {
  const [tasks, setTasks] = useState<ContentTask[]>(initialContentTasks);
  const [selectedTask, setSelectedTask] = useState<ContentTask | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("");

  const handleEditTask = (task: ContentTask) => {
    // For now, just show a toast - you can implement edit modal later
    toast.info("Edit functionality coming soon!");
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Content task deleted successfully!");
  };

  const handleUpdateField = (taskId: string, field: keyof ContentTask, value: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (field === "wordCount") {
          return { ...task, [field]: parseInt(value) || 0 };
        }
        return { ...task, [field]: value };
      }
      return task;
    }));
    toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === "" || task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  return (
    <PageWrapper
      title="Content Tasks"
      description="Create and manage your content creation tasks"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Content Task
        </Button>
      }
    >
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Input 
          placeholder="Assignee" 
          className="w-[140px]" 
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <ContentTable 
        tasks={filteredTasks} 
        onViewTask={setSelectedTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onUpdateField={handleUpdateField}
      />

      {/* Content Viewer Sheet */}
      <ContentViewer
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </PageWrapper>
  );
}
