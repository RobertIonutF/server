const Transaction = require('../models/Transaction');

class TransactionController {
  async createTransaction(req, res) {
    try {
      const { amount, category } = req.body;
      const userId = req.user.id; // Assuming you have implemented authentication middleware

      // Create a new transaction
      const transaction = await Transaction.create({
        user: userId,
        amount,
        category,
      });

      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: 'Unable to create transaction.' });
    }
  }

  async getTransactions(req, res) {
    try {
      const userId = req.user.id; // Assuming you have implemented authentication middleware

      // Retrieve all transactions for the authenticated user
      const transactions = await Transaction.find({ user: userId });

      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Unable to retrieve transactions.' });
    }
  }

  async updateTransaction(req, res) {
    try {
      const { amount, category } = req.body;
      const { transactionId } = req.params;

      // Update the transaction
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        { amount, category },
        { new: true }
      );

      res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ message: 'Unable to update transaction.' });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const { transactionId } = req.params;

      // Delete the transaction
      await Transaction.findByIdAndDelete(transactionId);

      res.status(200).json({ message: 'Transaction deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Unable to delete transaction.' });
    }
  }
}

module.exports = TransactionController;