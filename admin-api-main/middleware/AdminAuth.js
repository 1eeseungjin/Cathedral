require('dotenv').config();

const { db } = require('../config');
const tokenLib = require('../lib/token');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.json({
      success: false,
      message: '토큰이 없습니다',
    });
  }

  try {
    const decoded = tokenLib.verifyToken(token);

    if (decoded.sub !== process.env.JWT_SUBJECT) {
      return res.json({
        success: false,
        message: '잘못된 토큰입니다',
      });
    }

    const user = await new Promise((resolve, reject) => {
      db().query(`select * from admin where id = ?`, [decoded.id], (e, rows) => {
        if (e) {
          console.log(e);
          reject(e);
        } else resolve(rows[0]);
      });
    });

    req.user = user;
    return next();
  } catch (e) {
    console.log(e);
  }
};
