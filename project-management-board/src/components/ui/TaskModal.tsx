type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      
      {/* Modal Box */}
      <div className="bg-white w-[500px] rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
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
              className="w-full border rounded p-2 mt-1"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              className="w-full border rounded p-2 mt-1"
              placeholder="Task description"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Priority</label>
            <select className="w-full border rounded p-2 mt-1">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
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

          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Create
          </button>
        </div>

      </div>
    </div>
  );
}