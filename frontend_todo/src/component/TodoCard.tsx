import React, { FC } from "react";
import { formatDate } from "../utils/DateUtils";
import { TodoItem } from "../data/datatypes";
import { TodoMenu } from "./TodoMenu";
import { TodoStatus } from "@/data/datatypes";
import { MyStatusloading } from "./myloading";
import { useState } from "react";

interface TodoCardType {
  todoItem: TodoItem;
  onStatusChange: (todoItem: TodoItem) => void;
  onEdit: (todoItem: TodoItem) => void;
  onDelete: (todoItem: TodoItem) => void;
}

const TodoCard: FC<TodoCardType> = ({
  todoItem,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async () => {
    setIsUpdating(true);
    try {
      const addaudio = new Audio("/audio/markasdone.mp3");
      addaudio.play();
      await onStatusChange({
        ...todoItem,
        status:
          todoItem.status === TodoStatus.PENDING
            ? TodoStatus.COMPLETED
            : TodoStatus.PENDING,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getPriorityClasses = () => {
    if (todoItem.priority == "LOW") {
      return "bg-[#ff865b]  border-[#ff865b] text-black ";
    } else if (todoItem.priority == "MEDIUM") {
      return "bg-[#ff8ffa]  border-[#b387fa]  text-black  ";
    } else {
      return "bg-[#a381fa]  border-[#a381fa]  text-black  ";
    }
  };
  return (
    <>
      <div
        className={` max-w-sm w-full   sm:p-4  py-6 px-2  shadow-lg   dark:text-[#9fb9d0] dark:bg-[#232d35] bg-gray-200  } `}
        style={{ borderRadius: "20px" }}
      >
        <div className="flex justify-between mb-4 items-center">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleStatusChange}
              className={`py-1 px-2 sm:px-3.5 text-sm focus:outline-none rounded-full border  bg-[#1b2431] hover:bg-[#1b1111]   ${
                todoItem.status == "COMPLETED"
                  ? "text-[#addf92]   border-[#addf92]   "
                  : "   text-[#e6b56c]  border-[#e6b56c]  "
              }`}
            >
              {isUpdating ? <MyStatusloading /> : todoItem.status}
            </button>
            <div className="py-1 px-1 sm:px-2 flex-shrink-0 sm:text-sm">
              {formatDate(todoItem.date)}
            </div>
          </div>
          <div
            className={`py-1 px-2 sm:px-3.5 text-sm rounded-full border    ${getPriorityClasses()}`}
          >
            {todoItem.priority}{" "}
          </div>
          <TodoMenu
            onEditItem={() => onEdit(todoItem)}
            onDeleteItem={() => onDelete(todoItem)}
          />
        </div>

        <div className="text-xl font-bold mb-6">{todoItem.title}</div>
        <div className="flex justify-center">
          <div
            className={`text-center h-1.5  w-20 rounded-full mb-4 dark:bg-[#9fb9d0] bg-gray-900 `}
          ></div>
        </div>
        <div className="mb-4">{todoItem.description}</div>
        <div className="flex flex-wrap gap-2">
          {todoItem.labels.length > 0 &&
            todoItem.labels.map((label) => (
              <div
                className={`py-1 px-2 sm:px-3.5 text-sm rounded-full border text-[#9fb9d0] bg-[#232d35] `}
                key={label}
              >
                {label}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default TodoCard;
