import { useState, useEffect } from "react";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: any) => void;
  onEditTask?: (task: any) => void;
  initialData?: any;
};

export default function TaskModal({
  isOpen,
  onClose,
  onCreateTask,
  onEditTask,
  initialData,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

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

    const updatedTask = {
      ...initialData,
      title,
      description,
      priority,
    };

    if (initialData && onEditTask) {
      onEditTask(updatedTask);
    } else {
      onCreateTask({
        id: crypto.randomUUID(),
        ...updatedTask,
      });
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-125 rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Task" : "Add Task"}
          </h2>

          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <select
            className="w-full border border-gray-200 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}