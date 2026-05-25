export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Board = {
  columns: Column[];
};