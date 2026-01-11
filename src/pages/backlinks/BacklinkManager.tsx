import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BacklinkTable } from "./BacklinkTable";
import { BacklinkModal } from "./BacklinkModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialBacklinkTasks } from "@/data/backlinks";
import type { BacklinkTask } from "@/common/task";

export default function BacklinkManager() {
  const [tasks, setTasks] = useState<BacklinkTask[]>(initialBacklinkTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<BacklinkTask | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === "" || task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const handleAddTask = (newTask: Omit<BacklinkTask, "id">) => {
    const task: BacklinkTask = {
      ...newTask,
      id: `bl-${Date.now()}`,
    };
    setTasks([task, ...tasks]);
    setIsModalOpen(false);
    toast.success("Backlink task created successfully!");
  };

  const handleEditTask = (task: BacklinkTask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = (id: string, updatedTask: Omit<BacklinkTask, "id">) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...updatedTask, id } : task
    ));
    setIsModalOpen(false);
    setEditingTask(null);
    toast.success("Backlink task updated successfully!");
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Backlink task deleted successfully!");
  };

  const handleUpdateField = (taskId: string, field: keyof BacklinkTask, value: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, [field]: value } : task
    ));
    toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <PageWrapper
      title="Backlink Manager"
      description="Manage your backlink outreach and maintenance tasks"
      actions={
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Backlink Task
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
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
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
      <BacklinkTable 
        tasks={filteredTasks} 
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onUpdateField={handleUpdateField}
      />

      {/* Modal */}
      <BacklinkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
      />
    </PageWrapper>
  );
}
