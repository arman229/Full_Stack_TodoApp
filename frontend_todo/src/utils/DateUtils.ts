
import { TodoItem } from "@/data/datatypes";
import { TodoPriority } from "@/data/datatypes";
import { TodoStatus } from "@/data/datatypes";
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




export function filterTodos(
    todosArray: TodoItem[],
    searchQuery: string
  ): TodoItem[] {
    const result = todosArray.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.labels.some(
          (label) =>
            label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.date.toISOString().includes(searchQuery) ||
            item.priority.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    return result;
  }
 

  const HandleApiRequest = async (url: string, method: string, todo: TodoItem) => {
    const options = {
      method: method, 
      body: JSON.stringify(todo)
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
          console.log(`Failed to ${method.toLowerCase()} data`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error ${method.toLowerCase()} data:`, error);
      throw error;
    }
  };
  export { HandleApiRequest };
 