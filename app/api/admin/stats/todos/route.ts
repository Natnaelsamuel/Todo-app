// import { prisma } from "@/prisma/client";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Get counts for each status
//     const statusCounts = await prisma.todo.groupBy({
//       by: ['status'],
//       _count: {
//         _all: true
//       }
//     });

//     // Convert to more usable format
//     const counts = {
//       pending: 0,
//       in_progress: 0,
//       completed: 0
//     };

//     statusCounts.forEach(item => {
//       counts[item.status] = item._count._all;
//     });

//     // Calculate completion percentage
//     const totalTodos = counts.pending + counts.in_progress + counts.completed;
//     const completionPercentage = totalTodos > 0 
//       ? (counts.completed / totalTodos) * 100 
//       : 0;

//     return NextResponse.json({
//       ...counts,
//       totalTodos,
//       completionPercentage: completionPercentage.toFixed(2)
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch todo statistics" },
//       { status: 500 }
//     );
//   }
// }

import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const dateFilter = {
      ...(startDate && { gte: new Date(startDate) }),
      ...(endDate && { lte: new Date(endDate) }),
    };

    // Get counts for each status with date filter
    const statusCounts = await prisma.todo.groupBy({
      by: ['status'],
      where: { createdAt: dateFilter },
      _count: {
        _all: true
      }
    });

    const counts = {
      pending: 0,
      in_progress: 0,
      completed: 0
    };

    statusCounts.forEach(item => {
      counts[item.status] = item._count._all;
    });

    const totalTodos = counts.pending + counts.in_progress + counts.completed;
    const completionPercentage = totalTodos > 0 
      ? (counts.completed / totalTodos) * 100 
      : 0;

    return NextResponse.json({
      ...counts,
      totalTodos,
      completionPercentage: completionPercentage.toFixed(2)
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todo statistics" },
      { status: 500 }
    );
  }
}