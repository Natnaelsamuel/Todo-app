"use client";
import { use, useEffect, useState } from "react";
import CreateTodoModal from "./components/CreateTodoModal";
import TodoList from "./components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((res) => res.json())
  //     .then((data) => setTodos(data));
  // }, []);

  const filteredTodos = todos.filter(
    (todo: any) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-center font-bold">
        Track your tasks easily
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-4xl w-full sm:w-64 md:w-80 lg:w-96 border shadow-lg"
        />
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Create Todo
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-2">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <TodoList todos={filteredTodos} onTodosChange={fetchTodos} />
      )}

      {showModal && (
        <CreateTodoModal
          onClose={() => setShowModal(false)}
          onTodoCreated={fetchTodos}
        />
      )}
    </div>
  );
}
