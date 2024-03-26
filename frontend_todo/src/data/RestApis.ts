import { TodoItem } from "./datatypes";

const BASE_URL: string = "http://localhost:8000";
const baseHeaders = new Headers();
baseHeaders.append("ngrok-skip-browser-warning", "true");

export async function getAllTodos() {
  var options = {
    method: "GET",
    headers: baseHeaders,
  };

  const response = await fetch(BASE_URL + "/todos", options);
  const data = await response.json();
  return data;
}

export async function deleteTodo(todoId: number) {
  var options = {
    method: "DELETE",
    headers: baseHeaders,
  };
  const response = await fetch(BASE_URL + `/todo/${todoId}`, options);
  const data = await response.json();
}

export async function addTodo(todo: TodoItem) {
  baseHeaders.set("Content-Type", "application/json");
  var options = {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify(todo),
  };
  const response = await fetch(BASE_URL + `/todo`, options);
  const data = await response.json();
}

export async function updateTodo(todo: TodoItem) {
  baseHeaders.set("Content-Type", "application/json");
  var options = {
    method: "PUT",
    headers: baseHeaders,
    body: JSON.stringify(todo),
  };
  const response = await fetch(BASE_URL + `/todo/${todo.id}`, options);
  const data = await response.json();
}
