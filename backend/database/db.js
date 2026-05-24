const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./database/library.db');

const initDB = () => {
  db.serialize(async () => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        category TEXT,
        isbn TEXT UNIQUE,
        quantity INTEGER,
        available_quantity INTEGER
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS book_issues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        book_id INTEGER,
        issue_date TEXT,
        due_date TEXT,
        status TEXT DEFAULT 'issued'
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS book_returns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        issue_id INTEGER,
        return_date TEXT,
        fine_amount REAL DEFAULT 0
      )
    `);

    const hashedPassword = await bcrypt.hash('password123', 10);

    db.run(
      `INSERT OR IGNORE INTO users (id, name, email, password, role)
       VALUES (1,'Admin','admin@test.com', ?, 'admin')`,
      [hashedPassword]
    );

    db.run(
      `INSERT OR IGNORE INTO users (id, name, email, password, role)
       VALUES (2,'Librarian','librarian@test.com', ?, 'librarian')`,
      [hashedPassword]
    );
    db.run(
      `INSERT OR IGNORE INTO users (id, name, email, password, role)
       VALUES (3,'Student','student@test.com', ?, 'student')`,
      [hashedPassword]
    );
  });
};

module.exports = initDB;
module.exports.db = db;