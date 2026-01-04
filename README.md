# MERN E‑Commerce Platform

A full‑stack e‑commerce web application built with the **MERN stack** (MongoDB, Express, React, Node.js). The project includes a RESTful API, cookie‑based authentication, an admin dashboard, and a modern React UI using Tailwind CSS and Lucide icons.

This repository contains **both backend and frontend** in a single monorepo structure.

---

## 🚀 Project Overview

This project is a complete e‑commerce platform that allows users to browse products (books), authenticate securely, and provides admin features for managing content. The backend follows an **MVC architecture**, while the frontend is built with **React** and modern UI practices.

---

## ✨ Features

### 🔐 Authentication & Authorization

* Login & logout using **HTTP‑only cookies**
* Secure session handling
* Protected routes (user & admin)

### 🛍️ E‑Commerce Features

* Browse books/products
* Categories management
* Featured products section

### 🛠️ Admin Dashboard

* Admin‑only routes
* Add and manage books
* View all products

### 🌐 Backend API

* RESTful API with Express
* MVC architecture (Controllers, Models, Routes)
* Centralized error handling
* Request validation middleware

### 🎨 Frontend UI

* React.js frontend
* Tailwind CSS for styling
* Lucide‑React icons
* Reusable components & layouts

---

## 🧱 Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Lucide‑React

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* Cookie‑Parser
* CORS
* dotenv

---

## 📁 Project Structure

```
root/
│
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic (MVC Controllers)
│   ├── middlewares/      # Auth, validation, error handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── public/           # Static files (images)
│   ├── .env              # Environment variables
│   ├── index.js          # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   │   └── admin/    # Admin dashboard components
│   │   ├── pages/        # Application pages
│   │   ├── App.js
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Melek-73/MERN-e-commerce-app.git
cd MERN-e-commerce-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=3000
MONGO_URI=mongodb_connection_string
```

Run the backend server:

```bash
npx nodemon index.js
```

Backend runs on: **[http://localhost:3000](http://localhost:3000)**

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run start
```

Frontend runs on: **[http://localhost:3001](http://localhost:3001)**

---

## 🔗 API Routes Overview

* `POST /auth/login`
* `POST /auth/logout`
* `GET /users`
* `GET /books`
* `GET /categories`
* `GET /admin/*`

Static images:

* `/images/*`

---

## 🔒 Authentication Details

* Authentication is handled using **cookies** (HTTP‑only)
* CORS configured to allow credentials
* Protected routes via custom middleware

---

## 📌 Status

This project is **fully functional** and suitable for:

* Learning full‑stack development
* Portfolio demonstration
* Extension to production use (payments, orders, etc.)

---

## 📈 Possible Improvements

* Payment integration (Stripe, PayPal)
* Cart & checkout system
* User roles & permissions
* Deployment (Docker, Vercel, Render)

---

## 👤 Author

**Melik Fourati**

---

## 📄 License

This project is open‑source and available under the MIT License.
