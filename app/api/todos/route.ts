import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
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

        const todo = await prisma.todo.create({
            data: {
                title,
                username,
                deadline: new Date(deadline),
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