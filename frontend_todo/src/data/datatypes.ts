import { todo } from "node:test";

export type TodoItem = {
  id: null | string|number;
  title: string;
  description: string;
  date: Date;
  status: TodoStatus;
  priority: TodoPriority;
  labels: string[];
};

export enum TodoStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}