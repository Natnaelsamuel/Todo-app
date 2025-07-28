// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import TodoList from "../components/TodoList";
// import CreateTodoModal from "../components/CreateTodoModal";
// import { COLOR_THEME } from "@/lib/theme";

// export default function Home() {
//   const [todos, setTodos] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     fetchTodos(currentPage);
//   }, [currentPage]);

//   const fetchTodos = async (page = 1) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/todos?page=${page}&limit=${limit}`);
//       const data = await res.json();
//       setTodos(data.todos);
//       setCurrentPage(data.currentPage);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error("Failed to fetch todos:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetch("/api/todos")
//   //     .then((res) => res.json())
//   //     .then((data) => setTodos(data));
//   // }, []);

//   const filteredTodos = todos.filter(
//     (todo: any) =>
//       todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       todo.status.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col gap-4">
//       <h1 className="text-2xl text-center font-bold">
//         Track your tasks easily
//       </h1>
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-4 py-2 rounded-4xl w-full sm:w-64 md:w-80 lg:w-96 border shadow-lg dark:border-white"
//         />
//         {/* <button onClick={() => setShowModal(true)} className="btn btn-primary">
//           Create Todo
//         </button> */}
//         <Button onClick={() => setShowModal(true)} className={`${COLOR_THEME.primary[500]} ${COLOR_THEME.primary.hover}`}>
//           Create Todo
//         </Button>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center py-2">
//           <span className="loading loading-dots loading-lg"></span>
//         </div>
//       ) : (
//         <TodoList
//           todos={filteredTodos}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => {
//             setCurrentPage(page);
//             fetchTodos(page);
//           }}
//           onTodosChange={fetchTodos}
//         />
//       )}

//       {showModal && (
//         <CreateTodoModal
//           onClose={() => setShowModal(false)}
//           onTodoCreated={fetchTodos}
//         />
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TodoList from "../components/TodoList";
import CreateTodoModal from "../components/CreateTodoModal";
import { COLOR_THEME } from "@/lib/theme";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);

  const fetchTodos = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/todos?page=${page}&limit=${limit}`);
      const data = await res.json();
      setTodos(data.todos);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTodos = todos.filter(
    (todo: any) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-7 px-14 md:p-8 max-w-6xl mx-auto bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-800">Your Tasks</h1>
        <p className="text-purple-600">Stay organized</p>
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500"
        />
        <Button
          onClick={() => setShowModal(true)}
          className={`${COLOR_THEME.primary[500]} hover:${COLOR_THEME.primary[600]} text-white px-4 py-2 rounded-lg`}
        >
          Create Todo
        </Button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border p-1 border-purple-100 dark:bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              fetchTodos(page);
            }}
            onTodosChange={fetchTodos}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateTodoModal
          onClose={() => setShowModal(false)}
          onTodoCreated={fetchTodos}
        />
      )}
    </div>
  );
}