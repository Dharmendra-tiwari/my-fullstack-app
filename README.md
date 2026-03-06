# My Full-Stack Task Manager

A modern task management app built as a learning project — from Next.js basics to full CRUD with MongoDB Atlas, dark mode, and Vercel deployment.

Live Demo: https://my-fullstack-app-mu.vercel.app/  
GitHub Repo: https://github.com/Dharmendra-tiwari/my-fullstack-app

![App Screenshot Light Mode](https://via.placeholder.com/800x450?text=Light+Mode+Screenshot)  
![App Screenshot Dark Mode](https://via.placeholder.com/800x450?text=Dark+Mode+Screenshot)  
*(Replace these placeholder images with real screenshots from your app)*

## Features

- Full CRUD operations (Create, Read, Update, Delete)
- Add, edit, mark as completed, and delete tasks
- Dark mode with toggle button & localStorage persistence
- Responsive design (mobile + desktop)
- MongoDB Atlas backend with Mongoose
- TypeScript for type safety
- Deployed on Vercel (automatic CI/CD from GitHub)

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Mongoose ODM
- **Database**: MongoDB Atlas (free tier)
- **Deployment**: Vercel
- **State Management**: React hooks + Context API (for theme)

## How I Built It (My Learning Journey)

1. Set up Next.js with TypeScript & Tailwind
2. Built static task list with fake data
3. Created dynamic routes (/tasks/[id]) & API endpoints
4. Connected MongoDB Atlas + Mongoose with connection caching
5. Implemented full CRUD (GET/POST/PUT/DELETE)
6. Added dark mode with ThemeContext & localStorage
7. Fixed all TypeScript warnings & async params issues
8. Deployed to Vercel with environment variables

## Setup Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/Dharmendra-tiwari/my-fullstack-app.git
   cd my-fullstack-app