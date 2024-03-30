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
import { FidgetSpinner } from "react-loader-spinner";
import Myloading from "@/component/myloading";
import { getAllTodos, deleteTodo, addTodo, updateTodo } from "@/data/RestApis";
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
    // var isLight = Boolean(localStorage.getItem("isLight") === "false");
    // setIsLightMode(isLight);
    fetchData();
  }, []);
function ToggleModefun (){ 
    // localStorage.setItem("isLight", String(!isLightMode));
    //   setIsLightMode(!isLightMode);
}
function onAddTodoButtonClick() {
 const addaudio = new Audio("/audio/audio.mp3");
 addaudio.play();
 setIsModalOpen(true);
}
function onSearchChange(query:string) {
 setSearchQuery(query)
}
function onSelectChip(statusvalue:string){
  setSelectedChip(statusvalue)
}
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(undefined);
  };
  const onEdit = (newTodoItem: TodoItem) => {
    setSelectedTodo(newTodoItem);
    setIsModalOpen(true);
  };

  async function fetchData() {
    try {
      setLoading(true);
      const data = await getAllTodos();
      setLoading(false);
      setTodosArray(data);
    } catch (error) {
      setLoading(false);
    }
  }
  const onDelete = async (todoItem: TodoItem) => {
    try {
      setLoading(true);
      await deleteTodo(todoItem.id!!);
      const updatedTodosArray = todosArray.filter(
        (item) => item.id !== todoItem.id
      );
      setTodosArray(updatedTodosArray);
      setLoading(false);
 
    } catch (error) {
      setLoading(false);
      console.error("Error deleting todo:", error);
    }
  };

  const onAddOrUpdate = async (todoItem: TodoItem) => {
    console.log("todo id is :" + todoItem.id);
    try {
        setLoading(true);
        let res;
        if (todoItem.id) {
            await updateTodo(todoItem);
            const updatedTodosArray = todosArray.map((item) =>
                item.id === todoItem.id ? todoItem : item
            );
            setTodosArray(updatedTodosArray);
        } else {
          try {
            setLoading(true);
            let res = await addTodo(todoItem);
            const savedId = res.todo_id;  
            const newData = { ...todoItem, id: savedId }; 
            setTodosArray([...todosArray, newData]);  
            
        } catch (error) {
            setLoading(false);
           
        }
      }

        setLoading(false);
        console.log("operation success");
    } catch (error) {
        setLoading(false);
        console.error("Error operation todo:", error);
    }
};








  return (
    <>
      <div  className={`flex flex-col min-h-screen ${!isLightMode ? "dark" : ""}`}>
        <Header  toggleDarkMode={ToggleModefun}  isDarkMode={isLightMode}/>
        <div className={` px-2 flex-1  ${loading ? 'dark:opacity-90  dark:bg-black ' : 'px-2 flex-1 text-black dark:bg-[#121c22] bg-white'}`}>
         <Search searchTerm={searchQuery} onSearchChange={onSearchChange} onAddTodoButtonClick={onAddTodoButtonClick} />
         <ThreeChips selectedChip={selectedChip} onSelectChip={onSelectChip}/>
         

          <div className="flex flex-wrap justify-center gap-6 pb-8 relative">
            {filteredTodos.map((item) => (
              <TodoCard
                key={item.id}
                todoItem={item}
                onStatusChange={onAddOrUpdate}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item)}
                 
              />
            ))}
            {loading && <Myloading/> }
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
