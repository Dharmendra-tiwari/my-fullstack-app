"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Task } from "./type/types";
import { toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed");

      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
      setTitle("");
      setDescription("");

      toast.success("Task added successfully! 🎉");
    } catch (err) {
      console.error(err);
      alert("Error adding task");

      toast.error("Error adding task");
    }
  };

  const toggleCompleted = async (taskId: string, currentCompleted: boolean) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedTask = await res.json();

      setTasks(tasks.map((t) => (t._id === taskId ? updatedTask : t)));

      toast.success(
        updatedTask.completed
          ? "Task marked as completed! ✅"
          : "Task marked as pending",
      );
    } catch (err) {
      console.error(err);
      alert("Error updating task");

      toast.error("Error updating task");
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    const previousTasks = [...tasks];
    setTasks(tasks.filter((t) => t._id !== taskId));

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      toast.success("Task deleted successfully")
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting task");
      setTasks(previousTasks);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-10 tracking-tight">
        Hello Full Stack! 🚀
      </h1>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className="w-full max-w-3xl mb-12 bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title *"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 h-24"
        />
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Add Task
        </button>
      </form>

      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Tasks (from MongoDB!)
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-5">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`p-6 rounded-xl shadow-md border-l-6 transition-all hover:scale-102 ${
                  task.completed
                    ? "border-green-500 bg-green-50/80"
                    : "border-amber-500 bg-amber-50/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompleted(task._id, task.completed)}
                      className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <Link href={`/tasks/${task._id}`} className="flex-1">
                      <span
                        className={`text-xl font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                      >
                        {task.title}
                      </span>
                    </Link>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      task.completed
                        ? "bg-green-200 text-green-800"
                        : "bg-amber-200 text-amber-800"
                    }`}
                  >
                    {task.completed ? "Done ✅" : "Pending ⏳"}
                  </span>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-16">
        <Link
          href="/about"
          className="px-10 py-5 bg-purple-600 text-white text-lg font-semibold rounded-xl hover:bg-purple-700 transition shadow-lg"
        >
          Next Steps →
        </Link>
      </div>
    </main>
  );
}
