const router = require('express').Router();
const { db } = require('../../config');

router.get('/', async (req, res) => {
  const smallprayroom = await new Promise((resolve, reject) => {
    db().query(
      `select s.*, u.name, u.temple, r.region_position from small_prayer as s left outer join user as u on u.id = s.creator left outer join region as r on s.region_idx = r.idx`,
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
    smallprayroom,
  });
});

router.post('/delete', async (req, res) => {
  let isDeleted = await new Promise((resolve) => {
    db().query(
      `delete from small_prayer where idx = ?`,
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

module.exports = router;
