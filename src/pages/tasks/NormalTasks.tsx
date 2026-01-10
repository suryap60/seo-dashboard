import { useState } from "react";
import { Plus, Search, FolderOpen } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TaskTable } from "./TaskTable";
import { TaskModal } from "./TaskModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialNormalTasks, taskGroups } from "@/data/normalTasks";
import type { NormalTask } from "@/types/task";

export default function NormalTasks() {
  const [tasks, setTasks] = useState<NormalTask[]>(initialNormalTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [groupFilter, setGroupFilter] = useState<string>("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesGroup = groupFilter === "all" || task.group === groupFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesGroup;
  });

  const handleAddTask = (newTask: Omit<NormalTask, "id">) => {
    const task: NormalTask = {
      ...newTask,
      id: `nt-${Date.now()}`,
    };
    setTasks([task, ...tasks]);
    setIsModalOpen(false);
  };

  return (
    <PageWrapper
      title="Normal Tasks"
      description="Organize tasks into groups and manage your workflow"
      actions={
        <>
          <Button variant="outline">
            <FolderOpen className="mr-2 h-4 w-4" />
            New Group
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </>
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
        <Input placeholder="Assignee" className="w-[140px]" />
      </div>

      {/* Group Filter */}
      <div className="mb-4">
        <Select value={groupFilter} onValueChange={setGroupFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {taskGroups.map((group) => (
              <SelectItem key={group.id} value={group.name}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <TaskTable tasks={filteredTasks} />

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        groups={taskGroups}
      />
    </PageWrapper>
  );
}
