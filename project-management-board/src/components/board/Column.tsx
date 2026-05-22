import TaskCard from "./TaskCard";
import { Task } from "@/types/task";
import { Droppable } from "@hello-pangea/dnd";

interface ColumnProps {
    title: string;
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
}

export default function Column({
    title,
    tasks,
    onDeleteTask
}: ColumnProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 w-80 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                {title}
            </h2>

            <div className="space-y-4">
                <Droppable droppableId={title}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-4"
                        >
                            {tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onDelete={onDeleteTask}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    )
}