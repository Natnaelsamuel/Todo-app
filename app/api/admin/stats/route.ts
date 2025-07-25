import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  try {
    // Fetch all stats in parallel
    const [users, todos, trends] = await Promise.all([
      prisma.user.count().then(totalUsers => ({
        totalUsers,
        newUsersThisWeek: prisma.user.count({
          where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
        }),
        growthPercentage: "0" // We'll calculate this below
      })),
      
      prisma.todo.groupBy({
        by: ['status'],
        _count: { _all: true }
      }).then(statusCounts => {
        const counts = { pending: 0, in_progress: 0, completed: 0 };
        statusCounts.forEach(item => counts[item.status] = item._count._all);
        const total = counts.pending + counts.in_progress + counts.completed;
        return {
          ...counts,
          totalTodos: total,
          completionPercentage: total > 0 ? ((counts.completed / total) * 100).toFixed(2) : "0"
        };
      }),
      
      prisma.$queryRaw`
        SELECT
          TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') as name,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::integer as completed,
          SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END)::integer as in_progress,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END)::integer as pending
        FROM "Todo"
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY DATE_TRUNC('month', "createdAt")
      `
    ]);

    // Calculate growth percentage
    const previousWeekUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });
    
    const growthPercentage = previousWeekUsers > 0 
      ? (((await users.newUsersThisWeek) - previousWeekUsers) / previousWeekUsers * 100).toFixed(2)
      : "0";

    return NextResponse.json({
      users: {
        totalUsers: await users.totalUsers,
        newUsersThisWeek: await users.newUsersThisWeek,
        growthPercentage
      },
      todos: await todos,
      trends: trends
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}