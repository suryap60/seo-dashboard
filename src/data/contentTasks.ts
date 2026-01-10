import type { ContentTask } from "@/types/task";

export const initialContentTasks: ContentTask[] = [
  {
    id: "ct-1",
    title: "SEO Best Practices Guide 2026",
    assignee: "Sarah Johnson",
    dueDate: "2026-01-20",
    wordCount: 2450,
    priority: "high",
    status: "draft",
    subtasks: [
      { id: "s1", title: "Research topics", completed: true },
      { id: "s2", title: "Write outline", completed: true },
      { id: "s3", title: "First draft", completed: false },
      { id: "s4", title: "Review & edit", completed: false },
    ],
    tags: [
      { id: "t1", name: "seo" },
      { id: "t2", name: "guide" },
    ],
    content: `# SEO Best Practices Guide 2026

## Introduction
Search engine optimization continues to evolve rapidly. This comprehensive guide covers the essential strategies and techniques that will help your website rank higher in 2026.

## Key Topics Covered
- Technical SEO fundamentals
- Content optimization strategies
- Link building best practices
- Core Web Vitals optimization
- AI and search: What's changing

## Technical SEO
Ensuring your website is technically sound is the foundation of any successful SEO strategy...`,
    targetKeyword: "SEO best practices 2026",
    slug: "/blog/seo-best-practices-guide-2026",
  },
  {
    id: "ct-2",
    title: "Link Building Strategies Blog Post",
    assignee: "Mike Chen",
    dueDate: "2026-01-12",
    wordCount: 1800,
    priority: "medium",
    status: "in_review",
    subtasks: [
      { id: "s5", title: "Research competitors", completed: true },
      { id: "s6", title: "Write content", completed: true },
      { id: "s7", title: "Add internal links", completed: false },
    ],
    tags: [
      { id: "t3", name: "backlinks" },
      { id: "t4", name: "strategy" },
    ],
    content: `# Effective Link Building Strategies for 2026

Building high-quality backlinks remains one of the most important ranking factors. In this post, we'll explore proven strategies that work in 2026...`,
    targetKeyword: "link building strategies",
    slug: "/blog/link-building-strategies-2026",
  },
  {
    id: "ct-3",
    title: "Technical SEO Checklist",
    assignee: "Alex Thompson",
    dueDate: "2026-01-30",
    wordCount: 1200,
    priority: "low",
    status: "draft",
    subtasks: [],
    tags: [
      { id: "t5", name: "technical" },
      { id: "t6", name: "checklist" },
    ],
    content: `# Technical SEO Checklist

Use this comprehensive checklist to audit your website's technical SEO health...`,
    targetKeyword: "technical seo checklist",
    slug: "/resources/technical-seo-checklist",
  },
  {
    id: "ct-4",
    title: "Content Marketing Trends 2026",
    assignee: "Sarah Johnson",
    dueDate: "2026-01-05",
    wordCount: 3200,
    priority: "high",
    status: "published",
    subtasks: [
      { id: "s8", title: "Research trends", completed: true },
      { id: "s9", title: "Write article", completed: true },
      { id: "s10", title: "Create graphics", completed: true },
    ],
    tags: [
      { id: "t7", name: "trends" },
      { id: "t8", name: "content-marketing" },
    ],
    content: `# Content Marketing Trends Shaping 2026

The content marketing landscape is rapidly evolving. Here are the key trends that will define success in 2026...`,
    targetKeyword: "content marketing trends 2026",
    slug: "/blog/content-marketing-trends-2026",
  },
];
