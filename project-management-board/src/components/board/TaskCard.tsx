import { Task } from "@/types/task"

interface TaskCardProps {
    task: Task;
    onDelete: (taskId: string) => void;
}

export default function TaskCard({
    task,
    onDelete,
}: TaskCardProps) {
    let priorityStyles = ""
    if (task.priority === "high") {
        priorityStyles = "bg-red-100 text-red-700";
    } else if (task.priority === "medium") {
        priorityStyles = "bg-yellow-100 text-yellow-700"
    } else {
        priorityStyles = "bg-green-100 text-green-700"
    }
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer">
            <h3 className="font-medium text-gray-900">
                {task.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
                {task.description}
            </p>

            <span className={`inline-block mt-3 text-xs px-2 py-1 rounded-full ${priorityStyles}`}>
                {task.priority}
            </span>

            <button
            onClick={() => onDelete(task.id)}
            className="mt-4 text-sm text-red-600 hover:text-red-800 cursor-pointer"
            >
                Delete
            </button>
        </div>
    )
}