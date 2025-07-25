import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

interface MonthlyTodoStats {
  month: string;  // This is actually a string representation of the date
  completed: string | number;
  in_progress: string | number;
  pending: string | number;
}

interface FormattedChartData {
  name: string;
  completed: number;
  in_progress: number;
  pending: number;
}

export async function GET() {
  try {
    // Explicitly type the raw query result
    const monthlyData = await prisma.$queryRaw<MonthlyTodoStats[]>`
      SELECT
        TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') as month,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::integer as completed,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END)::integer as in_progress,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END)::integer as pending
      FROM "Todo"
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY DATE_TRUNC('month', "createdAt")
    `;

    // Convert to format expected by your chart
    const formattedData: FormattedChartData[] = monthlyData.map((item) => ({
      name: item.month,
      completed: typeof item.completed === 'string' ? parseInt(item.completed) : item.completed,
      in_progress: typeof item.in_progress === 'string' ? parseInt(item.in_progress) : item.in_progress,
      pending: typeof item.pending === 'string' ? parseInt(item.pending) : item.pending
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching todo stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch time-based todo statistics" },
      { status: 500 }
    );
  }
}