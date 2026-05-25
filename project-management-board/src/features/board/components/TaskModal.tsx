"use client";

import { useEffect, useState } from "react";
import { Task } from "../types";

export default function TaskModal({
  isOpen,
  onClose,
  onCreateTask,
  onEditTask,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  initialData: Task | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!title.trim()) return;

    const task: Task = {
      id: initialData?.id || crypto.randomUUID(),
      title,
      description,
      priority,
    };

    initialData ? onEditTask(task) : onCreateTask(task);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded-xl shadow-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit Task" : "Add Task"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <select
            className="w-full border p-2 rounded"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white"
          >
            {initialData ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}