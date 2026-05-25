import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types";

export default function TaskCard({
  task,
  index,
  onDelete,
  onEdit,
}: {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  onEdit: () => void;
}) {
  const priorityStyles =
    task.priority === "high"
      ? "bg-red-100 text-red-700"
      : task.priority === "medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md cursor-grab"
        >
          <h3 className="font-medium text-gray-900">{task.title}</h3>

          <p className="text-sm text-gray-600 mt-1">
            {task.description}
          </p>

          <span
            className={`inline-block mt-3 text-xs px-2 py-1 rounded-full ${priorityStyles}`}
          >
            {task.priority}
          </span>

          <div className="flex gap-3 mt-3 text-sm">
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}