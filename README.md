# Portfolio Library App

A simple library management app for managing libraries, shelves, books, authors, genres, and users.
This project was created for an Ausbildung application and demonstrates a full-stack setup with frontend, backend, and database.

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

PowerShell:

```powershell
Copy-Item .env.example .env
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

Linux / macOS:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

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

## Screenshots

```markdown
![Home screen](frontend/public/screenshots/home.png)
```