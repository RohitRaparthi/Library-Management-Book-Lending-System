const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const initDB = require('./database/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

initDB();

app.get('/', (req, res) => {
  res.send('Library API Running');
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/issues', require('./routes/issueRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});