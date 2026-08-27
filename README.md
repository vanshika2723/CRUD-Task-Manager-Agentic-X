# 🚀 CRUD Task Manager

A full-stack Task Manager application built with React, Node.js, Express.js, and MongoDB.

The application provides complete CRUD functionality and stores tasks in a real MongoDB database, so data persists even after refreshing the browser.

## 🌐 Live Demo

Frontend:
https://YOUR-VERCEL-URL.vercel.app

Backend API:
https://YOUR-RENDER-URL.onrender.com

---

## ✨ Features

- Create tasks
- View all tasks
- Update tasks
- Delete tasks
- Mark tasks as completed/pending
- Search tasks
- Filter tasks
- Task statistics
- Loading states
- Error handling
- Responsive UI
- Persistent MongoDB storage
- RESTful API
- Environment variable configuration
- Production deployment

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database

- MongoDB Atlas

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## 📁 Project Structure

```text
crud-task-manager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
