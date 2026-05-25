"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { useBoard } from "../hooks/useBoard";

export default function BoardView() {
  const {
    board,
    isModalOpen,
    setIsModalOpen,
    editingTask,
    setEditingTask,
    handleCreateTask,
    handleDeleteTask,
    handleEditTask,
    handleDragEnd,
  } = useBoard();

  return (
    <div className="p-6 overflow-x-auto">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Task
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 min-h-full w-max">
          {board.columns.map((col) => (
            <Column
              key={col.id}
              column={col}
              onDeleteTask={handleDeleteTask}
              onEditTask={setEditingTask}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen || !!editingTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onCreateTask={handleCreateTask}
        onEditTask={handleEditTask}
        initialData={editingTask}
      />
    </div>
  );
}