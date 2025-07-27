// import { prisma } from "@/prisma/client";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Total users count
//     const totalUsers = await prisma.user.count();
    
//     // Users added in the last 7 days
//     const newUsersThisWeek = await prisma.user.count({
//       where: {
//         createdAt: {
//           gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//         }
//       }
//     });

//     // Growth percentage calculation
//     const previousWeekUsers = await prisma.user.count({
//       where: {
//         createdAt: {
//           gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
//           lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//         }
//       }
//     });

//     const growthPercentage = previousWeekUsers > 0 
//       ? ((newUsersThisWeek - previousWeekUsers) / previousWeekUsers) * 100 
//       : 0;

//     return NextResponse.json({
//       totalUsers,
//       newUsersThisWeek,
//       growthPercentage: growthPercentage.toFixed(2)
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch user statistics" },
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

    // Total users count (with date filter)
    const totalUsers = await prisma.user.count({
      where: { createdAt: dateFilter }
    });
    
    // Users added in the filtered period
    const newUsersThisWeek = await prisma.user.count({
      where: {
        createdAt: {
          ...dateFilter,
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    // Growth percentage calculation with date filter
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
      ? ((newUsersThisWeek - previousWeekUsers) / previousWeekUsers) * 100 
      : 0;

    return NextResponse.json({
      totalUsers,
      newUsersThisWeek,
      growthPercentage: growthPercentage.toFixed(2)
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user statistics" },
      { status: 500 }
    );
  }
}