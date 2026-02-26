import { Task } from "@/app/type/types";
import Link from "next/link";
import { notFound } from "next/navigation";

const TaskDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const task: Task = await res.json();

  if (!task) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 text-center">
        Task #{task.id}: {task.title}
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <p className="text-xl mb-4">
          <strong>Status:</strong>{" "}
          <span
            className={
              task.completed
                ? "text-green-600 font-semibold"
                : "text-amber-600 font-semibold"
            }
          >
            {task.completed ? "Completed ✅" : "Pending ⏳"}
          </span>
        </p>

        <p className="text-lg mb-8">
          <strong>Description:</strong> {task.description}
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
};

export default TaskDetailPage;
