import React, { useState } from "react";
import { deleteIcon, checkIcon } from "../../public/icons";

const Todo = ({ todo, updateTodo, deleteTodo, theme }) => {
  const [showIcon, setShowIcon] = useState(false);
  return (
    <div
      key={todo.id}
      className={` flex justify-between items-center p-5 `}
      draggable={true}
    >
      <div className="flex gap-x-5">
        <button
          onClick={() => updateTodo(todo)}
          className={` p-2 w-7 h-7 rounded-full border border-gray-500 hover:border-blue-400 hover:border-r-pink-300 ${
            todo.completed && `bg-gradient-to-br from-blue-400 to-pink-300`
          } `}
        >
          {todo.completed && checkIcon}
        </button>
        <div
          className={`${
            todo.completed && `line-through text-gray-300 dark:text-gray-500`
          } ${!todo.completed && `dark:text-white`} text-gray-400`}
        >
          {todo.name}
        </div>
      </div>
      <button className="" onClick={() => deleteTodo(todo.id)}>
        {deleteIcon}
      </button>
    </div>
  );
};

export default Todo;
