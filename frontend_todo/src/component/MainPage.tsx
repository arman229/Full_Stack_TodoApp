"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import TodoCard from "./TodoCard";
import AddTodoModel from "./AddTodoModel";
import { filterTodos } from "@/utils/DateUtils";
import { TodoItem } from "@/data/datatypes";
import ThreeChips from "./threebutton";

import { HandleApiRequest } from "@/utils/DateUtils";
import { API_URL } from "@/utils/url";
import Myloading from "@/component/myloading";
const MainPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todosArray, setTodosArray] = useState<TodoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | undefined>();
  const [selectedChip, setSelectedChip] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var isLight = Boolean(localStorage.getItem("isLight") === "true");
    setIsLightMode(isLight);
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(undefined);
  };
  const onEdit = (newTodoItem: TodoItem) => {
    setSelectedTodo(newTodoItem);
    setIsModalOpen(true);
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

  async function fetchData(){
    const headers = new Headers();
    headers.append("ngrok-skip-browser-warning", String(true));
    var options = {
      method: "GET",
      headers: headers,
    };
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/todos`, options);
      const data = await response.json();
      setLoading(false);
      setTodosArray(data);
      console.log("our fetch data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const onDelete = async (todoItem: TodoItem) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: "DELETE",
      headers: headers,
    };
    try {
      const response = await fetch(`${API_URL}/todo/${todoItem.id}`, options);
      if (!response.ok) {
        console.log("Failed to delete todo");
        console.log(todoItem.id);
      }
      await fetchData();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const onAddOrUpdate = async (newTodoItem: TodoItem) => {
    try {
      let url = `${API_URL}/todo`;
      let method = "POST";
      
      if (newTodoItem.id) {
        url += `/${newTodoItem.id}`;
        method = "PUT";
      } 
      const updatedData = await HandleApiRequest(url, method, newTodoItem);
      console.log('mydatataaaaa',updatedData);
    
      await fetchData();
  
    } catch (error) {
      console.error("Error adding/updating todo:", error);
      throw error;
    }
  };
  

  return (
    <>
      <div
        className={` flex flex-col min-h-screen   ${
          !isLightMode ? "dark" : ""
        }`}
      >
        <Header
          toggleDarkMode={() => {
            localStorage.setItem("isLight", String(!isLightMode));
            setIsLightMode(!isLightMode);
          }}
          isDarkMode={isLightMode}
        />
        <div
          className={
            " px-2  flex-1   text-black     dark:bg-[#121c22]  bg-white"
          }
        >
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
            {loading ? (
              <Myloading />
            ) : (
              filteredTodos.map((item) => (
                <TodoCard
                  key={item.id}
                  todoItem={item}
                  onStatusChange={onAddOrUpdate}
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item)}
                  isDarkMode={isLightMode}
                />
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
      <div className="flex items-center justify-center  ">
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
