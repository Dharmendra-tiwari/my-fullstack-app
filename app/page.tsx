import Link from "next/link";

export default function Home() {
  const fakeTasks = [
    { id: 1, title: "Master Next.js App Router", completed: true },
    { id: 2, title: "Connect MongoDB with Mongoose", completed: false },
    { id: 3, title: "Build REST API with Express", completed: false },
    { id: 4, title: "Add JWT Authentication", completed: false },
    { id: 5, title: "Deploy full app to Vercel + Render", completed: false },
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 mb-10 tracking-tight">
        Hello Full Stack! 🚀
      </h1>
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Learning Roadmap Tasks
        </h2>

        <ul className="space-y-5">
          {fakeTasks.map((task) => (
            <li
              key={task.id}
              className={`p-6 rounded-xl shadow-md border-l-6 transition-all hover:scale-102 ${
                task.completed
                  ? "border-green-500 bg-green-50/80"
                  : "border-amber-500 bg-amber-50/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xl font-medium ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    task.completed
                      ? "bg-green-200 text-green-800"
                      : "bg-amber-200 text-amber-800"
                  }`}
                >
                  {task.completed ? "Done ✅" : "Pending ⏳"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-16">
        <Link
          href="/about"
          className="px-10 py-5 bg-purple-600 text-white text-lg font-semibold rounded-xl hover:bg-purple-700 transition shadow-lg"
          target="_blank"
          rel="noopener noreference"
        >
          Next Steps →
        </Link>
      </div>
    </main>
  );
}
