# 📚 Library Management & Book Lending System

A full-stack Library Management System built using **ReactJS, Node.js, Express.js, and SQLite**.

This application helps libraries manage books, borrowing, returns, overdue tracking, and user roles efficiently.

---

# 🚀 Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Role-based Access Control

## User Roles

### Student
- View available books
- Search books
- Borrow books
- Return books
- View borrow history

### Librarian
- Add books
- Edit books
- View dashboard analytics
- Manage issued books

### Admin
- Full access
- Delete books
- View analytics dashboard
- Manage library operations

---

# 📖 Features Included

✅ Book Catalog Management  
✅ Search Books (Title, Author, Category)  
✅ Book Issue System  
✅ Book Return System  
✅ Fine Calculation for Late Returns  
✅ Borrow History Tracking  
✅ Availability Status Tracking  
✅ Role-Based Authentication  
✅ Dashboard Analytics  
✅ Protected Routes  
✅ Responsive Bootstrap UI  
✅ SQLite Database Persistence

---

# 🛠️ Tech Stack

## Frontend
- ReactJS
- Bootstrap 5
- Axios
- React Router DOM
- React Toastify

## Backend
- Node.js
- Express.js
- SQLite3
- JWT Authentication
- bcryptjs
- dotenv
- cors

## Database
- SQLite

---

# 📂 Project Structure

```txt
library-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPO_LINK
cd library-management-system
```

---

## 2. Backend Setup

Open terminal:

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 3. Frontend Setup

Open new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# 🔐 Environment Variables

Create `.env` inside backend folder:

```env
PORT=5000
JWT_SECRET=librarysecret123
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Books

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/books` | Add Book |
| GET | `/api/books` | Get All Books |
| PUT | `/api/books/:id` | Update Book |
| DELETE | `/api/books/:id` | Delete Book |

---

## Book Issues

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/issues` | Borrow Book |
| PUT | `/api/issues/:id/return` | Return Book |
| GET | `/api/issues/history` | Borrow History |

---

## Dashboard

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/dashboard/summary` | Analytics Summary |

---

# 👤 Demo Credentials

## Admin

```txt
Email: admin@test.com
Password: password123
```

## Librarian

```txt
Email: librarian@test.com
Password: password123
```

## Student

```txt
Email: student@test.com
Password: password123
```

---

# 🧾 Business Rules

- Duplicate book borrowing is not allowed.
- Books cannot be issued if unavailable.
- Late return generates a fine of ₹10/day.
- SQLite database is the source of truth.
- Role-based access is implemented.

---


# 🔗 Live Demo

Frontend:

```txt
PASTE_FRONTEND_LINK
```

Backend:

```txt
PASTE_BACKEND_LINK
```

---

# 👨‍💻 Author

**Rohit Raparthi**

📧 [rohit.raparthi2003@gmail.com](mailto:rohit.raparthi2003@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/rohit-raparthi/) / [GitHub](https://github.com/RohitRaparthi/)