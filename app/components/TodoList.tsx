import { useState } from "react";
import toast from "react-hot-toast";
import UpdateTodoModal from "./UpdateTodoModal";
import { Todo } from "../types/todo";
import { Button } from "@/components/ui/button";
import DeleteTodoDialog from "./DeleteTodoDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface TodoListProps {
  todos: Todo[];
  onTodosChange: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TodoList({
  todos,
  onTodosChange,
  currentPage,
  totalPages,
  onPageChange,
}: TodoListProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = async (id: string) => {
    // if (!confirm("Are you sure you want to delete this todo?")) return;

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

  const getStatusBg = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-stone-200 dark:bg-yellow-600";
      case "in-progress":
        return "bg-blue-200 dark:bg-blue-600";
      case "completed":
        return "bg-green-300 dark:bg-green-600";
      default:
        return "";
    }
  };

  if (todos.length === 0)
    return <div className="text-center text-gray-500">No todos found.</div>;

  return (
    <>
      <div className="overflow-x-auto mt-6 shadow-xl rounded-sm pb-4">
        <Table className="table-auto border border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-700">
              <TableHead className="px-2 py-2 font-bold text-gray-700">
                Username
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700">
                Title
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700">
                Status
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700">
                Deadline
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700">
                Action
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id} className={`${getStatusBg(todo.status)}`}>
                <TableCell className="px-2 py-2">{todo.username}</TableCell>
                <TableCell className="px-2 py-2 ">{todo.title}</TableCell>
                <TableCell className="px-2 py-2 capitalize">
                  {todo.status}
                </TableCell>
                <TableCell className="px-2 py-2">{todo.deadline}</TableCell>
                <TableCell className="px-2 py-2">
                  <Button
                    onClick={() => handleUpdateClick(todo)}
                    className="cursor-pointer"
                    variant="outline"
                    size="xsm"
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell className="px-2 py-2">
                  <DeleteTodoDialog onConfirm={() => handleDelete(todo.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isEllipsisBefore = page === currentPage - 2 && page > 2;
              const isEllipsisAfter =
                page === currentPage + 2 && page < totalPages - 1;

              if (isEllipsisBefore || isEllipsisAfter) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
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
                  <Button
                    onClick={() => handleUpdateClick(todo)}
                    className="cursor-pointer"
                    variant="outline"
                  >
                    Update
                  </Button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                  <Button
                    onClick={() => handleDelete(todo.id)}
                    className="cursor-pointer"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                  <DeleteTodoDialog onConfirm={() => handleDelete(todo.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
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
