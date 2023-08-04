import React, { useEffect, useState, useContext } from "react";
import "./index.css";
import { sunIcon, checkIcon, deleteIcon, moonIcon } from "../public/icons";
import Todo from "./components/Todo";
import TodoContext from "../TodoContext";
import { TodosContext } from "../TodoContext";

function App() {
  /* const { num } = useContext(TodosContext);
  useEffect(() => {
    //console.log(num);
  }, []);*/

  const [todos, setTodos] = useState([
    /*{ name: "Go to the gym", id: "qs321e33r", completed: false },
    { name: "Read for 30 mins", id: "qs321erer32", completed: false },
    { name: "Visit Grandma", id: "qs321e22err", completed: false },*/
  ]);
  const [todoName, setTodoName] = useState("");
  const [show, setShow] = useState({
    all: true,
    active: false,
    completed: false,
  });
  const [all, setAll] = useState([]);
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [theme, setTheme] = useState({ dark: false });

  useEffect(() => {
    const exists = localStorage.getItem("todos");
    if (exists) {
      //load todos
      const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localStorageTodos);
      console.log("lst", localStorageTodos);
    }

    //theme
    if (localStorage.getItem("theme")) {
      const lstheme = JSON.parse(localStorage.getItem("theme"));
      setTheme(lstheme);
    }
  }, []);

  useEffect(() => {
    const todosCopy = [...todos];
    setAll(todosCopy);
    setActive(todosCopy.filter((todo) => todo.completed == false));
    setCompleted(todosCopy.filter((todo) => todo.completed == true));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const todoID = crypto.randomUUID();
    const newTodo = { name: todoName, id: todoID, completed: false };
    const todosCopy = [...todos];
    todosCopy.unshift(newTodo);
    setTodos(todosCopy);
    localStorage.setItem("todos", JSON.stringify(todosCopy));
    setTodoName("");
  };
  const updateTodo = (todoItem) => {
    const nextTodos = [...todos];

    const todoIndex = nextTodos.findIndex((todo) => todo.id === todoItem.id);

    const nextTodo = { ...todoItem };

    nextTodo.completed = !nextTodo.completed;
    nextTodos[todoIndex] = nextTodo;
    //console.log(todo);

    setTodos(nextTodos);
    localStorage.setItem("todos", JSON.stringify(nextTodos));
  };

  const showAll = () => {
    const tabsState = { all: true, active: false, completed: false };
    setShow(tabsState);
    console.log(all);
  };

  const showActive = () => {
    const tabsState = { all: false, active: true, completed: false };
    setShow(tabsState);
    console.log(active);
  };
  const showCompleted = () => {
    const tabsState = { all: false, active: false, completed: true };
    setShow(tabsState);
    console.log(completed);
  };

  const clearCompleted = () => {
    const todosCopy = [...todos];
    const newTodos = todosCopy.filter((todo) => todo.completed == false);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id) => {
    const todosCopy = [...todos];
    const nextTodos = todosCopy.filter((todo) => todo.id != id);
    setTodos(nextTodos);
    localStorage.setItem("todos", JSON.stringify(nextTodos));
  };

  const toggleTheme = () => {
    const currentTheme = { ...theme };
    const nextTheme = currentTheme;
    nextTheme.dark = !currentTheme.dark;
    //nextTheme.light = !currentTheme.light;
    setTheme(nextTheme);
    localStorage.setItem("theme", JSON.stringify(nextTheme));
  };

  return (
    <TodoContext>
      <div className={theme.dark && "dark"}>
        <div className={`dark:bg-black h-screen`}>
          <div className="flex justify-center items-center dark:bg-black">
            <img
              src={
                theme.dark
                  ? `/images/bg-desktop-dark.jpg`
                  : `/images/bg-desktop-light.jpg`
              }
              alt="background_image"
              className="relative w-full object-cover hidden sm:block"
            />

            {/**mobile */}
            <img
              src="/images/bg-mobile-dark.jpg"
              alt="background_image"
              className="w-full object-cover sm:hidden"
            />
            <div className="absolute w-full lg:w-2/5 mt-96 pt-24">
              <div className=" w-full px-5 mt-5">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-bold text-white ">TODO</h1>

                  <button onClick={() => toggleTheme()}>
                    {theme.dark ? sunIcon : moonIcon}
                  </button>
                </div>
                <div
                  className={`my-5 px-5 flex gap-x-3 items-center bg-white dark:bg-slate-900 rounded-md`}
                >
                  <div className=" cursor-pointer p-2 w-7 h-7 rounded-full border border-gray-500 ">
                    {false && checkIcon}
                  </div>
                  <form onSubmit={(e) => addTodo(e)} className=" w-full">
                    <input
                      type="text"
                      value={todoName}
                      onChange={(e) => setTodoName(e.target.value)}
                      placeholder="Create a new todo..."
                      className={` w-full p-5 focus:outline-none text-gray-400 dark:bg-slate-900 `}
                    />
                  </form>
                </div>
                <div
                  className={`rounded-md divide-gray-500 divide-y dark:bg-slate-900 dark:text-gray-200  bg-white font-bold text-lg shadow-xl`}
                >
                  {show.all &&
                    all.map((todo) => (
                      <Todo
                        theme={theme}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                      />
                    ))}
                  {show.active &&
                    active.map((todo) => (
                      <Todo
                        theme={theme}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                      />
                    ))}
                  {show.completed &&
                    completed.map((todo) => (
                      <Todo
                        theme={theme}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                      />
                    ))}

                  <div className="flex justify-between items-center p-5 text-gray-500">
                    <div>
                      <h1>
                        {todos.length} item{todos.length != 1 && "s"} left
                      </h1>
                    </div>
                    <ul className=" sm:flex gap-x-5 hidden ">
                      <li
                        className={`${
                          show.all ? `text-blue-700` : `hover:text-gray-300`
                        }`}
                      >
                        <button onClick={() => showAll()}>All</button>
                      </li>
                      <li
                        className={`${
                          show.active ? `text-blue-700` : `hover:text-gray-300`
                        }`}
                      >
                        <button onClick={() => showActive()}>Active</button>
                      </li>
                      <li
                        className={`${
                          show.completed
                            ? `text-blue-700`
                            : `hover:text-gray-300`
                        }`}
                      >
                        <button onClick={() => showCompleted()}>
                          Completed
                        </button>
                      </li>
                    </ul>
                    <div>
                      <button
                        onClick={() => clearCompleted()}
                        className="hover:text-gray-300"
                      >
                        Clear Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex justify-center items-center p-5 text-gray-500 ${
                  theme.dark ? `bg-slate-900` : `bg-white`
                } m-5 rounded-md shadow-md sm:hidden`}
              >
                <ul className=" flex gap-x-5 font-bold">
                  <li className={`${show.all && `text-blue-700`}`}>
                    <button onClick={() => showAll()}>All</button>
                  </li>
                  <li className={`${show.active && `text-blue-700`}`}>
                    <button onClick={() => showActive()}>Active</button>
                  </li>
                  <li className={`${show.completed && `text-blue-700`}`}>
                    <button onClick={() => showCompleted()}>Completed</button>
                  </li>
                </ul>
              </div>
              <div className=" text-gray-500 flex justify-center items-center py-10 font-bold">
                Drag and drop to reorder list
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoContext>
  );
}
//if you are passing something in to useState outside from react
//call it from a function for perfomance reasons
//js mutation
export default App;
