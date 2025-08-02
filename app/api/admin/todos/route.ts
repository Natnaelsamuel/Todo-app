import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/client";
import { authOptions } from "../../auth/authOptions";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !session) {
      // return NextResponse.json(
      //   { error: "Unauthorized" },
      //   { status: 401 }
      // );
      return NextResponse.redirect(new URL('/signin', req.url))
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // const user = await prisma.user.findUnique({
    //   where: { email: session.user.email },
    //   select: { id: true } // We only need the user ID
    // });

    // if (!user) {
    //   return NextResponse.json(
    //     { error: "User not found" },
    //     { status: 404 }
    //   );
    // }

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