"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ColumnComponent from "@/components/board/Column";
import type { Board } from "@/types/board";
import { mockBoard } from "@/lib/mockBoard";
import { useState, useEffect } from "react";
import TaskModal from "@/components/ui/TaskModal";
import { DragDropContext } from "@hello-pangea/dnd";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  const [board, setBoard] = useState<Board>(() => {
    if (typeof window === "undefined") return mockBoard;

    const saved = localStorage.getItem("board");
    return saved ? JSON.parse(saved) : mockBoard;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any | null>(null)

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  function handleCreateTask(task: any) {
    setBoard((prev) => {
      const updatedColumns = prev.columns.map((column) => {
        if (column.id === "todo") {
          return {
            ...column,
            tasks: [...column.tasks, task],
          };
        }
        return column;
      });

      return {
        ...prev,
        columns: updatedColumns,
      };
    });
  }

  function handleDeleteTask(taskId: string) {
    setBoard((prev) => {
      const updatedColumns = prev.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }));

      return {
        ...prev,
        columns: updatedColumns,
      };
    });
  }

  function handleDragEnd(result: any) {
    const { source, destination } = result;

    if (!destination) return;

    setBoard((prev) => {
      const columns = [...prev.columns];

      const sourceColIndex = columns.findIndex(
        (col) => col.id === source.droppableId
      );

      const destColIndex = columns.findIndex(
        (col) => col.id === destination.droppableId
      );

      if (sourceColIndex === -1 || destColIndex === -1) return prev;

      const sourceColumn = columns[sourceColIndex];
      const destColumn = columns[destColIndex];

      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);

      const [movedTask] = sourceTasks.splice(source.index, 1);

      const newColumns = [...columns];

      // SAME COLUMN (reorder)
      if (sourceColIndex === destColIndex) {
        sourceTasks.splice(destination.index, 0, movedTask);

        newColumns[sourceColIndex] = {
          ...sourceColumn,
          tasks: sourceTasks,
        };

        return {
          ...prev,
          columns: newColumns,
        };
      }

      // DIFFERENT COLUMN (move)
      destTasks.splice(destination.index, 0, movedTask);

      newColumns[sourceColIndex] = {
        ...sourceColumn,
        tasks: sourceTasks,
      };

      newColumns[destColIndex] = {
        ...destColumn,
        tasks: destTasks,
      };

      return {
        ...prev,
        columns: newColumns,
      };
    });
  }

  function handleEditTask(updatedTask: any) {
    setBoard((prev) => {
      const updatedColumns = prev.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
      }))

      return {
        ...prev,
        columns: updatedColumns,
      }
    })

    setEditingTask(null)
  }

  return (
    <main className="h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6 overflow-x-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Add Task
          </button>

<ClientOnly>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 min-h-full items-start w-max">
              {board.columns.map((column) => (
                <ColumnComponent
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={(task) => setEditingTask(task)}
                />
              ))}
            </div>
            </DragDropContext>
          </ClientOnly>

          <TaskModal
            isOpen={isModalOpen || !!editingTask}
            onClose={() => {
              setIsModalOpen(false)
              setEditingTask(null)
            }}
            onCreateTask={handleCreateTask}
            onEditTask={handleEditTask}
            initialData={editingTask}
          />
        </div>
      </div>
    </main>
  );
}