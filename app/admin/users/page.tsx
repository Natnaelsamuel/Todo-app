// "use client";
// import UsersList from "@/app/components/admin/UsersList";
// import React, { useEffect, useState } from "react";

// const users = () => {
//   const [users, setUsers] = useState([]);
//   const [userSearchQuery, setUserSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     fetchUsers(currentPage);
//   }, [currentPage]);

//   const fetchUsers = async (page = 1) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}`);
//       const data = await res.json();
//       setUsers(data.users);
//       setCurrentPage(data.currentPage);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredUsers = users.filter(
//     (user: any) =>
//       user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
//   );

//   return (
//     <div className="pt-2 ml-10 flex flex-col gap-4">
//       {/* <main
//       transition-[margin] duration-300
//         className={cn(
//           "min-h-screen pt-4 transition-[margin] duration-300 ml-16 flex flex-col gap-4"
//         )}
//       > */}
//       <h2 className="text-2xl text-center font-bold">Hello Admin</h2>
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
//         <input
//           type="text"
//           placeholder="Search"
//           value={userSearchQuery}
//           onChange={(e) => setUserSearchQuery(e.target.value)}
//           className="px-4 py-2 rounded-4xl w-full sm:w-64 md:w-80 lg:w-96 border shadow-lg dark:border-white"
//         />
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center py-2">
//           <span className="loading loading-dots loading-lg"></span>
//         </div>
//       ) : (
//         <UsersList
//           users={filteredUsers}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => {
//             setCurrentPage(page);
//             fetchUsers(page);
//           }}
//           onUsersChange={fetchUsers}
//         />
//       )}
//       {/* </main> */}
//     </div>
//   );
// };

// export default users;


"use client";
import UsersList from "@/app/components/admin/UsersList";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
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
    <div className="min-h-screen p-14 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-800">User Management</h1>
        <p className="text-purple-600">Admin dashboard for user accounts</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg border p-1 border-purple-100 dark:bg-gray-900">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
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
      </div>
    </div>
  );
};

export default UsersPage;