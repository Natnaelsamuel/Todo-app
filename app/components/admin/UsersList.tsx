import { User } from "@/app/types/user";
import { Button } from "@/components/ui/button";
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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import UpdateUserModal from "./UpdateUserModal";

interface UsersListProps {
  users: User[];
  onUsersChange: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type SortField = "id" | "name" | "email";
type SortDirection = "asc" | "desc";
type GroupByField = "none" | "name";

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

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let comparison = 0;

      if (sortField === "name" || sortField === "email") {
        // Handle string fields
        const fieldA = a[sortField]?.toLowerCase() || "";
        const fieldB = b[sortField]?.toLowerCase() || "";
        comparison = fieldA.localeCompare(fieldB);
      } else if (sortField === "id") {
        // ID field (assuming string IDs)
        comparison = a.id.localeCompare(b.id);

        // If IDs are numeric:
        // comparison = Number(a.id) - Number(b.id);
      }
      //  else if (sortField === "status") {
      //   // Handle boolean or enum fields
      //   comparison = String(a[sortField]).localeCompare(String(b[sortField]));
      // }

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
    return <div className="text-center text-gray-500">No users found.</div>;
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
              <SelectItem value="name">Status</SelectItem>
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
                  onClick={() => toggleSort("id")}
                >
                  ID
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                  {sortField === "id" && (
                    <span className="ml-1 text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                <div
                  className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => toggleSort("name")}
                >
                  Name
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                  {sortField === "name" && (
                    <span className="ml-1 text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                <div
                  className="flex items-center cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                  onClick={() => toggleSort("email")}
                >
                  Email
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                  {sortField === "email" && (
                    <span className="ml-1 text-xs">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">Role</TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                Action
              </TableHead>
              <TableHead className="px-2 py-2 font-bold text-gray-700 dark:text-gray-400">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          {Object.entries(groupedUsers).map(([group, groupUsers]) => (
            <TableBody key={group}>
              {group !== "none" && (
                <TableRow className="bg-gray-200 dark:bg-gray-900">
                  <TableCell colSpan={6} className="px-2 py-2 font-semibold">
                    {group}
                  </TableCell>
                </TableRow>
              )}
              {groupUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-2 py-2">{user.id}</TableCell>
                  <TableCell className="px-2 py-2">{user.name}</TableCell>
                  <TableCell className="px-2 py-2">{user.email}</TableCell>
                  <TableCell className="px-2 py-2">{user.role}</TableCell>
                  <TableCell className="px-2 py-2">
                    <Button
                      onClick={() => handleUpdateClick(user)}
                      className="cursor-pointer"
                      variant={theme === "dark" ? "default" : "outline"}
                      size="xsm"
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <DeleteTodoDialog onConfirm={() => handleDelete(user.id)} />
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

      {showUserUpdateModal && selectedUser && (
        <UpdateUserModal
          onClose={() => setShowUserUpdateModal(false)}
          onUserUpdated={onUsersChange}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default UsersList;
