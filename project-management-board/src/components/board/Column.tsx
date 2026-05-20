import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

interface ColumnProps {
    title: string;
    tasks: Task[];
}

export default function Column({
    title,
    tasks,
}: ColumnProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-x1 p-4 w-80 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                {title}
            </h2>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard
                    key={task.id}
                    task={task}/>
                ))}
            </div>
        </div>
    )
}