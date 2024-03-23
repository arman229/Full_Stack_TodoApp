import { todo } from "node:test";

export type TodoItem = {
  id: null | string;
  title: string;
  description: string;
  date: Date;
  status: TodoStatus;
  priority: TodoPriority;
  labels: string[];
};

export type TodoStatus = "PENDING" | "COMPLETED";
export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";
