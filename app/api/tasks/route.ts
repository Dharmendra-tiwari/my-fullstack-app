import { Task } from "@/app/type/types";
import { NextResponse } from "next/server";

const fakeTasks: Task[] = [
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

export const GET = async () => {
  return NextResponse.json(fakeTasks);
};
