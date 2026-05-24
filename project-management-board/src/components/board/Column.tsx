import TaskCard from "./TaskCard";
import { Task } from "@/types/task";
import { Droppable } from "@hello-pangea/dnd";

interface ColumnProps {
    id: string;
    title: string;
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void
}

export default function Column({
    id,
    title,
    tasks,
    onDeleteTask,
    onEditTask,
}: ColumnProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 w-80 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                {title}
            </h2>

            <Droppable droppableId={id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-4 min-h-30"
                    >
                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={index}
                                onDelete={onDeleteTask}
                                onEdit={() => onEditTask(task)}
                            />
                        ))}

                        {provided.placeholder}

                        {tasks.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-6 border border-dashed rounded-lg">
                                Drop tasks here
                            </p>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    )
}