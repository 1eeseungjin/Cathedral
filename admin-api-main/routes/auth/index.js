const router = require('express').Router();
const dayjs = require('dayjs');
const { db } = require('../../config');
const tokenLib = require('../../lib/token');

router.post('/login/user', async (req, res) => {
  const { id, pw } = req.body;

  const member = await new Promise((resolve, reject) => {
    db().query(
      `select * from member where id = ? and pw = ?`,
      [id, pw],
      (e, rows) => {
        if (e) {
          console.log(e);
          reject(e);
        } else resolve(rows[0]);
      }
    );
  });

  if (member === undefined) {
    return res.json({
      success: false,
      message: '존재하지 않는 유저',
    });
  }

  const isUser = await new Promise((resolve, reject) => {
    db().query(`select * from user where id = ?`, [member.id], (e, rows) => {
      if (e) {
        console.log(e);
        reject(e);
      } else resolve([rows[0]]);
    });
  });

  if (isUser === undefined) {
    return res.json({
      success: false,
      message: '유저가 아닙니다',
    });
  }

  const token = tokenLib.createToken(isUser.id);

  const result = await new Promise((resolve, reject) => {
    const now = dayjs()
    db().query('UPDATE user SET login_at = ? WHERE id = ?', [now.format('YYYY-MM-DD HH:mm:ss'), member.id], (e,rows) => {
      if (e) {
        console.log(e)
        reject(res.json({
          success: false,
          message: '로그인 실패',
        }))
      } else {
        resolve(res.json({
          success: true,
          message: '로그인 성공',
          token,
        }))
      }
    })
  })

  return result
});

router.post('/login/admin', async (req, res) => {
  const { id, pw } = req.body;

  const member = await new Promise((resolve, reject) => {
    db().query(
      `select * from member where id = ? and pw = ?`,
      [id, pw],
      (e, rows) => {
        if (e) {
          console.log(e);
          reject(e);
        } else resolve(rows[0]);
      }
    );
  });

  if (member === undefined) {
    return res.json({
      success: false,
      message: '존재하지 않는 유저',
    });
  }

  const isAdmin = await new Promise((resolve, reject) => {
    db().query(`select * from admin where id = ?`, [member.id], (e, rows) => {
      if (e) {
        console.log(e);
        reject(e);
      } else resolve(rows[0]);
    });
  });

  if (isAdmin === undefined) {
    return res.json({
      success: false,
      message: '관리자가 아닙니다',
    });
  }

  const token = tokenLib.createToken(isAdmin.id);

  return res.json({
    success: true,
    message: '로그인 성공',
    token,
  });
});

module.exports = router;
