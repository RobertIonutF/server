const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const serverless = require('serverless-http');

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Database connection
mongoose
  .connect('mongodb://localhost:27017/finnancetracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
    // Start the server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.use('/.netlify/functions/api', router);  // path must route to lambda
module.exports.handler = serverless(app);