export type TodoItem = {
    id: null|string;
    title: string;
    description: string;
    date: Date;
    status: TodoStatus;
    priority: TodoPriority;
    labels: string[];
}


export type TodoStatus= 'PENDING'|'COMPLETED'
export type TodoPriority= 'LOW'|'MEDIUM'|'HIGH'

export function filterTodos(todosArray: TodoItem[], searchQuery:string): TodoItem[] {
    const result = todosArray.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.labels.some((label) => label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.date.toISOString().includes(searchQuery) ||
            item.priority.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    return result
}



