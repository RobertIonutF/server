const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Middleware
app.use(express.json());

// Database connection
mongoose
  .connect('mongodb://localhost:27017/finnancetracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
    // Start the server
    if (process.env.NODE_ENV !== 'production') {
      app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    }
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;