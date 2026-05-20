import { Task } from "@/types/task"

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({
    task,
}: TaskCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-gray-900">
                {task.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
                {task.description}
            </p>

            <p className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                {task.priority}
            </p>
        </div>
    )
}