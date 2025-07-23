import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { get } from "http";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const skip = (page - 1) * limit;

//     const [todos, totalCount] = await Promise.all([
//       prisma.todo.findMany({
//         skip,
//         take: limit,
//         orderBy: { createdAt: "desc" },
//       }),
//       prisma.todo.count(),
//     ]);

//     return NextResponse.json({
//       todos,
//       totalPages: Math.ceil(totalCount / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     console.error("Error fetching paginated todos:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch todos" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    // If no session, return unauthorized
    if (!session?.user?.email || !session) {
      // return NextResponse.json(
      //   { error: "Unauthorized" },
      //   { status: 401 }
      // );
      return NextResponse.redirect(new URL('/signin', req.url))
    }

    // Get pagination parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true } // We only need the user ID
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch todos only for this user
    const [todos, totalCount] = await Promise.all([
      prisma.todo.findMany({
        where: { userId: user.id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.todo.count({
        where: { userId: user.id }
      }),
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
        const session = await getServerSession(authOptions);
        const email = session!.user!.email;

        if (!session || !email) {
          redirect("/signin");
        }

        const { title, deadline } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email: email },
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (!title || !deadline) {
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
                deadline: fixedDate,
                userId: user.id,
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