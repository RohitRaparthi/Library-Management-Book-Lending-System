const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

router.get(
  '/summary',
  verifyToken,
  checkRole('admin', 'librarian'),
  (req, res) => {
    const summary = {};

    db.get(
      `SELECT COUNT(*) as totalBooks FROM books`,
      (err, books) => {
        summary.totalBooks = books.totalBooks;

        db.get(
          `SELECT COUNT(*) as issuedBooks
          FROM book_issues
          WHERE status='issued'`,
          (err, issued) => {
            summary.issuedBooks = issued.issuedBooks;

            db.get(
              `SELECT COUNT(*) as totalUsers
               FROM users`,
              (err, users) => {
                summary.totalUsers = users.totalUsers;

                db.get(
                  `SELECT SUM(fine_amount) as totalFine
                   FROM book_returns`,
                  (err, fine) => {
                    summary.totalFine =
                      fine.totalFine || 0;

                    res.json(summary);
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);

module.exports = router;