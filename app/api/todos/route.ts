import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [todos, totalCount] = await Promise.all([
      prisma.todo.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.todo.count(),
    ]);

    return NextResponse.json({
      todos,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching paginated todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
    try {
        const { title, username, deadline } = await request.json();

        if (!title || !username || !deadline) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const selectedDate = new Date(deadline);
        const fixedDate = new Date(Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        ));

        const todo = await prisma.todo.create({
            data: {
                title,
                username,
                deadline: fixedDate,
            },
        });
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json(
            { error: "Failed to create todo" },
            { status: 500 }
        );
    }
}