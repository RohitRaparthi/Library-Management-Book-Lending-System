const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// Add Book (Admin + Librarian)
router.post(
  '/',
  verifyToken,
  checkRole('admin', 'librarian'),
  (req, res) => {
    const {
      title,
      author,
      category,
      isbn,
      quantity
    } = req.body;
    if (!title || !author || !quantity) {
      return res.status(400).json({
        message: 'Required fields missing'
      });
    }

    db.run(
      `INSERT INTO books
      (title, author, category, isbn, quantity, available_quantity)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        author,
        category,
        isbn,
        quantity,
        quantity
      ],
      function (err) {
        if (err) {
          return res.status(500).json({
            message: err.message
          });
        }

        res.status(201).json({
          message: 'Book added successfully'
        });
      }
    );
  }
);

// Get All Books
router.get('/', verifyToken, (req, res) => {
  const search = req.query.search || '';
  db.all(
    `SELECT * FROM books
     WHERE title LIKE ?
     OR author LIKE ?
     OR category LIKE ?`,
    [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    ],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      res.json(rows);
    }
  );
});

// Update Book
router.put(
  '/:id',
  verifyToken,
  checkRole('admin', 'librarian'),
  (req, res) => {
    const { title, author, category, isbn, quantity } = req.body;

    db.run(
      `UPDATE books
      SET title=?, author=?, category=?, isbn=?, quantity=?
      WHERE id=?`,
      [
        title,
        author,
        category,
        isbn,
        quantity,
        req.params.id
      ],
      function (err) {
        if (err) {
          return res.status(500).json({
            message: err.message
          });
        }

        res.json({
          message: 'Book updated'
        });
      }
    );
  }
);

// Delete Book
router.delete(
  '/:id',
  verifyToken,
  checkRole('admin'),
  (req, res) => {
    db.run(
      `DELETE FROM books WHERE id=?`,
      [req.params.id],
      function (err) {
        if (err) {
          return res.status(500).json({
            message: err.message
          });
        }

        res.json({
          message: 'Book deleted'
        });
      }
    );
  }
);

module.exports = router;