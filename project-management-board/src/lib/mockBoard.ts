import { Board } from "../features/board/types";

export const mockBoard: Board = {
  columns: [
    {
      id: "todo",
      title: "Todo",
      tasks: [
        {
          id: "1",
          title: "Setup project",
          description: "Initialize Next.js app",
          priority: "high",
        },
        {
          id: "2",
          title: "Design board UI",
          description: "Create columns and layout",
          priority: "medium",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ],
};