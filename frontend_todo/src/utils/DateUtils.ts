
import { TodoItem } from "@/data/datatypes";
import { TodoPriority } from "@/data/datatypes";
import { TodoStatus } from "@/data/datatypes";
export function formatDate(date: Date) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const [year, month, day] = date.toISOString().split('T')[0].split('-');
    return `${+day} ${months[+month - 1]} ${year}`;
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
  
  function convertToTodoStatus(status: string): TodoStatus {
      const lowerCaseStatus = status.toLowerCase();  
      
      if (lowerCaseStatus.includes("pen") || lowerCaseStatus === "inprogress"||lowerCaseStatus === "uncompleted"||lowerCaseStatus === "pending") {
        return "PENDING";
      } else if (lowerCaseStatus.includes("com") || lowerCaseStatus === "completed"|| lowerCaseStatus === "completes"||lowerCaseStatus === "complete") {
        return "COMPLETED";
      } else {
        return "PENDING";  
      }
    }
    function converttotodopriority(priority: string): TodoPriority {
      const lowerCasePriority = priority.toLowerCase();
      
      if (lowerCasePriority.includes("low")) {
        return "LOW";
      } else if (lowerCasePriority.includes("medium")) {
        return "MEDIUM";
      } else if (lowerCasePriority.includes("high")) {
        return "HIGH";
      } else {
        return "MEDIUM";  
      }
    }
    
  
  export function convertType(tods: any[]): TodoItem[] {
    return tods.map((todoItem) => {
      var newObj: TodoItem = {
        id: todoItem.id,
        title: todoItem.title,
        description: todoItem.description,
        date: new Date(todoItem.date),
        status: convertToTodoStatus(todoItem.status),
        priority: converttotodopriority(todoItem.priority),
        
        labels: todoItem.labels.split(","),
      };
      return newObj;
    });
  }
  

 const HandleApiRequest = async (url: string,method: string, body?: any) => {
    const options: RequestInit = { method: method,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": String(true),
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to ${method.toLowerCase()} data`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error ${method.toLowerCase()} data:`, error);
      throw error;
    }
  };
  export {HandleApiRequest}