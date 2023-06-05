const express = require('express');
const router = express.Router();
const TransactionController = require('../../functions/controllers/TransactionController');
const authMiddleware = require('../middleware/authMiddleware.js');

const transactionController = new TransactionController();

// Create a new transaction
router.post('/', authMiddleware, transactionController.createTransaction);

// Get all transactions for the authenticated user
router.get('/', authMiddleware, transactionController.getTransactions);

// Update a transaction
router.put('/:transactionId', authMiddleware, transactionController.updateTransaction);

// Delete a transaction
router.delete('/:transactionId', authMiddleware, transactionController.deleteTransaction);

module.exports = router;