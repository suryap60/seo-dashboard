import type { Priority, TaskStatus, ContentStatus, Tag, Subtask } from "./common";

export interface BacklinkTask {
  id: string;
  title: string;
  url: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  subtasks: Subtask[];
  tags: Tag[];
}

export interface ContentTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  wordCount: number;
  priority: Priority;
  status: ContentStatus;
  subtasks: Subtask[];
  tags: Tag[];
  content?: string;
  targetKeyword?: string;
  slug?: string;
}

export interface NormalTask {
  id: string;
  title: string;
  description: string;
  group: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
}

export interface TaskGroup {
  id: string;
  name: string;
  color: string;
}
