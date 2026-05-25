"use client";

import { useEffect, useState } from "react";
import { Board, Task } from "../types";
import { loadBoard, saveBoard } from "@/shared/lib/storage";
import { mockBoard } from "@/shared/lib/mockBoard";

export function useBoard() {
  const [board, setBoard] = useState<Board>(mockBoard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // load once
  useEffect(() => {
    const saved = loadBoard();
    if (saved) setBoard(saved);
  }, []);

  // persist
  useEffect(() => {
    saveBoard(board);
  }, [board]);

  // CREATE
  function handleCreateTask(task: Task) {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === "todo"
          ? { ...col, tasks: [...col.tasks, task] }
          : col
      ),
    }));
  }

  // DELETE
  function handleDeleteTask(taskId: string) {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      })),
    }));
  }

  // EDIT
  function handleEditTask(updated: Task) {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) =>
          t.id === updated.id ? updated : t
        ),
      })),
    }));

    setEditingTask(null);
  }

  // DRAG & DROP (slightly safer version)
function handleDragEnd(result: any) {
  const { source, destination } = result;
  if (!destination) return;

  setBoard((prev) => {
    const columns = prev.columns.map((col) => ({
      ...col,
      tasks: [...col.tasks],
    }));

    const sourceCol = columns.find(
      (c) => c.id === source.droppableId
    );
    const destCol = columns.find(
      (c) => c.id === destination.droppableId
    );

    if (!sourceCol || !destCol) return prev;

    const sourceTasks = [...sourceCol.tasks];
    const [moved] = sourceTasks.splice(source.index, 1);

    if (!moved) return prev;

    // SAME COLUMN
    if (sourceCol.id === destCol.id) {
      sourceTasks.splice(destination.index, 0, moved);
      sourceCol.tasks = sourceTasks;

      return { ...prev, columns };
    }

    // DIFFERENT COLUMN
    const destTasks = [...destCol.tasks];
    destTasks.splice(destination.index, 0, moved);

    sourceCol.tasks = sourceTasks;
    destCol.tasks = destTasks;

    return { ...prev, columns };
  });
}

  return {
    board,
    isModalOpen,
    setIsModalOpen,
    editingTask,
    setEditingTask,
    handleCreateTask,
    handleDeleteTask,
    handleEditTask,
    handleDragEnd,
  };
}