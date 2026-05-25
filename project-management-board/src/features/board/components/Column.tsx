import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";
import { Column as ColumnType, Task } from "@/features/board/types";

export default function Column({
    column,
    onDeleteTask,
    onEditTask,
}: {
    column: ColumnType;
    onDeleteTask: (id: string) => void;
    onEditTask: (task: Task) => void;
}) {
    const safeTasks = Array.isArray(column.tasks)
  ? column.tasks.filter((t): t is Task => t != null)
  : [];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 w-80 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 uppercase mb-4">
                {column.title}
            </h2>

            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-4 min-h-20"
                    >
                        {safeTasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                index={index}
                                task={task}
                                onDelete={onDeleteTask}
                                onEdit={() => onEditTask(task)}
                            />
                        ))}

                        {provided.placeholder}

                        {safeTasks.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-6">
                                Drop tasks here
                            </p>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
}