const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const verifyToken = require('../middleware/authMiddleware');

// Issue Book
router.post('/', verifyToken, (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  if (!bookId) {
    return res.status(400).json({
      message: 'Book ID required'
    });
  }
  db.get(
    `SELECT * FROM books WHERE id = ?`,
    [bookId],
    (err, book) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (!book) {
        return res.status(404).json({
          message: 'Book not found'
        });
      }

      if (book.available_quantity <= 0) {
        return res.status(400).json({
          message: 'Book unavailable'
        });
      }
      db.get(
        `SELECT * FROM book_issues
         WHERE user_id = ?
         AND book_id = ?
         AND status = 'issued'`,
        [userId, bookId],
        (err, issue) => {
          if (issue) {
            return res.status(400).json({
              message: 'Book already borrowed'
            });
          }

          const issueDate = new Date();
          const dueDate = new Date();
          dueDate.setDate(issueDate.getDate() + 7);
          db.run(
            `INSERT INTO book_issues
            (user_id, book_id, issue_date, due_date)
            VALUES (?, ?, ?, ?)`,
            [
              userId,
              bookId,
              issueDate.toISOString(),
              dueDate.toISOString()
            ],
            function (err) {
              if (err) {
                return res.status(500).json({
                  message: err.message
                });
              }

              db.run(
                `UPDATE books
                 SET available_quantity = available_quantity - 1
                 WHERE id = ?`,
                [bookId]
              );
              res.status(201).json({
                message: 'Book issued successfully',
                dueDate
              });
            }
          );
        }
      );
    }
  );
});

// Get User Borrow History
router.get('/history', verifyToken, (req, res) => {
  db.all(
    `SELECT
      bi.id,
      b.title,
      b.author,
      bi.issue_date,
      bi.due_date,
      bi.status
    FROM book_issues bi
    JOIN books b ON bi.book_id = b.id
    WHERE bi.user_id = ?`,
    [req.user.id],
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

// Return Book
router.put('/:id/return', verifyToken, (req, res) => {
  const issueId = req.params.id;

  db.get(
    `SELECT * FROM book_issues WHERE id = ?`,
    [issueId],
    (err, issue) => {
      if (!issue) {
        return res.status(404).json({
          message: 'Issue record not found'
        });
      }

      if (issue.status === 'returned') {
        return res.status(400).json({
          message: 'Book already returned'
        });
    }

      const today = new Date();
      const dueDate = new Date(issue.due_date);

      const lateDays = Math.max(
        0,
        Math.ceil(
          (today - dueDate) /
            (1000 * 60 * 60 * 24)
        )
      );

      const fine = lateDays * 10;

      db.run(
        `INSERT INTO book_returns
        (issue_id, return_date, fine_amount)
        VALUES (?, ?, ?)`,
        [issueId, today.toISOString(), fine]
      );
      db.run(
        `UPDATE book_issues
         SET status = 'returned'
         WHERE id = ?`,
        [issueId]
      );

      db.run(
        `UPDATE books
         SET available_quantity = available_quantity + 1
         WHERE id = ?`,
        [issue.book_id]
      );

      res.json({
        message: 'Book returned successfully',
        fine
      });
    }
  );
});
module.exports = router;