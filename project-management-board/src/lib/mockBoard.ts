import { Board } from "@/types/board";

export const mockBoard: Board = {
    id: "board-1",
    name: "My First Board",
    columns: [
        {
            id: "todo",
            title: "Todo",
            tasks: [
                {
                    id: "1",
                    title: "Build navbar",
                    description: "Create top navigation",
                    priority: "high",
                },
                {
                    id: "2",
                    title: "Setup Layout",
                    description: "Build app shell",
                    priority: "medium",
                },
            ],
        },
        {
            id: "doing",
            title: "Doing",
            tasks: [
                {
          id: "3",
          title: "Design board UI",
          description: "Make it look clean",
          priority: "medium",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "4",
          title: "Create project",
          description: "Initial setup complete",
          priority: "low",
        },
            ]
        }
    ]
}