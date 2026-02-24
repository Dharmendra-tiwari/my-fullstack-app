import Link from "next/link";

const About = () => {       
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">About Page</h1>
      <p className="text-2xl text-gray-600">Coming Soon... 🚧</p>

      <div className="mt-10">
        <Link
          href="/"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        //   onClick={() => alert("HII")} // Cant use bcoz its a server component to make client comp just add "use client" at the top of the file
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default About;
