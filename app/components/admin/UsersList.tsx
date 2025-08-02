// import { User } from "@/app/types/user";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ArrowUpDown } from "lucide-react";
// import { useTheme } from "next-themes";
// import React, { useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import DeleteTodoDialog from "../DeleteTodoDialog";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import UpdateUserModal from "./UpdateUserModal";

// interface UsersListProps {
//   users: User[];
//   onUsersChange: () => void;
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// type SortField = "id" | "name" | "email";
// type SortDirection = "asc" | "desc";
// type GroupByField = "none" | "name" | "role";

// const UsersList = ({
//   users,
//   onUsersChange,
//   currentPage,
//   totalPages,
//   onPageChange,
// }: UsersListProps) => {
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [showUserUpdateModal, setShowUserUpdateModal] = useState(false);
//   const { theme } = useTheme();

//   const [sortField, setSortField] = useState<SortField>("name");
//   const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
//   const [groupBy, setGroupBy] = useState<GroupByField>("none");

//   useEffect(() => {
//     const savedSortField = localStorage.getItem("userSortField");
//     const savedSortDirection = localStorage.getItem("userSortDirection");
//     const savedGroupBy = localStorage.getItem("userGroupBy");

//     if (savedSortField) setSortField(savedSortField as SortField);
//     if (savedSortDirection)
//       setSortDirection(savedSortDirection as SortDirection);
//     if (savedGroupBy) setGroupBy(savedGroupBy as GroupByField);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("userSortField", sortField);
//     localStorage.setItem("userSortDirection", sortDirection);
//     localStorage.setItem("userGroupBy", groupBy);
//   }, [sortField, sortDirection, groupBy]);

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await fetch(`/api/admin/users/${id}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         toast.success("User deleted successfully!", {
//           duration: 3000,
//         });
//         onUsersChange();
//       } else {
//         toast.error("Failed to delete User.", {
//           duration: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Delete User error:", error);
//       toast.error("An error occurred while deleting the User.", {
//         duration: 3000,
//       });
//     }
//   };

//   const handleUpdateClick = (user: User) => {
//     setSelectedUser(user);
//     setShowUserUpdateModal(true);
//   };

//   const sortedUsers = useMemo(() => {
//     return [...users].sort((a, b) => {
//       let comparison = 0;

//       if (sortField === "name" || sortField === "email") {
//         // Handle string fields
//         const fieldA = a[sortField]?.toLowerCase() || "";
//         const fieldB = b[sortField]?.toLowerCase() || "";
//         comparison = fieldA.localeCompare(fieldB);
//       } else if (sortField === "id") {
//         // ID field (assuming string IDs)
//         comparison = a.id.localeCompare(b.id);

//         // If IDs are numeric:
//         // comparison = Number(a.id) - Number(b.id);
//       }
//       //  else if (sortField === "status") {
//       //   // Handle boolean or enum fields
//       //   comparison = String(a[sortField]).localeCompare(String(b[sortField]));
//       // }

//       return sortDirection === "asc" ? comparison : -comparison;
//     });
//   }, [users, sortField, sortDirection]);

//   const groupedUsers = useMemo(() => {
//     if (groupBy === "none") return { none: sortedUsers };

//     return sortedUsers.reduce((acc, user) => {
//       const key = user[groupBy];
//       if (!acc[key]) {
//         acc[key] = [];
//       }
//       acc[key].push(user);
//       return acc;
//     }, {} as Record<string, User[]>);
//   }, [sortedUsers, groupBy]);

//   const toggleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   if (users.length === 0) {
//     return <div className="text-center text-gray-500">No users found.</div>;
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
//               <SelectItem value="name">Name</SelectItem>
//               <SelectItem value="role">Role</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-xl rounded-sm pb-4 dark:shadow-white dark:shadow-md">
//         <Table className="table-auto border border-collapse w-full">
//           <TableHeader>
//             <TableRow className="bg-emerald-100 dark:bg-black hover:bg-emerald-200">
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 <div
//                   className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
//                   onClick={() => toggleSort("id")}
//                 >
//                   ID
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                   {sortField === "id" && (
//                     <span className="ml-1 text-xs">
//                       {sortDirection === "asc" ? "↑" : "↓"}
//                     </span>
//                   )}
//                 </div>
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 <div
//                   className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
//                   onClick={() => toggleSort("name")}
//                 >
//                   Name
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                   {sortField === "name" && (
//                     <span className="ml-1 text-xs">
//                       {sortDirection === "asc" ? "↑" : "↓"}
//                     </span>
//                   )}
//                 </div>
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 <div
//                   className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
//                   onClick={() => toggleSort("email")}
//                 >
//                   Email
//                   <ArrowUpDown className="ml-1 h-4 w-4" />
//                   {sortField === "email" && (
//                     <span className="ml-1 text-xs">
//                       {sortDirection === "asc" ? "↑" : "↓"}
//                     </span>
//                   )}
//                 </div>
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">Role</TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Action
//               </TableHead>
//               <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
//                 Action
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           {Object.entries(groupedUsers).map(([group, groupUsers]) => (
//             <TableBody key={group}>
//               {group !== "none" && (
//                 <TableRow className="bg-gray-200 dark:bg-gray-900">
//                   <TableCell colSpan={6} className="px-2 py-2 font-semibold">
//                     {group}
//                   </TableCell>
//                 </TableRow>
//               )}
//               {groupUsers.map((user) => (
//                 <TableRow
//                   key={user.id}
//                   className="hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   <TableCell className="px-2 py-2">{user.id}</TableCell>
//                   <TableCell className="px-2 py-2">{user.name}</TableCell>
//                   <TableCell className="px-2 py-2">{user.email}</TableCell>
//                   <TableCell className="px-2 py-2">{user.role}</TableCell>
//                   <TableCell className="px-2 py-2">
//                     <Button
//                       onClick={() => handleUpdateClick(user)}
//                       className="cursor-pointer"
//                       variant={theme === "dark" ? "default" : "outline"}
//                       size="xsm"
//                     >
//                       Update
//                     </Button>
//                   </TableCell>
//                   <TableCell className="px-2 py-2">
//                     <DeleteTodoDialog onConfirm={() => handleDelete(user.id)} />
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

//       {showUserUpdateModal && selectedUser && (
//         <UpdateUserModal
//           onClose={() => setShowUserUpdateModal(false)}
//           onUserUpdated={onUsersChange}
//           user={selectedUser}
//         />
//       )}
//     </>
//   );
// };

// export default UsersList;

"use client";
import { User } from "@/app/types/user";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
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
import UpdateUserModal from "./UpdateUserModal";

interface UsersListProps {
  users: User[];
  onUsersChange: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type SortField = "id" | "name" | "email" | "role";
type SortDirection = "asc" | "desc";
type GroupByField = "none" | "name" | "role";

const UsersList = ({
  users,
  onUsersChange,
  currentPage,
  totalPages,
  onPageChange,
}: UsersListProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserUpdateModal, setShowUserUpdateModal] = useState(false);
  const { theme } = useTheme();

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [groupBy, setGroupBy] = useState<GroupByField>("none");

  useEffect(() => {
    const savedSortField = localStorage.getItem("userSortField");
    const savedSortDirection = localStorage.getItem("userSortDirection");
    const savedGroupBy = localStorage.getItem("userGroupBy");

    if (savedSortField) setSortField(savedSortField as SortField);
    if (savedSortDirection)
      setSortDirection(savedSortDirection as SortDirection);
    if (savedGroupBy) setGroupBy(savedGroupBy as GroupByField);
  }, []);

  useEffect(() => {
    localStorage.setItem("userSortField", sortField);
    localStorage.setItem("userSortDirection", sortDirection);
    localStorage.setItem("userGroupBy", groupBy);
  }, [sortField, sortDirection, groupBy]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("User deleted successfully!", {
          duration: 3000,
        });
        onUsersChange();
      } else {
        toast.error("Failed to delete User.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Delete User error:", error);
      toast.error("An error occurred while deleting the User.", {
        duration: 3000,
      });
    }
  };

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
    setShowUserUpdateModal(true);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "user":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "editor":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let comparison = 0;

      if (sortField === "name" || sortField === "email" || sortField === "role") {
        const fieldA = a[sortField]?.toLowerCase() || "";
        const fieldB = b[sortField]?.toLowerCase() || "";
        comparison = fieldA.localeCompare(fieldB);
      } else if (sortField === "id") {
        comparison = a.id.localeCompare(b.id);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [users, sortField, sortDirection]);

  const groupedUsers = useMemo(() => {
    if (groupBy === "none") return { none: sortedUsers };

    return sortedUsers.reduce((acc, user) => {
      const key = user[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(user);
      return acc;
    }, {} as Record<string, User[]>);
  }, [sortedUsers, groupBy]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Group control */}
      <div className="flex justify-end">
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
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="role">Role</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-purple-100 dark:border-gray-700 overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader className="bg-purple-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="px-4 py-3">
                <button
                  onClick={() => toggleSort("id")}
                  className="flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  ID
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "id" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </TableHead>
              <TableHead className="px-4 py-3">
                <button
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "name" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </TableHead>
              <TableHead className="px-4 py-3">
                <button
                  onClick={() => toggleSort("email")}
                  className="flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Email
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "email" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </TableHead>
              <TableHead className="px-4 py-3">
                <button
                  onClick={() => toggleSort("role")}
                  className="flex items-center gap-1 font-medium text-purple-800 dark:text-purple-200 hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Role
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "role" && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </TableHead>
              <TableHead className="px-4 py-3 font-medium text-purple-800 dark:text-purple-200">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(groupedUsers).map(([group, groupUsers]) => (
              <React.Fragment key={group}>
                {groupBy !== "none" && (
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableCell colSpan={5} className="px-4 py-2 font-medium">
                      {group.charAt(0).toUpperCase() + group.slice(1)}
                    </TableCell>
                  </TableRow>
                )}
                {groupUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell className="px-4 py-3 font-medium">
                      {user.id}
                    </TableCell>
                    <TableCell className="px-4 py-3">{user.name}</TableCell>
                    <TableCell className="px-4 py-3">{user.email}</TableCell>
                    <TableCell className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 flex gap-2">
                      <Button
                        onClick={() => handleUpdateClick(user)}
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-200 dark:hover:bg-purple-800"
                      >
                        Update
                      </Button>
                      <DeleteTodoDialog 
                        onConfirm={() => handleDelete(user.id)}
                      />
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

      {/* Update Modal */}
      {showUserUpdateModal && selectedUser && (
        <UpdateUserModal
          onClose={() => setShowUserUpdateModal(false)}
          onUserUpdated={onUsersChange}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default UsersList;