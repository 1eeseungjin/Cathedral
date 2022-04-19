const router = require('express').Router();
const { db } = require('../../config');

router.get('/', async (req, res) => {
  const prayRoom = await new Promise((resolve, reject) => {
    db().query(
      `select o.*, u.name, u.temple, u.residence from open_prayer as o left outer join admin as u on u.id = o.creator`,
      (e, rows) => {
        if (e) reject(e);
        else resolve(rows);
      }
    );
  });

  return res.json({
    success: true,
    prayRoom,
  });
});

router.post('/delete', async (req, res) => {
  let isDeleted = await new Promise((resolve) => {
    db().query(
      `delete from open_prayer where idx = ?`,
      [req.body.idx],
      (e, rows) => {
        resolve(!e);
      }
    );
  });
  if (isDeleted) {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

router.get('/:idx', async (req, res) => {
  const { idx } = req.params;

  const prayRoom = new Promise((resolve, reject) => {
    db().query(
      `select o.*, u.* from open_prayer as o left outer join admin as u on o.creator = u.id where o.idx = ?`,
      [idx],
      (e, rows) => {
        if (rows[0] === undefined) {
          reject(new Error('존재하지 않는 열린기도방'));
        } else resolve(rows[0]);
      }
    );
  });

  prayRoom
    .then((result) => {
      return res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        message: err.message,
      });
    });
});

router.post('/', async (req, res) => {
  const { type, startDate, startTime, title, content, mysteria } = req.body;
  console.log(mysteria);
  const user = req.user;
  const date = startDate + ' ' + startTime;

  await new Promise((resolve, reject) => {
    db().query(
      `insert into open_prayer (all_day, start_time, title, contents, mysteria, creator) values (?,?,?,?,?,?)`,
      [type, date, title, content, mysteria, user.id],
      (e, rows) => {
        if (e) reject(e);
        else resolve();
      }
    );
  });

  res.json({
    success: true,
    message: '열린기도방 생성',
  });
});

module.exports = router;
