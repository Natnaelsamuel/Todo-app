// 'use client';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { TodoChart } from "../components/admin/TodoChart";
// import { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { TrendingUp, Users, CheckCircle, Clock, AlertCircle, Loader2, Calendar as CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";
// import { format, subDays } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

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
//   const [dateRange, setDateRange] = useState<DateRange | undefined>({
//     from: subDays(new Date(), 30),
//     to: new Date(),
//   });

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
//       if (dateRange?.from) params.append('startDate', format(dateRange.from, 'yyyy-MM-dd'));
//       if (dateRange?.to) params.append('endDate', format(dateRange.to, 'yyyy-MM-dd'));

//       const response = await fetch(`/api/admin/stats?${params.toString()}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch stats');
//       }
//       const data = await response.json();
//       setStats(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, [dateRange]);

//   if (loading) {
//     return (
//       <div className="p-8 space-y-8 ml-10">
//         <div className="space-y-2">
//           <Skeleton className="h-8 w-[200px]" />
//           <Skeleton className="h-4 w-[300px]" />
//         </div>
        
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           {[...Array(4)].map((_, i) => (
//             <Skeleton key={i} className="h-[120px] rounded-xl" />
//           ))}
//         </div>
        
//         <Skeleton className="h-[400px] w-full rounded-xl" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[60vh] gap-4 ml-10">
//         <AlertCircle className="h-12 w-12 text-red-500" />
//         <h2 className="text-xl font-semibold">Error loading dashboard</h2>
//         <p className="text-muted-foreground max-w-md text-center">{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6 ml-10">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
//           <p className="text-muted-foreground">
//             Insights and analytics for your todo application
//           </p>
//         </div>
        
//         <div className="w-full md:w-auto">
//           <div className="grid gap-2">
//             <Label htmlFor="date-range">Filter by date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   id="date-range"
//                   variant={"outline"}
//                   className="w-full md:w-[240px] justify-start text-left font-normal"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {dateRange?.from ? (
//                     dateRange.to ? (
//                       <>
//                         {format(dateRange.from, "MMM dd")} -{" "}
//                         {format(dateRange.to, "MMM dd")}
//                       </>
//                     ) : (
//                       format(dateRange.from, "MMM dd")
//                     )
//                   ) : (
//                     <span>Pick a date range</span>
//                   )}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   initialFocus
//                   mode="range"
//                   defaultMonth={dateRange?.from}
//                   selected={dateRange}
//                   onSelect={setDateRange}
//                   numberOfMonths={1}
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
//             <div className="bg-primary/10 p-2 rounded-lg">
//               <Users className="h-4 w-4 text-primary" />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.users.totalUsers}</div>
//             <div className="flex items-center text-xs text-muted-foreground mt-1">
//               <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
//               <span>+{stats.users.growthPercentage}% from last week</span>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
//             <div className="bg-green-500/10 p-2 rounded-lg">
//               <CheckCircle className="h-4 w-4 text-green-500" />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.todos.completed}</div>
//             <div className="text-xs text-muted-foreground mt-1">
//               {stats.todos.completionPercentage}% completion rate
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
//             <div className="bg-yellow-500/10 p-2 rounded-lg">
//               <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.todos.in_progress}</div>
//             <div className="text-xs text-muted-foreground mt-1">
//               {Math.round((stats.todos.in_progress / stats.todos.totalTodos) * 100)}% of total
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
//             <div className="bg-orange-500/10 p-2 rounded-lg">
//               <Clock className="h-4 w-4 text-orange-500" />
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.todos.pending}</div>
//             <div className="text-xs text-muted-foreground mt-1">
//               {Math.round((stats.todos.pending / stats.todos.totalTodos) * 100)}% of total
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Todo Analytics</h2>
//         <Card className="w-full p-6 hover:shadow-md transition-shadow">
//           <TodoChart 
//             barData={stats.trends} 
//             pieData={[
//               { name: "Completed", value: stats.todos.completed },
//               { name: "In Progress", value: stats.todos.in_progress },
//               { name: "Pending", value: stats.todos.pending }
//             ]} 
//           />
//         </Card>
//       </div>
//     </div>
//   );
// }

'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TodoChart } from "../components/admin/TodoChart";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Users, CheckCircle, Clock, AlertCircle, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { COLOR_THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateRange?.from) params.append('startDate', format(dateRange.from, 'yyyy-MM-dd'));
      if (dateRange?.to) params.append('endDate', format(dateRange.to, 'yyyy-MM-dd'));

      const response = await fetch(`/api/admin/stats?${params.toString()}`);
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

  useEffect(() => {
    fetchStats();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="p-8 space-y-8 ml-10">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <Skeleton className="h-10 w-[240px]" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-[120px]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-[80px] mb-2" />
                <Skeleton className="h-3 w-[120px]" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="h-[400px]">
          <CardHeader>
            <Skeleton className="h-5 w-[150px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 ml-10">
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
          <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
        </div>
        <h2 className="text-xl font-semibold">Error loading dashboard</h2>
        <p className="text-muted-foreground max-w-md text-center">{error}</p>
        <Button 
          onClick={() => fetchStats()}
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 ml-10 ">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Insights and analytics for your todo application
          </p>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="grid gap-2">
            <Label htmlFor="date-range" className="text-sm">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range"
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[240px] justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd")} -{" "}
                        {format(dateRange.to, "MMM dd")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.totalUsers}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {stats.users.growthPercentage > "0" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingUp className="h-3 w-3 text-red-500 mr-1 transform rotate-180" />
              )}
              <span>{stats.users.growthPercentage}% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todos.completed}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.todos.completionPercentage}% completion rate
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
              <Loader2 className="h-4 w-4 text-yellow-600 dark:text-yellow-400 animate-spin" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todos.in_progress}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((stats.todos.in_progress / stats.todos.totalTodos) * 100)}% of total
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Todo Analytics</h2>
        <Card className="w-full p-6 hover:shadow-md transition-shadow border-border">
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