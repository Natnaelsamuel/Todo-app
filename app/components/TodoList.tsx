import { useState } from "react";
import toast from "react-hot-toast";
import UpdateTodoModal from "./UpdateTodoModal";
import { Todo } from "../types/todo";

export default function TodoList({
  todos,
  onTodosChange,
}: {
  todos: Todo[];
  onTodosChange: () => void;
}) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Todo deleted successfully!", {
          duration: 3000,
        });
        onTodosChange();
      } else {
        toast.error("Failed to delete todo.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Delete todo error:", error);
      toast.error("An error occurred while deleting the todo.", {
        duration: 3000,
      });
    }
  };

  const handleUpdateClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowUpdateModal(true);
  };

  if (todos.length === 0)
    return <div className="text-center text-gray-500">No todos found.</div>;

  return (
    <>
      <div className="overflow-x-auto mt-6">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600">
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Deadline</th>
              <th className="px-4 py-2 border">Actions</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-300"
              >
                <td className="px-4 py-2 border">{todo.username}</td>
                <td className="px-4 py-2 border">{todo.title}</td>
                <td className="px-4 py-2 border capitalize">{todo.status}</td>
                <td className="px-4 py-2 border">{todo.deadline}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleUpdateClick(todo)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUpdateModal && selectedTodo && (
        <UpdateTodoModal
          onClose={() => setShowUpdateModal(false)}
          onTodoUpdated={onTodosChange}
          todo={selectedTodo}
        />
      )}
    </>
  );
}
