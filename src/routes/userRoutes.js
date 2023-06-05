const express = require('express');
const router = express.Router();
const UserController = require('../../functions/controllers/UserController');

const userController = new UserController();

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Example route for updating user profile
router.put('/profile', userController.updateProfile);

module.exports = router;