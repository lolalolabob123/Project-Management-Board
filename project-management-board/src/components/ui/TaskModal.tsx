import { useState } from "react";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: any) => void;
};

export default function TaskModal({ isOpen, onClose, onCreateTask }: TaskModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")

  function handleCreateTask() {

    if (!title.trim()) {
      return
    }

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
    }

    onCreateTask(newTask)

    setTitle("")
    setDescription("")
    setPriority("low")

    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      {/* Modal Box */}
      <div className="bg-white w-125 rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Task
          </h2>

          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              value={title}
              onChange={((e) => setTitle(e.target.value))}
              className="w-full border rounded p-2 mt-1 text-gray-500"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-gray-500"
              placeholder="Task description"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-gray-500">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateTask}
            disabled={!title.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
}