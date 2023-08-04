import React, { createContext } from "react";

export const TodosContext = createContext();

const TodoContext = ({ children }) => {
  return (
    <TodosContext.Provider value={{ num: 1 }}>{children}</TodosContext.Provider>
  );
};

export default TodoContext;
