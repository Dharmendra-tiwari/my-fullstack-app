import Link from "next/link";
import { notFound } from "next/navigation";

const fakeTasks = [
  {
    id: 1,
    title: "Master Next.js App Router",
    completed: true,
    description:
      "Pages vs App Router, Server Components, Client Components समझ लिया।",
  },
  {
    id: 2,
    title: "Connect MongoDB with Mongoose",
    completed: false,
    description: "Atlas अकाउंट बनाना, connection string सेट करना।",
  },
  {
    id: 3,
    title: "Build REST API with Express",
    completed: false,
    description: "Routes, middleware, controllers बनाना।",
  },
  {
    id: 4,
    title: "Add JWT Authentication",
    completed: false,
    description: "Login, signup, token generate और verify करना।",
  },
  {
    id: 5,
    title: "Deploy full app",
    completed: false,
    description: "Vercel पर frontend, Render/Heroku पर backend।",
  },
];

const TaskDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
//   console.log("Dynamic route hit! ID from params:", resolvedParams.id);

  const task = fakeTasks.find((t) => t.id === id);

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
