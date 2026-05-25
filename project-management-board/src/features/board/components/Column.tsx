import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";
import { Column as ColumnType, Task } from "../../board/types/index";

export default function Column({
    column,
    onDeleteTask,
    onEditTask,
}: {
    column: ColumnType;
    onDeleteTask: (id: string) => void;
    onEditTask: (task: Task) => void;
}) {
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
                        {column.tasks
                            // Fixed: Coerced the evaluation into a strict boolean
                            .filter((task): task is Task => !!(task && task.id))
                            .map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    index={index}
                                    task={task}
                                    onDelete={onDeleteTask}
                                    onEdit={() => onEditTask(task)}
                                />
                            ))}

                        {provided.placeholder}

                        {column.tasks.length === 0 && (
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