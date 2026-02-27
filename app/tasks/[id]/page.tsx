'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';

export default function TaskDetailPage() {
  const params = useParams();
  const id = params.id as string;  // string में कन्वर्ट

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // fetchTask memoized — id बदलने पर ही रन हो
  const fetchTask = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      console.log('Fetching task with ID:', id);

      const res = await fetch(`/api/tasks/${id}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Fetch failed:', res.status, errorText);
        throw new Error(`Failed to fetch task: ${res.status}`);
      }

      const data = await res.json();
      console.log('Task fetched:', data);

      setTask(data);
      setEditedTitle(data.title || '');
      setEditedDescription(data.description || '');
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load task');
    } finally {
      setLoading(false);
    }
  }, [id]);

  // mount पर या id बदलने पर fetch
  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedTitle.trim()) {
      alert('Title is required');
      return;
    }

    console.log('Saving edits for ID:', id, {
      title: editedTitle,
      description: editedDescription,
    });

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
        }),
      });

      console.log('PUT response status:', res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('PUT error details:', errorData);
        throw new Error(errorData.error || 'Failed to update task');
      }

      const updatedTask = await res.json();
      console.log('Updated task:', updatedTask);

      setTask(updatedTask);
      setEditMode(false);
    } catch (err: any) {
      console.error('Update error:', err);
      alert('Error updating task: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading task details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">Error: {error}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-xl text-red-600">Task not found</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      {editMode ? (
        <form
          onSubmit={handleEditSubmit}
          className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg"
        >
          <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
            Edit Task
          </h1>

          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task Title *"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-32"
          />

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-8 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 text-center">
            {task.title}
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
              Created:{' '}
              {new Date(task.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setEditMode(true)}
                className="px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Edit Task
              </button>

              <Link
                href="/"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}