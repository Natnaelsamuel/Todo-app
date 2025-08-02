import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/authOptions';

interface RouteParams {
  params: { id: string };
}

export async function PUT(
  request: NextRequest, 
  { params }: RouteParams ) {
    try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, status, deadline } = await request.json();

    const selectedDate = new Date(deadline);
    const fixedDate = new Date(Date.UTC(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    ));
  
    if (!params.id) {
      return NextResponse.json({ error: 'Missing todo id' }, { status: 400 });
    }
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { title, status, deadline: fixedDate },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Update todo error:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
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