import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface RouteParams {
  params: { id: string };
}

export async function DELETE(
  request: NextRequest, 
  { params }: RouteParams ) {
    try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id  = params.id;
    if (!id) {
      return NextResponse.json({ error: 'Missing todo id' }, { status: 400 });
    }
    await prisma.todo.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Delete todo error:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}