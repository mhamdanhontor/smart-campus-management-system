# Smart Campus Management System

## Overview
Smart Campus is a full‑stack web application designed to manage courses, students, enrollment, and attendance in an academic environment. The system includes authentication, role‑based access (Admin / Student), course management, attendance tracking, and a dashboard with statistics.

This project is built using a modern full‑stack architecture:

Backend: Laravel (PHP)
Frontend: React + Vite
Database: MySQL
API Communication: REST API using Axios
Authentication: Laravel Sanctum

---

# Features

## Authentication
- User Registration (Students)
- Login / Logout
- Token based authentication (Laravel Sanctum)
- Role based access (Admin / Student)

## Admin Features
- Admin Dashboard with statistics
- Create / Edit / Delete Courses
- Enroll students in courses
- Mark student attendance
- View attendance records

## Student Features
- Register account
- Login to dashboard
- View enrolled courses
- View attendance records

---

# Tech Stack

## Backend
- Laravel
- PHP 8+
- Laravel Sanctum
- MySQL

## Frontend
- React
- Vite
- Axios
- TailwindCSS

---

# Project Structure

```
smart-campus

backend/
   app/
   routes/
   database/

frontend/
   src/
      pages/
      components/
      services/
```

---

# System Requirements

## Required Software

Install the following tools before running the project:

- PHP >= 8.1
- Composer
- Node.js >= 18
- NPM
- MySQL
- Git

Recommended tools:

- VS Code
- Postman

---

# Installation Guide

## 1 Clone Repository

```
git clone https://github.com/YOUR_USERNAME/smart-campus.git

cd smart-campus
```

---

# Backend Setup (Laravel)

Go to backend folder

```
cd backend
```

Install dependencies

```
composer install
```

Create environment file

```
cp .env.example .env
```

Generate application key

```
php artisan key:generate
```

Configure database inside `.env`

```
DB_DATABASE=smart_campus
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations

```
php artisan migrate
```

Start backend server

```
php artisan serve
```

Server runs at:

```
http://127.0.0.1:8000
```

---

# Frontend Setup (React)

Open new terminal

```
cd frontend
```

Install dependencies

```
npm install
```

Start development server

```
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# API Authentication

Authentication uses **Laravel Sanctum**.

After login the backend returns a token which is stored in browser localStorage.

Axios automatically attaches the token in requests.

---

# API Endpoints

## Authentication

POST /api/register

POST /api/login

POST /api/logout

---

## Courses

GET /api/courses

POST /api/courses

PUT /api/courses/{id}

DELETE /api/courses/{id}

---

## Enrollment

POST /api/courses/{id}/enroll

GET /api/courses/{id}/students

---

## Attendance

POST /api/attendance/mark

GET /api/attendance/course/{id}

GET /api/attendance/my

---

# Admin Dashboard Statistics

GET /api/admin/stats

Returns

- total courses
- total students
- attendance records
- present
- absent

---

# Default Roles

Admin
- Can manage courses
- Can mark attendance
- Can view statistics

Student
- Can register
- Can view courses
- Can view attendance

---

# Creating an Admin User

Admin users should be created manually.

Run

```
php artisan tinker
```

Then

```
User::create([
'name' => 'Admin',
'email' => 'admin@example.com',
'password' => bcrypt('123456'),
'role' => 'admin'
]);
```

---

# GitHub Upload Guide

## 1 Initialize Git

```
git init
```

## 2 Add Files

```
git add .
```

## 3 Commit

```
git commit -m "Initial commit"
```

## 4 Create GitHub Repository

Go to

https://github.com

Click

New Repository

Name:

```
smart-campus
```

Do NOT initialize with README.

---

## 5 Connect Local Repo to GitHub

Copy repository URL then run

```
git remote add origin https://github.com/YOUR_USERNAME/smart-campus.git
```

---

## 6 Push Project

```
git branch -M main


git push -u origin main
```

Your project will now be on GitHub.

---

# Future Improvements

- Mobile App (Flutter)
- Pagination
- Charts and analytics
- Dark mode
- PDF attendance export
- Email notifications

---

# Author

Muhammad Hamdan

BS Artificial Intelligence

Web Developer / AI Student

---

# License

This project is open source and available for educational purposes.

