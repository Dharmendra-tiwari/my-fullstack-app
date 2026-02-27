import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Tasks';

export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find().sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const {title, description} = body;

    if(!title){
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newTask = new Task({
      title,
      description: description || '',
      completed: false
    })

    await newTask.save();

    return NextResponse.json(newTask, {status: 201})
    
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({error: 'Failed to create task'}, {status: 500})
    
  }
}