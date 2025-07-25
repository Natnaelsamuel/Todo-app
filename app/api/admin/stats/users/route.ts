import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Total users count
    const totalUsers = await prisma.user.count();
    
    // Users added in the last 7 days
    const newUsersThisWeek = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    // Growth percentage calculation
    const previousWeekUsers = await prisma.user.count({
      where: {
        createdAt: {
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