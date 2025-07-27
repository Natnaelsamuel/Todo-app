// import { NextResponse } from "next/server";
// import { prisma } from "@/prisma/client";

// export async function GET() {
//   try {
//     // Fetch all stats in parallel
//     const [users, todos, trends] = await Promise.all([
//       prisma.user.count().then(totalUsers => ({
//         totalUsers,
//         newUsersThisWeek: prisma.user.count({
//           where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
//         }),
//         growthPercentage: "0" 
//       })),
      
//       prisma.todo.groupBy({
//         by: ['status'],
//         _count: { _all: true }
//       }).then(statusCounts => {
//         const counts = { pending: 0, in_progress: 0, completed: 0 };
//         statusCounts.forEach(item => counts[item.status] = item._count._all);
//         const total = counts.pending + counts.in_progress + counts.completed;
//         return {
//           ...counts,
//           totalTodos: total,
//           completionPercentage: total > 0 ? ((counts.completed / total) * 100).toFixed(2) : "0"
//         };
//       }),
      
//       prisma.$queryRaw`
//         SELECT
//           TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') as name,
//           SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::integer as completed,
//           SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END)::integer as in_progress,
//           SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END)::integer as pending
//         FROM "Todo"
//         GROUP BY DATE_TRUNC('month', "createdAt")
//         ORDER BY DATE_TRUNC('month', "createdAt")
//       `
//     ]);

//     // Calculate growth percentage
//     const previousWeekUsers = await prisma.user.count({
//       where: {
//         createdAt: {
//           gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
//           lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//         }
//       }
//     });
    
//     const growthPercentage = previousWeekUsers > 0 
//       ? (((await users.newUsersThisWeek) - previousWeekUsers) / previousWeekUsers * 100).toFixed(2)
//       : "0";

//     return NextResponse.json({
//       users: {
//         totalUsers: await users.totalUsers,
//         newUsersThisWeek: await users.newUsersThisWeek,
//         growthPercentage
//       },
//       todos: await todos,
//       trends: trends
//     });

//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Create date filter object
    const dateFilter = {
      ...(startDate && { gte: new Date(startDate) }),
      ...(endDate && { lte: new Date(endDate) }),
    };

    // Fetch all stats in parallel
    const [users, todos, trends] = await Promise.all([
      // Users stats (using Prisma's built-in methods)
      (async () => {
        const totalUsers = await prisma.user.count({
          where: { createdAt: dateFilter }
        });

        const newUsersThisWeek = await prisma.user.count({
          where: {
            createdAt: {
              ...dateFilter,
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          }
        });

        const previousWeekUsers = await prisma.user.count({
          where: {
            createdAt: {
              ...dateFilter,
              gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
              lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          }
        });

        const growthPercentage = previousWeekUsers > 0 
          ? (((newUsersThisWeek - previousWeekUsers) / previousWeekUsers) * 100).toFixed(2)
          : "0";

        return {
          totalUsers,
          newUsersThisWeek,
          growthPercentage
        };
      })(),

      // Todos stats (using Prisma's built-in methods)
      (async () => {
        const statusCounts = await prisma.todo.groupBy({
          by: ['status'],
          where: { createdAt: dateFilter },
          _count: {
            _all: true
          }
        });

        const counts = { pending: 0, in_progress: 0, completed: 0 };
        statusCounts.forEach(item => {
          counts[item.status as keyof typeof counts] = Number(item._count._all);
        });

        const total = counts.pending + counts.in_progress + counts.completed;
        return {
          ...counts,
          totalTodos: total,
          completionPercentage: total > 0 ? ((counts.completed / total) * 100).toFixed(2) : "0"
        };
      })(),

      // Trends data (using raw query with proper BigInt handling)
      (async () => {
        // Build the WHERE clause conditionally
        let whereClause = '';
        if (startDate || endDate) {
          const start = startDate ? new Date(startDate) : new Date(0);
          const end = endDate ? new Date(endDate) : new Date('2100-01-01');
          whereClause = `WHERE "createdAt" BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`;
        }

        const query = `
          SELECT
            TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') as name,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::integer as completed,
            SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END)::integer as in_progress,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END)::integer as pending
          FROM "Todo"
          ${whereClause}
          GROUP BY DATE_TRUNC('month', "createdAt")
          ORDER BY DATE_TRUNC('month', "createdAt")
        `;

        const monthlyData = await prisma.$queryRawUnsafe<
          { name: string; completed: bigint; in_progress: bigint; pending: bigint }[]
        >(query);

        return monthlyData.map(item => ({
          name: item.name,
          completed: Number(item.completed),
          in_progress: Number(item.in_progress),
          pending: Number(item.pending)
        }));
      })()
    ]);

    return NextResponse.json({
      users,
      todos,
      trends
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}