import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task, {ITask} from "@/models/Tasks";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const id = params.id;

  console.log("GET single task - ID:", id);

  try {
    await dbConnect();
    const task = await Task.findById(id);
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json(task);
  } catch (error) {
    console.error("GET single task error:", error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const id = params.id;

  console.log("PUT request received for ID:", id);

  try {
    await dbConnect();

    const body = await request.json();
    console.log("PUT body received:", body); 

    const { title, description, completed } = body;

    if (
      title === undefined &&
      description === undefined &&
      completed === undefined
    ) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    const updateData: Partial<ITask> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    console.log("Updating with data:", updateData);

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    console.log("Task updated successfully:", updatedTask._id);

    return NextResponse.json(updatedTask);
  } catch (error) {
    const err = error as Error;
    console.error("PUT update error:", err.message || err);
    return NextResponse.json(
      { error: "Failed to update task", details: err.message || 'Unknown error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const id = params.id;

  console.log("DELETE request for task ID:", id);

  try {
    await dbConnect();

    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    console.log("Task deleted successfully: ", id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("DELETE task error:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
