const User = require('../src/models/User');
const jwt = require('jsonwebtoken');
const generateToken = require('../functions/utils/generateToken');

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already registered.' });
      }

      // Create a new user
      const user = await User.create({ name, email, password });

      // Generate a JSON Web Token (JWT)
      const token = generateToken(user);

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Unable to register user.' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Generate a JSON Web Token (JWT)
      const token = generateToken(user);

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Unable to log in.' });
    }
  }

  // Example method for profile management
  async updateProfile(req, res) {
    try {
      const { name, email } = req.body;
      const userId = req.user.id; // Assuming you have implemented authentication middleware

      // Update the user's profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Unable to update profile.' });
    }
  }
}

module.exports = UserController;