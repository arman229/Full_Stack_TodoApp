 'use client'

import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import TodoCard from "./TodoCard";
import AddTodoModel from "./AddTodoModel";
import { filterTodos, TodoItem } from "@/data/datatypes";
import ThreeChips from "./threebutton";

const MainPage = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todosArray, setTodosArray] = useState<TodoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | undefined>();
  const [selectedChip, setSelectedChip] = useState<string>("all");

  const [newfetchTodos, setnewFetchTodos] = useState([]);

  useEffect(() => {
    var isLight = Boolean(localStorage.getItem("isLight") === "true");
    setIsLightMode(isLight);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://d785-39-40-183-231.ngrok-free.app/todos");
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const data = await response.json();
      console.log("data", data);
      setnewFetchTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(undefined);
  };

  const onEdit = (newTodoItem: TodoItem) => {
    setSelectedTodo(newTodoItem);
    setIsModalOpen(true);
  };

  const onDelete = async (todoItem: any) => {
    try {
      const response = await fetch(
        `http://192.168.10.24:8000/new_todo/${todoItem.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      const updatedTodos = todosArray.filter((item) => item.id !== todoItem.id);
      setTodosArray(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    let byStatusList = todosArray;
    if (selectedChip !== "all") {
      const targetStatus =
        selectedChip === "completed" ? "COMPLETED" : "PENDING";
      byStatusList = todosArray.filter((todo) => todo.status === targetStatus);
    }

    const updatedFilteredTodos =
      searchQuery !== ""
        ? filterTodos(byStatusList, searchQuery)
        : byStatusList;
    setFilteredTodos(updatedFilteredTodos);
  }, [searchQuery, todosArray, selectedChip]);

  const onAddOrUpdate = async (newTodoItem: any) => {
    try {
      const response = await fetch("http://192.168.10.24:8000/new_todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodoItem),
      });
      if (!response.ok) {
        throw new Error("Failed to add/update");
      }
      const updatedData = await response.json();
      const found = todosArray.find((item) => item.id === updatedData.id);
      if (found !== undefined) {
        const updatedData = todosArray.map((obj) =>
          obj.id === updatedData.id ? updatedData : obj
        );
        setTodosArray(updatedData);
      } else {
        setTodosArray([...todosArray, updatedData]);
      }
    } catch (error) {
      console.error("Error adding/updating todo:", error);
    }
  };

  return (
    <>
<p>length of tods {newfetchTodos.length}</p>

      <div
        className={`flex flex-col min-h-screen ${!isLightMode ? "dark" : ""}`}
      >
        <Header
          toggleDarkMode={() => {
            localStorage.setItem("isLight", String(!isLightMode));
            setIsLightMode(!isLightMode);
          }}
          isDarkMode={isLightMode}
        />
        <div className={"px-2 flex-1 text-black dark:bg-[#121c22] bg-white"}>
          <Search
            searchTerm={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            onAddTodoButtonClick={() => {
              const addaudio = new Audio("/audio/audio.mp3");
              addaudio.play();
              setIsModalOpen(true);
            }}
          />
          <ThreeChips
            selectedChip={selectedChip}
            onSelectChip={setSelectedChip}
          />
          <div className="flex flex-wrap justify-center gap-6 pb-8">
            {newfetchTodos.map((item, index) => (
              <TodoCard
                key={index}
                todoItem={item}
                onStatusChange={onAddOrUpdate}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item)}
                isDarkMode={isLightMode}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
      <div className="flex items-center justify-center">
        {isModalOpen && (
          <AddTodoModel
            isDarkMode={isLightMode}
            closeModal={closeModal}
            onSave={onAddOrUpdate}
            editTodoItem={selectedTodo}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
