
import { TodoItem } from "@/data/datatypes";
export function formatDate(date: Date): string {
  if (!(date instanceof Date)) {
      date = new Date(date);
      if (isNaN(date.getTime())) {
           
          return '';
      }
  }
  
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}-${months[month]}-${year}`;
}




export function filterTodos( todosArray: TodoItem[],  searchQuery: string
  ): TodoItem[] {
    const result = todosArray.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.priority.toLowerCase().includes(searchQuery.toLowerCase())||
        item.date instanceof Date && item.date.toISOString().includes(searchQuery)||
        item.labels.some(
          (label) =>
            label.toLowerCase().includes(searchQuery.toLowerCase()) 
          
        )
    );
    return result;
  }
 