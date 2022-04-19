require('dotenv').config();

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.createToken = (id) => {
  const payload = {
    id,
  };

  const option = {
    expiresIn: '7d',
    issuer: 'rosary',
    subject: process.env.JWT_SUBJECT,
  };

  return jwt.sign(payload, JWT_SECRET, option);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
