export type TodoStatus = "incomplete" | "complete";

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}

export type ScreenState = "signup" | "verify" | "login" | "dashboard";