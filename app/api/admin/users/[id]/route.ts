import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: { id: string };
}

export async function PUT(
    request: NextRequest, 
  { params }: RouteParams ) {
    try {
        const session = await getServerSession(authOptions);
            if (!session?.user?.email || session.user.role !== 'admin') {
              return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        
        const { role } = await request.json();
          
            if (!params.id) {
              return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
            }
        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: { role },
        });
        
        return NextResponse.json(updatedUser);
    }catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
  }

  export async function DELETE(
    request: NextRequest, 
    { params }: RouteParams ) {
      try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const id  = params.id;
      if (!id) {
        return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
      }
      await prisma.user.delete({
        where: { id: id },
      });
  
      return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
      console.error('Delete user error:', error);
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
  }