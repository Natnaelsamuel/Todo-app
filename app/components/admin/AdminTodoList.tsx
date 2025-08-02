// import { useState, useMemo, useEffect } from "react";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationPrevious,
//   PaginationNext,
//   PaginationLink,
//   PaginationEllipsis,
// } from "@/components/ui/pagination";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { ArrowUpDown } from "lucide-react";
// import { Todo } from "@/app/types/todo";
// import DeleteTodoDialog from "../DeleteTodoDialog";

// interface TodoListProps {
//   todos: Todo[];
//   onTodosChange: () => void;
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// type SortField = "title" | "status" | "deadline";
// type SortDirection = "asc" | "desc";
// type GroupByField = "none" | "status" | "deadline" | "userId";

// const AdminTodoList = ({todos,
//   onTodosChange,
//   currentPage,
//   totalPages,
//   onPageChange,
// }: TodoListProps) => {
// //    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
// //   const [showUpdateModal, setShowUpdateModal] = useState(false);
// //   const { theme } = useTheme();

//   // State for sorting/grouping with localStorage persistence
//   const [sortField, setSortField] = useState<SortField>("title");
//   const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
//   const [groupBy, setGroupBy] = useState<GroupByField>("none");

//   // Load saved settings from localStorage
//   useEffect(() => {
//     const savedSortField = localStorage.getItem("todoSortField");
//     const savedSortDirection = localStorage.getItem("todoSortDirection");
//     const savedGroupBy = localStorage.getItem("todoGroupBy");

//     if (savedSortField) setSortField(savedSortField as SortField);
//     if (savedSortDirection)
//       setSortDirection(savedSortDirection as SortDirection);
//     if (savedGroupBy) setGroupBy(savedGroupBy as GroupByField);
//   }, []);

//   // Save settings to localStorage when they change
//   useEffect(() => {
//     localStorage.setItem("todoSortField", sortField);
//     localStorage.setItem("todoSortDirection", sortDirection);
//     localStorage.setItem("todoGroupBy", groupBy);
//   }, [sortField, sortDirection, groupBy]);

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await fetch(`/api/admin/todos/${id}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         toast.success("Todo deleted successfully!", {
//           duration: 3000,
//         });
//         onTodosChange();
//       } else {
//         toast.error("Failed to delete todo.", {
//           duration: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Delete todo error:", error);
//       toast.error("An error occurred while deleting the todo.", {
//         duration: 3000,
//       });
//     }
//   };

// //   const handleUpdateClick = (todo: Todo) => {
// //     setSelectedTodo(todo);
// //     setShowUpdateModal(true);
// //   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-stone-400 dark:bg-stone-600";
//       case "in-progress":
//         return "bg-blue-400 dark:bg-blue-600";
//       case "completed":
//         return "bg-green-400 dark:bg-green-600";
//       default:
//         return "bg-gray-400 dark:bg-gray-600";
//     }
//   };

//   // Apply sorting
//   const sortedTodos = useMemo(() => {
//     return [...todos].sort((a, b) => {
//       let comparison = 0;

//       if (sortField === "deadline") {
//         // For dates, convert to timestamps for comparison
//         const dateA = new Date(a.deadline).getTime();
//         const dateB = new Date(b.deadline).getTime();
//         comparison = dateA - dateB;
//       } else {
//         // For strings
//         const fieldA = a[sortField].toLowerCase();
//         const fieldB = b[sortField].toLowerCase();
//         comparison = fieldA.localeCompare(fieldB);
//       }

//       return sortDirection === "asc" ? comparison : -comparison;
//     });
//   }, [todos, sortField, sortDirection]);

//   // Group todos if needed
//   const groupedTodos = useMemo(() => {
//     if (groupBy === "none") return { none: sortedTodos };

//     return sortedTodos.reduce((acc, todo) => {
//       const key = todo[groupBy];
//       if (!acc[key]) {
//         acc[key] = [];
//       }
//       acc[key].push(todo);
//       return acc;
//     }, {} as Record<string, Todo[]>);
//   }, [sortedTodos, groupBy]);

//   const toggleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   if (todos.length === 0) {
//     return <div className="text-center text-gray-500">No todos found.</div>;
//   }

//   return (
//     <>
//       {/* Group control */}
//       <div className="flex justify-end mb-4">
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium">Group By:</span>
//           <Select
//             value={groupBy}
//             onValueChange={(v) => setGroupBy(v as GroupByField)}
//           >
//             <SelectTrigger className="w-[120px]">
//               <SelectValue placeholder="Group by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="none">None</SelectItem>
//               <SelectItem value="status">Status</SelectItem>
//               <SelectItem value="deadline">Deadline</SelectItem>
//               <SelectItem value="userId">UserId</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-xl rounded-sm pb-4 dark:shadow-white dark:shadow-md">
//         <Table className="table-auto border border-collapse w-full">
//           <TableHeader>
//             <TableRow className="bg-gray-100 dark:bg-black">
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 <div
//                   className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
//                   onClick={() => toggleSort("title")}
//                 >
//                   Title
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                   {sortField === "title" && (
//                     <span className="ml-1 text-xs">
//                       {sortDirection === "asc" ? "↑" : "↓"}
//                     </span>
//                   )}
//                 </div>
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 <div
//                   className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
//                   onClick={() => toggleSort("status")}
//                 >
//                   Status
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                   {sortField === "status" && (
//                     <span className="ml-1 text-xs">
//                       {sortDirection === "asc" ? "↑" : "↓"}
//                     </span>
//                   )}
//                 </div>
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 <div
//                   className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
//                   onClick={() => toggleSort("deadline")}
//                 >
//                   Deadline
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                   {sortField === "deadline" && (
//                     <span className="ml-1 text-xs">
//                       {sortDirection === "asc" ? "↑" : "↓"}
//                     </span>
//                   )}
//                 </div>
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 UserId
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Action
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           {Object.entries(groupedTodos).map(([group, groupTodos]) => (
//             <TableBody key={group}>
//               {groupBy !== "none" && (
//                 <TableRow className="bg-gray-200 dark:bg-gray-800">
//                   <TableCell colSpan={6} className="font-bold">
//                     {groupBy === "deadline"
//                       ? new Date(group).toLocaleDateString()
//                       : group}
//                   </TableCell>
//                 </TableRow>
//               )}
//               {groupTodos.map((todo) => (
//                 <TableRow
//                   key={todo.id}
//                   className="hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   <TableCell className="px-2 py-2">{todo.title}</TableCell>
//                   <TableCell className="px-2 py-2">
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`w-3 h-3 rounded-full ${getStatusColor(
//                           todo.status
//                         )}`}
//                       />
//                       <span className="capitalize">{todo.status}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-2 py-2">
//                     {new Date(todo.deadline).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell className="px-2 py-2">
//                     {/* <Button
//                       onClick={() => handleUpdateClick(todo)}
//                       className="cursor-pointer"
//                       variant={theme === "dark" ? "default" : "outline"}
//                       size="xsm"
//                     >
//                       Update
//                     </Button> */}
//                     {todo.userId}
//                   </TableCell>
//                   <TableCell className="px-2 py-2">
//                     <DeleteTodoDialog onConfirm={() => handleDelete(todo.id)} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           ))}
//         </Table>

//         <Pagination className="mt-4">
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={() => onPageChange(currentPage - 1)}
//                 className={
//                   currentPage === 1 ? "pointer-events-none opacity-50" : ""
//                 }
//               />
//             </PaginationItem>

//             {Array.from({ length: totalPages }).map((_, i) => {
//               const page = i + 1;
//               const isEllipsisBefore = page === currentPage - 2 && page > 2;
//               const isEllipsisAfter =
//                 page === currentPage + 2 && page < totalPages - 1;

//               if (isEllipsisBefore || isEllipsisAfter) {
//                 return (
//                   <PaginationItem key={`ellipsis-${page}`}>
//                     <PaginationEllipsis />
//                   </PaginationItem>
//                 );
//               }

//               if (
//                 page === 1 ||
//                 page === totalPages ||
//                 (page >= currentPage - 1 && page <= currentPage + 1)
//               ) {
//                 return (
//                   <PaginationItem key={page}>
//                     <PaginationLink
//                       href="#"
//                       isActive={page === currentPage}
//                       onClick={() => onPageChange(page)}
//                     >
//                       {page}
//                     </PaginationLink>
//                   </PaginationItem>
//                 );
//               }

//               return null;
//             })}

//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={() => onPageChange(currentPage + 1)}
//                 className={
//                   currentPage === totalPages
//                     ? "pointer-events-none opacity-50"
//                     : ""
//                 }
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>

//       {/* {showUpdateModal && selectedTodo && (
//         <UpdateTodoModal
//           onClose={() => setShowUpdateModal(false)}
//           onTodoUpdated={onTodosChange}
//           todo={selectedTodo}
//         />
//       )} */}
//     </>
//   );
// }

// export default AdminTodoList

"use client";
import { Todo } from "@/app/types/todo";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import DeleteTodoDialog from "../DeleteTodoDialog";

interface TodoListProps {
  todos: Todo[];
  onTodosChange: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type SortField = "title" | "status" | "deadline";
type SortDirection = "asc" | "desc";
type GroupByField = "none" | "status" | "deadline" | "userId";

const AdminTodoList = ({
  todos,
  onTodosChange,
  currentPage,
  totalPages,
  onPageChange,
}: TodoListProps) => {
  const { theme } = useTheme();

  // State for sorting/grouping with localStorage persistence
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [groupBy, setGroupBy] = useState<GroupByField>("none");

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSortField = localStorage.getItem("todoSortField");
    const savedSortDirection = localStorage.getItem("todoSortDirection");
    const savedGroupBy = localStorage.getItem("todoGroupBy");

    if (savedSortField) setSortField(savedSortField as SortField);
    if (savedSortDirection)
      setSortDirection(savedSortDirection as SortDirection);
    if (savedGroupBy) setGroupBy(savedGroupBy as GroupByField);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("todoSortField", sortField);
    localStorage.setItem("todoSortDirection", sortDirection);
    localStorage.setItem("todoGroupBy", groupBy);
  }, [sortField, sortDirection, groupBy]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/todos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Todo deleted successfully!", {
          duration: 3000,
          position: "top-center",
        });
        onTodosChange();
      } else {
        toast.error("Failed to delete todo.", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Delete todo error:", error);
      toast.error("An error occurred while deleting the todo.", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-400 dark:bg-amber-600";
      case "in_progress":
        return "bg-blue-400 dark:bg-blue-600";
      case "completed":
        return "bg-green-400 dark:bg-green-600";
      default:
        return "bg-gray-400 dark:bg-gray-600";
    }
  };

  // Apply sorting
  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      let comparison = 0;

      if (sortField === "deadline") {
        const dateA = new Date(a.deadline).getTime();
        const dateB = new Date(b.deadline).getTime();
        comparison = dateA - dateB;
      } else {
        const fieldA = a[sortField].toLowerCase();
        const fieldB = b[sortField].toLowerCase();
        comparison = fieldA.localeCompare(fieldB);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [todos, sortField, sortDirection]);

  // Group todos if needed
  const groupedTodos = useMemo(() => {
    if (groupBy === "none") return { none: sortedTodos };

    return sortedTodos.reduce((acc, todo) => {
      const key = todo[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(todo);
      return acc;
    }, {} as Record<string, Todo[]>);
  }, [sortedTodos, groupBy]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No todos found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Group By:</span>
          <Select
            value={groupBy}
            onValueChange={(v) => setGroupBy(v as GroupByField)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="userId">User ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader className={`bg-purple-50 dark:bg-gray-800`}>
            <TableRow>
              <TableHead className="px-4 py-3">
                <button
                  onClick={() => toggleSort("title")}
                  className="flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Title
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "title" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </TableHead>
              <TableHead className="px-4 py-3">
                <button
                  onClick={() => toggleSort("status")}
                  className="flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "status" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </TableHead>
              <TableHead className="px-4 py-3">
                <button
                  onClick={() => toggleSort("deadline")}
                  className="flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Deadline
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "deadline" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </TableHead>
              <TableHead className="px-4 py-3 font-medium text-purple-800 dark:text-purple-200">
                User ID
              </TableHead>
              <TableHead className="px-4 py-3 font-medium text-purple-800 dark:text-purple-200">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(groupedTodos).map(([group, groupTodos]) => (
              <React.Fragment key={group}>
                {groupBy !== "none" && (
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell colSpan={5} className="px-4 py-2 font-medium">
                      {groupBy === "deadline"
                        ? new Date(group).toLocaleDateString()
                        : groupBy === "status"
                        ? group.charAt(0).toUpperCase() + group.slice(1).replace("_", " ")
                        : group}
                    </TableCell>
                  </TableRow>
                )}
                {groupTodos.map((todo) => (
                  <TableRow
                    key={todo.id}
                    className="hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium">{todo.title}</div>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${getStatusColor(
                            todo.status
                          )}`}
                        />
                        <span className="capitalize">
                          {todo.status.replace("_", " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {new Date(todo.deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {todo.userId}
                    </TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      <DeleteTodoDialog onConfirm={() => handleDelete(todo.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="mt-6">
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
                currentPage === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminTodoList;