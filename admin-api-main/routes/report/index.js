const router = require('express').Router();
const { db } = require('../../config');

router.get('/post', async (req, res) => {
  const reportList = await new Promise((resolve, reject) => {
    db().query(
      `select r.*, p.idx as postIdx, p.title, u.name, u.baptismal from report as r left outer join post as p on p.idx = r.article_idx left outer join user as u on u.id = r.reporter where r.type = 'P' `,
      (e, rows) => {
        if (e) {
          console.log(e);
          reject(e);
        } else resolve(rows);
      }
    );
  });

  res.json({
    success: true,
    reportList,
  });
});

router.delete('/:idx', async (req, res) => {
  const { idx } = req.params;

  const post = await new Promise((resolve, reject) => {
    db().query(`select * from report where idx = ?`, [idx], (e, rows) => {
      resolve(rows[0]);
    });
  });

  if (!post) {
    return res.json({
      success: false,
      message: '존재하지 않는 게시물',
    });
  }

  await new Promise((resolve, reject) => {
    db().query(`delete from report where idx = ?`, [idx], (e, rows) => {
      if (e) {
        console.log(e);
        reject(e);
      } else resolve();
    });
  });

  res.json({
    success: true,
    message: '삭제 성공',
  });
});

router.delete('/post/:idx', async (req, res) => {
  const { idx } = req.params;

  const post = await new Promise((resolve, reject) => {
    db().query(`select * from post where idx = ?`, [idx], (e, rows) => {
      resolve(rows[0]);
    });
  });

  if (!post) {
    return res.json({
      success: false,
      message: '존재하지 않는 게시물',
    });
  }

  await new Promise((resolve, reject) => {
    db().query(`delete from post where idx = ?`, [idx], (e, rows) => {
      if (e) {
        console.log(e);
        reject(e);
      } else resolve();
    });
  });

  res.json({
    success: true,
    message: '삭제 성공',
  });
});

module.exports = router;
