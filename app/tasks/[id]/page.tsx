import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TaskDetailPage(
  {params: parmsPromise}: { params: Promise<{ id: string }>;
}) {
  const params = await parmsPromise;
  const id = params.id;
  console.log("Details page", id);
  
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound(); // 404 पेज दिखाएगा
  }

  const task = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 text-center">
        Task: {task.title}
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <p className="text-xl mb-4">
          <strong>Status:</strong>{' '}
          <span
            className={
              task.completed
                ? 'text-green-600 font-semibold'
                : 'text-amber-600 font-semibold'
            }
          >
            {task.completed ? 'Completed ✅' : 'Pending ⏳'}
          </span>
        </p>

        <p className="text-lg mb-8">
          <strong>Description:</strong>{' '}
          {task.description || 'No description available'}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Created: {new Date(task.createdAt).toLocaleDateString()}
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
}