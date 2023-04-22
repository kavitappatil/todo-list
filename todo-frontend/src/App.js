import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!todo) {
      toast("please enter something");
      return;
    }
    if (todos.some(({ task }) => task === todo)) {
      toast(`Task: ${todo} already exists`);
      return;
    }
    const newTodo = await APIHelper.createTodo(todo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    const payload = {
      completed: !todos.find((todo) => todo._id === id).completed,
    };
    const updatedTodo = await APIHelper.updateTodo(id, payload);
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="gradient-custom-2 vh-100">
        <div className="App py-5 h-100">
          <div
            className="d-flex justify-content-center"
            style={{ borderRadius: "5px" }}
          >
            <div className="card_lg card shadow-lg py-5 px-5 w-75">
              <div className="text-center pt-3 pb-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                  alt="Check"
                  width="60"
                />
              </div>
              <h1 className=" mb-3 text-center col-xs-4 ">Task List</h1>
              <div className="d-flex justify-content-center bd-highlight mb-3">
                <div className="p-2 col-sm-8 bd-highlight">
                  <input
                    id="todo-input"
                    type="text"
                    className="form-control"
                    placeholder="Add to list"
                    aria-label="Add to list"
                    value={todo}
                    onChange={({ target }) => setTodo(target.value)}
                  />
                </div>
                <div className="p-2 bd-highlight"></div>
                <div className="p-2 bd-highlight">
                  <button
                    type="button"
                    className="shadow btn btn-primary rounded"
                    onClick={createTodo}
                  >
                    &nbsp;&nbsp;Save&nbsp;&nbsp;
                  </button>
                </div>
              </div>

              <hr className="my-4" />

              <table className="table table-bordered table-striped table-hover shadow ">
                <thead>
                  <tr>
                    <th scope="col" className="px-4">
                      No.
                    </th>
                    <th scope="col" className="px-4">
                      Todo Item
                    </th>
                    <th
                      scope="col"
                      className="px-4 d-flex justify-content-center"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map(({ _id, task, completed }, i) => (
                    <tr className="px-4" key={i}>
                      <th className="px-4" scope="row">
                        {i + 1}
                      </th>
                      <td className={completed ? "completed" : ""}>
                        <span
                          onClick={(e) => updateTodo(e, _id)}
                          className="px-4"
                        >
                          {task}
                        </span>
                      </td>
                      <td className="px-4 d-flex justify-content-center">
                        <button
                          onClick={(e) => deleteTodo(e, _id)}
                          className="shadow btn btn-danger btn-sm rounded"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                        >
                          &nbsp;&nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                          &nbsp;&nbsp;{" "}
                        </button>
                        &nbsp;
                        <button
                          onClick={(e) => updateTodo(e, _id)}
                          className="shadow btn btn-success btn-sm rounded"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;Finished&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
