const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const serverless = require('serverless-http');
const router = express.Router();

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

router.use('/api/users', userRoutes);
router.use('/api/transactions', transactionRoutes);

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);