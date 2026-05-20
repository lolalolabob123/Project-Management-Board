"use client";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Column from "@/components/board/Column";
import { mockBoard } from "@/lib/mockBoard";
import { useState } from "react";
import TaskModal from "@/components/ui/TaskModal";

export default function Home() {
  const board = mockBoard;
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <main className="h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6 overflow-x-auto">
          <button onClick={() => setIsModalOpen(true)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Add Task
          </button>
          <div className="flex gap-6 min-h-full items-start w-max">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
          </div>

          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </main>
  )
}