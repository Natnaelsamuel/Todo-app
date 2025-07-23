"use client";
import UsersList from "@/app/components/admin/UsersList";
import React, { useEffect, useState } from "react";

const users = () => {
  const [users, setUsers] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}`);
      const data = await res.json();
      setUsers(data.users);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  return (
    <div className="pt-2 ml-10 flex flex-col gap-4">
      {/* <main
      transition-[margin] duration-300
        className={cn(
          "min-h-screen pt-4 transition-[margin] duration-300 ml-16 flex flex-col gap-4"
        )}
      > */}
      <h2 className="text-2xl text-center font-bold">Hello Admin</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
        <input
          type="text"
          placeholder="Search"
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-4xl w-full sm:w-64 md:w-80 lg:w-96 border shadow-lg dark:border-white"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-2">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <UsersList
          users={filteredUsers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            fetchUsers(page);
          }}
          onUsersChange={fetchUsers}
        />
      )}
      {/* </main> */}
    </div>
  );
};

export default users;
