import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function GET(req: NextRequest) {
    try {
        // const session = await getServerSession(authOptions);
            
        //     if (!session?.user?.email || session.user.role !== 'admin') {
        //       return NextResponse.json(
        //         { error: "Unauthorized" },
        //         { status: 401 }
        //       );
        //     }

        const { searchParams } = new URL(req.url);
            const page = parseInt(searchParams.get("page") || "1");
            const limit = parseInt(searchParams.get("limit") || "10");
            const skip = (page - 1) * limit;
        
            const [users, totalCount] = await Promise.all([
              prisma.user.findMany({
                skip,
                take: limit,
              }),
              prisma.user.count(),
            ]);
        
            return NextResponse.json({
              users,
              totalPages: Math.ceil(totalCount / limit),
              currentPage: page,
            });
          } catch (error) {
            console.error("Error fetching paginated users:", error);
            return NextResponse.json(
              { error: "Failed to fetch todos" },
              { status: 500 }
            );
          }
        }