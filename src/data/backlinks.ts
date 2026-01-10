import type { BacklinkTask } from "@/types/task";

export const initialBacklinkTasks: BacklinkTask[] = [
  {
    id: "bl-1",
    title: "Reach out to tech blogs for guest posting",
    url: "https://techblog.example.com",
    assignee: "John Doe",
    dueDate: "2026-01-15",
    priority: "high",
    status: "in_progress",
    subtasks: [
      { id: "s1", title: "Research blogs", completed: true },
      { id: "s2", title: "Draft email", completed: true },
      { id: "s3", title: "Send outreach", completed: false },
    ],
    tags: [
      { id: "t1", name: "outreach" },
      { id: "t2", name: "guest-post" },
    ],
  },
  {
    id: "bl-2",
    title: "Fix broken backlinks from partner sites",
    url: "https://partner.example.com",
    assignee: "Jane Smith",
    dueDate: "2026-01-10",
    priority: "medium",
    status: "todo",
    subtasks: [
      { id: "s3", title: "Identify broken links", completed: false },
      { id: "s4", title: "Contact partners", completed: false },
    ],
    tags: [
      { id: "t3", name: "maintenance" },
      { id: "t4", name: "technical" },
    ],
  },
  {
    id: "bl-3",
    title: "Build relationships with industry influencers",
    url: "https://influencer.example.com",
    assignee: "Mike Chen",
    dueDate: "2026-01-25",
    priority: "low",
    status: "todo",
    subtasks: [],
    tags: [
      { id: "t5", name: "outreach" },
      { id: "t6", name: "relationship" },
    ],
  },
  {
    id: "bl-4",
    title: "Monitor competitor backlink profile",
    url: "https://competitor.example.com",
    assignee: "Sarah Johnson",
    dueDate: "2026-01-08",
    priority: "high",
    status: "completed",
    subtasks: [
      { id: "s5", title: "Run analysis", completed: true },
      { id: "s6", title: "Create report", completed: true },
    ],
    tags: [
      { id: "t7", name: "research" },
      { id: "t8", name: "competitive" },
    ],
  },
];
