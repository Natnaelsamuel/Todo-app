export interface Todo {
  id: string;
  title: string;
  status: string;
  deadline: string;
}

export const statusOptions = ["pending", "in-progress", "completed"] as const;