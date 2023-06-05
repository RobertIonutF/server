const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user) {
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
        );
  return token;
}

module.exports = generateToken;