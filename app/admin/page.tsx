// export default async function AdminPage() {
//   return (
//     // <div>
//     //   {/* <main
//     //     className={cn(
//     //       "min-h-screen pt-4 transition-[margin] duration-300 ml-16"
//     //     )}
//     //   > */}
//     //   {/* </main> */}
//     // </div>
    
//   );
// }

// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { TodoChart } from "../components/admin/TodoChart";
// import { useEffect, useState } from "react";

// interface DashboardStats {
//   users: {
//     totalUsers: number;
//     newUsersThisWeek: number;
//     growthPercentage: string;
//   };
//   todos: {
//     pending: number;
//     in_progress: number;
//     completed: number;
//     totalTodos: number;
//     completionPercentage: string;
//   };
//   trends: Array<{
//     name: string;
//     completed: number;
//     in_progress: number;
//     pending: number;
//   }>;
// }

// export default function DashboardPage() {
//   const [stats, setStats] = useState<DashboardStats>({
//     users: { totalUsers: 0, newUsersThisWeek: 0, growthPercentage: "0" },
//     todos: { pending: 0, in_progress: 0, completed: 0, totalTodos: 0, completionPercentage: "0" },
//     trends: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/admin/stats');
//         if (!response.ok) {
//           throw new Error('Failed to fetch stats');
//         }
//         const data = await response.json();
//         setStats(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-64 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="flex flex-col ml-10">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
//         <p className="text-muted-foreground">
//           Overview of your todo application
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
//         {/* Total Users Card */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//               <circle cx="9" cy="7" r="4" />
//               <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.users.totalUsers}</div>
//             <p className="text-xs text-muted-foreground">
//               +{stats.users.growthPercentage}% from last week
//             </p>
//           </CardContent>
//         </Card>

//         {/* Completed Todos Card */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Completed</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.todos.completed}</div>
//             <p className="text-xs text-muted-foreground">
//               {stats.todos.completionPercentage}% completion rate
//             </p>
//           </CardContent>
//         </Card>

//         {/* In Progress Card */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">In Progress</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <path d="M12 6v6l4 2" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.todos.in_progress}</div>
//             <p className="text-xs text-muted-foreground">
//               {Math.round((stats.todos.in_progress / stats.todos.totalTodos) * 100)}% of total
//             </p>
//           </CardContent>
//         </Card>

//         {/* Pending Card */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.todos.pending}</div>
//             <p className="text-xs text-muted-foreground">
//               {Math.round((stats.todos.pending / stats.todos.totalTodos) * 100)}% of total
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Graph Section */}
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Todo Status Overview</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <TodoChart 
//             barData={stats.trends} 
//             pieData={[
//               { name: "Completed", value: stats.todos.completed },
//               { name: "In Progress", value: stats.todos.in_progress },
//               { name: "Pending", value: stats.todos.pending }
//             ]} 
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TodoChart } from "../components/admin/TodoChart";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Users, CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";

interface DashboardStats {
  users: {
    totalUsers: number;
    newUsersThisWeek: number;
    growthPercentage: string;
  };
  todos: {
    pending: number;
    in_progress: number;
    completed: number;
    totalTodos: number;
    completionPercentage: string;
  };
  trends: Array<{
    name: string;
    completed: number;
    in_progress: number;
    pending: number;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    users: { totalUsers: 0, newUsersThisWeek: 0, growthPercentage: "0" },
    todos: { pending: 0, in_progress: 0, completed: 0, totalTodos: 0, completionPercentage: "0" },
    trends: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-8 ml-10">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
        </div>
        
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 ml-10">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold">Error loading dashboard</h2>
        <p className="text-muted-foreground max-w-md text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 ml-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Insights and analytics for your todo application
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.totalUsers}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span>+{stats.users.growthPercentage}% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <div className="bg-green-500/10 p-2 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todos.completed}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.todos.completionPercentage}% completion rate
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <div className="bg-yellow-500/10 p-2 rounded-lg">
              <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todos.in_progress}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.todos.in_progress / stats.todos.totalTodos) * 100)}% of total
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <div className="bg-orange-500/10 p-2 rounded-lg">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todos.pending}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.todos.pending / stats.todos.totalTodos) * 100)}% of total
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Todo Analytics</h2>
        <Card className="w-full p-6 hover:shadow-md transition-shadow">
          <TodoChart 
            barData={stats.trends} 
            pieData={[
              { name: "Completed", value: stats.todos.completed },
              { name: "In Progress", value: stats.todos.in_progress },
              { name: "Pending", value: stats.todos.pending }
            ]} 
          />
        </Card>
      </div>
    </div>
  );
}