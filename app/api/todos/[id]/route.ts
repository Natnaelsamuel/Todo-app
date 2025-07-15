import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';

interface RouteParams {
  params: { id: string };
}

export async function PUT(
  request: NextRequest, 
  { params }: RouteParams ) {
    try {
    const { status } = await request.json();
  
    if (!params.id) {
      return NextResponse.json({ error: 'Missing todo id' }, { status: 400 });
    }
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { status },
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