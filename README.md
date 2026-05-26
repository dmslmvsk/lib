# Portfolio Library App

A simple library management app for managing libraries, shelves, books, authors, genres, and users.
This project was developed for a portfolio, demonstrating a complete full-stack setup with a frontend, backend, and database.

<img width="1868" height="905" alt="Home" src="https://github.com/user-attachments/assets/f6bf503a-bf3b-4b4c-a8cf-867c1a6a0c75" />

---

## Description

This learning project includes:
- creating and editing libraries, shelves, books, authors and genres
- a borrowing system for reserving and checking out books
- authentication for users and admins

---

## Features

- CRUD for libraries, shelves, books, authors, genres, and users
- book reservation and borrowing with status tracking
- JWT authentication for users and admins
- responsive UI built with React and Tailwind CSS

---

## Technologies

- React, TypeScript, Tailwind CSS, shadcn/ui
- TanStack Router, TanStack Query, Axios, Zustand
- Node.js, Express, TypeScript, Prisma
- PostgreSQL, Docker, Docker Compose

---

## How to run

### 1. Configure `.env`

There are three example env files in the repo:
- `./.env.example` — root environment file
- `./backend/.env.example` — backend settings
- `./frontend/.env.example` — frontend settings


### 2. Start the database

```bash
docker compose up db -d
```

### 3. Start the backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

The backend runs at `http://localhost:5000`.

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

### 5. Run full stack with Docker

```bash
docker compose up -d --build
```

---

## `.env` variables

- `POSTGRES_USER` — PostgreSQL username
- `POSTGRES_PASSWORD` — PostgreSQL password
- `POSTGRES_DB` — PostgreSQL database name
- `DB_HOST` — database host (for Docker usually `db`)
- `DB_PORT` — database port (typically `5432`)
- `BACKEND_PORT` — backend port
- `DATABASE_URL` — Prisma connection string
- `JWT_SECRET` — JWT secret key
- `VITE_API_URL` — frontend API base URL

---

## 📸 Screenshots

Here are key sections of the application. Click on any thumbnail to view the full-size image.

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <a href="https://github.com/user-attachments/assets/4fc80b53-3de6-4c8c-89e3-23383b2d3c73">
        <img src="https://github.com/user-attachments/assets/4fc80b53-3de6-4c8c-89e3-23383b2d3c73" width="100%" alt="Login Page">
      </a>
      <p align="center"><b>Login Page</b></p>
    </td>
    <td width="50%" align="center">
      <a href="https://github.com/user-attachments/assets/dda76ccb-dd93-420e-85d9-1a8740a632ab">
        <img src="https://github.com/user-attachments/assets/dda76ccb-dd93-420e-85d9-1a8740a632ab" width="100%" alt="Admin Panel">
      </a>
      <p align="center"><b>Admin Dashboard (Shelves Management)</b></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <a href="https://github.com/user-attachments/assets/d1347dc7-2602-4c29-abf3-77e44bf5a373">
        <img src="https://github.com/user-attachments/assets/d1347dc7-2602-4c29-abf3-77e44bf5a373" width="100%" alt="User Dashboard">
      </a>
      <p align="center"><b>User Dashboard</b></p>
    </td>
    <td width="50%" align="center">
      <a href="https://github.com/user-attachments/assets/81a46609-b51e-43a8-ad80-08c490b5bdf2">
        <img src="https://github.com/user-attachments/assets/81a46609-b51e-43a8-ad80-08c490b5bdf2" width="100%" alt="Book Page">
      </a>
      <p align="center"><b>Book Page</b></p>
    </td>
  </tr>
</table>
