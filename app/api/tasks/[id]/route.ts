// app/api/tasks/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Tasks';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;

  console.log('GET single task - ID:', id);

  try {
    await dbConnect();
    const task = await Task.findById(id);
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    return NextResponse.json(task);
  } catch (error) {
    console.error('GET single task error:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const id = params.id;

  console.log('PUT request received for ID:', id);

  try {
    await dbConnect();

    const body = await request.json();
    console.log('PUT body received:', body);  // ← ये लॉग बहुत महत्वपूर्ण है

    const { title, description, completed } = body;

    if (title === undefined && description === undefined && completed === undefined) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    console.log('Updating with data:', updateData);

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    console.log('Task updated successfully:', updatedTask._id);

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('PUT update error:', error);
    return NextResponse.json({ error: 'Failed to update task', details: error.message }, { status: 500 });
  }
}