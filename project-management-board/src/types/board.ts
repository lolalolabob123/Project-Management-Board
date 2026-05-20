import {Task} from "./task"

export interface Column {
    id: string;
    title: string;
    tasks: Task[]
}

export interface Board {
    id: string;
    name: string;
    columns: Column[]
}