export type Priority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in_progress" | "completed";
export type ContentStatus = "draft" | "in_review" | "published";

export interface Tag {
  id: string;
  name: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}
