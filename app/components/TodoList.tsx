// import { useState } from "react";
// import toast from "react-hot-toast";
// import UpdateTodoModal from "./UpdateTodoModal";
// import { Todo } from "../types/todo";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import DeleteTodoDialog from "./DeleteTodoDialog";
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

// interface TodoListProps {
//   todos: Todo[];
//   onTodosChange: () => void;
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export default function TodoList({
//   todos,
//   onTodosChange,
//   currentPage,
//   totalPages,
//   onPageChange,
// }: TodoListProps) {
//   const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const { theme } = useTheme();

//   const handleDelete = async (id: string) => {
//     // if (!confirm("Are you sure you want to delete this todo?")) return;

//     try {
//       const res = await fetch(`/api/todos/${id}`, {
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

//   const handleUpdateClick = (todo: Todo) => {
//     setSelectedTodo(todo);
//     setShowUpdateModal(true);
//   };

//   const getStatusBg = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-stone-200 dark:bg-stone-600";
//       case "in-progress":
//         return "bg-blue-200 dark:bg-blue-400";
//       case "completed":
//         return "bg-green-300 dark:bg-green-500";
//       default:
//         return "";
//     }
//   };

//   if (todos.length === 0)
//     return <div className="text-center text-gray-500">No todos found.</div>;

//   return (
//     <>
//       <div className="overflow-x-auto mt-6 shadow-xl rounded-sm pb-4 dark:shadow-white dark:shadow-md">
//         <Table className="table-auto border border-collapse w-full">
//           <TableHeader>
//             <TableRow className="bg-gray-100 dark:bg-black">
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Username
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Title
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Status
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Deadline
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Action
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Action
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {todos.map((todo) => (
//               <TableRow key={todo.id} className={`${getStatusBg(todo.status)}`}>
//                 <TableCell className="px-2 py-2">{todo.username}</TableCell>
//                 <TableCell className="px-2 py-2 ">{todo.title}</TableCell>
//                 <TableCell className="px-2 py-2 capitalize">
//                   {todo.status}
//                 </TableCell>
//                 <TableCell className="px-2 py-2">{todo.deadline}</TableCell>
//                 <TableCell className="px-2 py-2">
//                   <Button
//                     onClick={() => handleUpdateClick(todo)}
//                     className="cursor-pointer"
//                     variant={theme === "dark" ? "default" : "outline"}
//                     size="xsm"
//                   >
//                     Update
//                   </Button>
//                 </TableCell>
//                 <TableCell className="px-2 py-2">
//                   <DeleteTodoDialog onConfirm={() => handleDelete(todo.id)} />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
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

//         {/* <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
//           <thead>
//             <tr className="bg-gray-200 dark:bg-gray-600">
//               <th className="px-4 py-2 border">Username</th>
//               <th className="px-4 py-2 border">Title</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Deadline</th>
//               <th className="px-4 py-2 border">Actions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todos.map((todo) => (
//               <tr
//                 key={todo.id}
//                 className="hover:bg-gray-100 dark:hover:bg-gray-300"
//               >
//                 <td className="px-4 py-2 border">{todo.username}</td>
//                 <td className="px-4 py-2 border">{todo.title}</td>
//                 <td className="px-4 py-2 border capitalize">{todo.status}</td>
//                 <td className="px-4 py-2 border">{todo.deadline}</td>
//                 <td className="px-4 py-2 border text-center">
//                   <button
//                     className="btn btn-sm btn-info"
//                     onClick={() => handleUpdateClick(todo)}
//                   >
//                     Update
//                   </button>
//                   <Button
//                     onClick={() => handleUpdateClick(todo)}
//                     className="cursor-pointer"
//                     variant="outline"
//                   >
//                     Update
//                   </Button>
//                 </td>
//                 <td className="px-4 py-2 border text-center">
//                   <button
//                     className="btn btn-sm btn-error"
//                     onClick={() => handleDelete(todo.id)}
//                   >
//                     Delete
//                   </button>
//                   <Button
//                     onClick={() => handleDelete(todo.id)}
//                     className="cursor-pointer"
//                     variant="destructive"
//                   >
//                     Delete
//                   </Button>
//                   <DeleteTodoDialog onConfirm={() => handleDelete(todo.id)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table> */}
//       </div>
//       {showUpdateModal && selectedTodo && (
//         <UpdateTodoModal
//           onClose={() => setShowUpdateModal(false)}
//           onTodoUpdated={onTodosChange}
//           todo={selectedTodo}
//         />
//       )}
//     </>
//   );
// }

// "use client";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import UpdateTodoModal from "./UpdateTodoModal";
// import { Todo } from "../types/todo";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import DeleteTodoDialog from "./DeleteTodoDialog";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   ColumnDef,
//   flexRender,
//   ColumnFiltersState,
//   SortingState,
// } from '@tanstack/react-table';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { ChevronDown, ChevronUp } from "lucide-react";

// interface TodoListProps {
//   todos: Todo[];
//   onTodosChange: () => void;
// }

// export default function TodoList({ todos, onTodosChange }: TodoListProps) {
//   const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const { theme } = useTheme();

//   const columns: ColumnDef<Todo>[] = [
//     {
//       accessorKey: "username",
//       header: "Username",
//       cell: info => info.getValue(),
//     },
//     {
//       accessorKey: "title",
//       header: ({ column }) => (
//         <button
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="flex items-center gap-1"
//         >
//           Title
//           {column.getIsSorted() === "asc" ? (
//             <ChevronUp className="h-4 w-4" />
//           ) : column.getIsSorted() === "desc" ? (
//             <ChevronDown className="h-4 w-4" />
//           ) : null}
//         </button>
//       ),
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: info => (
//         <span className={`px-2 py-1 rounded-full text-xs capitalize ${
//           info.getValue() === 'completed' ? 'bg-green-300 dark:bg-green-500' :
//           info.getValue() === 'in-progress' ? 'bg-blue-200 dark:bg-blue-400' :
//           'bg-stone-200 dark:bg-stone-600'
//         }`}>
//           {info.getValue() as string}
//         </span>
//       ),
//     },
//     {
//       accessorKey: "deadline",
//       header: ({ column }) => (
//         <button
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="flex items-center gap-1"
//         >
//           Deadline
//           {column.getIsSorted() === "asc" ? (
//             <ChevronUp className="h-4 w-4" />
//           ) : column.getIsSorted() === "desc" ? (
//             <ChevronDown className="h-4 w-4" />
//           ) : null}
//         </button>
//       ),
//     },
//     {
//       id: "update",
//       header: "Action",
//       cell: ({ row }) => (
//         <Button
//           onClick={() => handleUpdateClick(row.original)}
//           variant={theme === "dark" ? "default" : "outline"}
//           size="sm"
//         >
//           Update
//         </Button>
//       ),
//     },
//     {
//       id: "delete",
//       header: "Action",
//       cell: ({ row }) => (
//         <DeleteTodoDialog onConfirm={() => handleDelete(row.original.id)} />
//       ),
//     },
//   ];

//   const table = useReactTable({
//     data: todos,
//     columns,
//     state: {
//       columnFilters,
//       sorting,
//     },
//     onColumnFiltersChange: setColumnFilters,
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: {
//         pageSize: 5, // Default page size
//       },
//     },
//   });

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await fetch(`/api/todos/${id}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         toast.success("Todo deleted successfully!", { duration: 3000 });
//         onTodosChange();
//       } else {
//         toast.error("Failed to delete todo.", { duration: 3000 });
//       }
//     } catch (error) {
//       console.error("Delete todo error:", error);
//       toast.error("An error occurred while deleting the todo.", { duration: 3000 });
//     }
//   };

//   const handleUpdateClick = (todo: Todo) => {
//     setSelectedTodo(todo);
//     setShowUpdateModal(true);
//   };

//   return (
//     <>
//       <div className="space-y-4">
//         {/* Filter Controls */}
//         <div className="flex items-center gap-4">
//           <Input
//             placeholder="Filter tasks..."
//             value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
//             onChange={event =>
//               table.getColumn('title')?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//           <Input
//             placeholder="Filter by username..."
//             value={(table.getColumn('username')?.getFilterValue() as string) ?? ''}
//             onChange={event =>
//               table.getColumn('username')?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         </div>

//         {/* Table */}
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map(headerGroup => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
//                     <TableHead key={header.id}>
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map(row => (
//                   <TableRow key={row.id}>
//                     {row.getVisibleCells().map(cell => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-muted-foreground">
//             Page {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Next
//             </Button>
//             <select
//               value={table.getState().pagination.pageSize}
//               onChange={e => {
//                 table.setPageSize(Number(e.target.value));
//               }}
//               className="border rounded p-1 text-sm"
//             >
//               {[5, 10, 20, 30, 40, 50].map(pageSize => (
//                 <option key={pageSize} value={pageSize}>
//                   Show {pageSize}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {showUpdateModal && selectedTodo && (
//         <UpdateTodoModal
//           onClose={() => setShowUpdateModal(false)}
//           onTodoUpdated={onTodosChange}
//           todo={selectedTodo}
//         />
//       )}
//     </>
//   );
// }

import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import UpdateTodoModal from "./UpdateTodoModal";
import { Todo } from "../types/todo";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  onTodosChange: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type SortField = "title" | "status" | "deadline";
type SortDirection = "asc" | "desc";
type GroupByField = "none" | "status" | "deadline";

export default function TodoList({
  todos,
  onTodosChange,
  currentPage,
  totalPages,
  onPageChange,
}: TodoListProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-stone-400 dark:bg-stone-600";
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
        // For dates, convert to timestamps for comparison
        const dateA = new Date(a.deadline).getTime();
        const dateB = new Date(b.deadline).getTime();
        comparison = dateA - dateB;
      } else {
        // For strings
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
    return <div className="text-center text-gray-500">No todos found.</div>;
  }

  return (
    <>
      {/* Group control */}
      <div className="flex justify-end mb-4">
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
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-xl rounded-sm pb-4 dark:shadow-white dark:shadow-md">
        <Table className="table-auto border border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-black">
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                <div
                  className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => toggleSort("title")}
                >
                  Title
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                  {sortField === "title" && (
                    <span className="ml-1 text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                <div
                  className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => toggleSort("status")}
                >
                  Status
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                  {sortField === "status" && (
                    <span className="ml-1 text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                <div
                  className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => toggleSort("deadline")}
                >
                  Deadline
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                  {sortField === "deadline" && (
                    <span className="ml-1 text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                Action
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          {Object.entries(groupedTodos).map(([group, groupTodos]) => (
            <TableBody key={group}>
              {groupBy !== "none" && (
                <TableRow className="bg-gray-200 dark:bg-gray-800">
                  <TableCell colSpan={6} className="font-bold">
                    {groupBy === "deadline"
                      ? new Date(group).toLocaleDateString()
                      : group}
                  </TableCell>
                </TableRow>
              )}
              {groupTodos.map((todo) => (
                <TableRow
                  key={todo.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-2 py-2">{todo.title}</TableCell>
                  <TableCell className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          todo.status
                        )}`}
                      />
                      <span className="capitalize">{todo.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    {new Date(todo.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <Button
                      onClick={() => handleUpdateClick(todo)}
                      className="cursor-pointer"
                      variant={theme === "dark" ? "default" : "outline"}
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
          ))}
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
