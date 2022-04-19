const router = require('express').Router();
const { db } = require('../../config');

router.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;

  let userList;
  if (startDate === undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select u.*, r.region_position from user as u left outer join region as r on u.region_idx = r.idx`,
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate !== undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select u.*, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where created_at > ?`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === undefined && endDate !== undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select u.*, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where created_at < ?`,
        [endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === endDate) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select u.*, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where Date(created_at) = ?`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select u.*, r.region_position from user as u left outer join region as r on u.region_idx = r.idx created_at > ? and created_at < ?`,
        [startDate, endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  }

  const banList = await new Promise((resolve, reject) => {
    db().query(
      `select b.*, u.id from ban as b left outer join user as u on u.idx = b.user_idx`,
      (e, rows) => {
        if (e) {
          console.log(e);
          reject(e);
        } else resolve(rows);
      }
    );
  });

  for (let j = 0; j < banList.length; j++) {
    userList = userList.filter((user) => {
      return user.idx !== banList[j].user_idx;
    });
  }

  res.json({
    code: 200,
    userList,
  });
});

router.get('/reports', async (req, res) => {
  const { startDate, endDate } = req.query;

  let userList;
  if (startDate === undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select r.*, u.id, u.name, u.region_idx, u.phone, u.temple, g.region_position from report as r left outer join user as u on r.target = u.id left outer join region as g on g.idx = u.region_idx order by r.idx`,
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate !== undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select r.*, u.id, u.name, u.baptismal, u.phone, u.temple from report as r left outer join user as u on r.target = u.id left outer join region as g on g.idx = u.region_idx where r.created_at > ?  order by r.idx`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === undefined && endDate !== undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select r.*, u.id, u.name, u.baptismal, u.phone, u.temple from report as r left outer join user as u on r.target = u.id left outer join region as g on g.idx = u.region_idx where r.created_at < ?  order by r.idx`,
        [endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === endDate) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select r.*, u.id, u.name, u.baptismal, u.phone, u.temple from report as r left outer join user as u on r.target = u.id left outer join region as g on g.idx = u.region_idx where Date(r.created_at) = ?  order by r.idx`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select r.*, u.id, u.name, u.baptismal, u.phone, u.temple from report as r left outer join user as u on r.target = u.id left outer join region as g on g.idx = u.region_idx where r.created_at > ? and r.created_at < ?  order by r.idx`,
        [startDate, endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  }
  res.json({
    code: 200,
    userList,
  });
});

router.post('/ban', async (req, res) => {
  const { id } = req.query;

  const user = new Promise((resolve, reject) => {
    db().query(`select * from user where id = ?`, [id], (e, rows) => {
      if (rows[0] === this.unlock) {
        reject(new Error('존재하지 않는 유저'));
      } else resolve(rows[0]);
    });
  });

  user
    .then(() => {
      new Promise((resolve) => {
        db().query(
          `insert into ban (user_idx) values(?)`,
          [user.idx],
          (e, rows) => {
            if (e) reject(e);
            else resolve();
          }
        );
      })
        .then(() => {
          return res.json({
            success: true,
            message: '유저 차단 성공',
          });
        })
        .catch((err) => {
          return res.json({
            success: false,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.json({
        success: false,
        message: err.message,
      });
    });
});

router.get('/user', async (req, res) => {
  const { userId } = req.query;

  const user = new Promise((resolve, reject) => {
    db().query(
      `select u.*, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where id = ?`,
      [userId],
      (e, rows) => {
        if (rows[0] === undefined) {
          reject(new Error('존재하지 않는 유저'));
        } else resolve(rows[0]);
      }
    );
  });

  user
    .then((user) => {
      return res.json({
        success: true,
        user,
      });
    })
    .catch((e) => {
      return res.json({
        message: e.message,
      });
    });
});

router.get('/report/:idx', async (req, res) => {
  const { idx } = req.params;

  const report = await new Promise((resolve, reject) => {
    db().query(
      `select r.*, u.name, u.phone, u.email, u.baptismal, u.baptismal_birth, u.temple, u.birth from report as r left outer join user as u on r.target = u.id where r.idx = ?`,
      [idx],
      (e, rows) => {
        if (e) {
          console.log(e);
          reject(e);
        } else resolve(rows[0]);
      }
    );
  });

  res.json({
    success: true,
    report,
  });
});

router.get('/ban', async (req, res) => {
  const { startDate, endDate } = req.query;

  let userList;
  if (startDate === undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select b.*, u.id, u.name, u.phone, u.baptismal, u.temple, u.created_at as user_createdAt, r.region_position from ban as b left outer join user as u on b.user_idx = u.idx left outer join region as r on r.idx = u.region_idx`,
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate !== undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select b.*, u.id, u.name, u.phone, u.baptismal, u.temple, u.created_at as user_createdAt r.region_position from ban as b left outer join user as u on b.user_idx = u.idx left outer join region as r on r.idx = u.region_idx where b.created_at > ?`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === undefined && endDate !== undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select b.*, u.id, u.name, u.phone, u.baptismal, u.temple, u.created_at as user_createdAt, r.region_position from ban as b left outer join user as u on b.user_idx = u.idx left outer join region as r on r.idx = u.region_idx where b.created_at < ?`,
        [endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === endDate) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select b.*, u.id, u.name, u.phone, u.baptismal, u.temple, u.created_at as user_createdAt, r.region_position from ban as b left outer join user as u on b.user_idx = u.idx left outer join region as r on r.idx = u.region_idx where Date(b.created_at) = ?`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select b.*, u.id, u.name, u.phone, u.baptismal, u.temple, u.created_at as user_createdAt from ban as b left outer join user as u on b.user_idx = u.idx where b.created_at > ? and b.created_at < ?`,
        [startDate, endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  }

  res.json({
    success: true,
    userList,
  });
});

router.delete('/ban/:userIdx', async (req, res) => {
  const { userIdx } = req.params;
  console.log(userIdx);

  await new Promise((resolve, reject) => {
    db().query(`delete from ban where idx = ?`, [userIdx], (e, rows) => {
      if (e) {
        console.log(e);
        reject(e);
      } else resolve();
    });
  });

  res.json({
    success: true,
    message: '차단 해지',
  });
});

router.get('/dormancy', async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log(typeof startDate);

  let userList;
  if (startDate === undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select *, datediff(now(), login_at) as period, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where datediff(now(), login_at) >= 30 order by u.idx`,
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate !== undefined && endDate === undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select *, datediff(now(), login_at) as period, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where datediff(now(), login_at) >= 30 and u.created_at > ?  order by u.idx`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === undefined && endDate !== undefined) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select u.*, datediff(now(), login_at) as period, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where datediff(now(), login_at) >= 30 and u.created_at < ? order by u.idx`,
        [endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else if (startDate === endDate) {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select u.*, datediff(now(), login_at) as period, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where datediff(now(), login_at) >= 30 and Date(u.created_at) = ?  order by u.idx`,
        [startDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  } else {
    userList = await new Promise((resolve, reject) => {
      db().query(
        `select *, datediff(now(), login_at) as period, r.region_position from user as u left outer join region as r on u.region_idx = r.idx where datediff(now(), login_at) >= 30 and u.created_at > ? and u.created_at < ?  order by u.idx`,
        [startDate, endDate],
        (e, rows) => {
          if (e) {
            console.log(e);
            reject(e);
          } else resolve(rows);
        }
      );
    });
  }

  res.json({
    success: true,
    userList,
  });
});

router.get('/get/ban/:userIdx', async (req, res) => {
  const { userIdx } = req.params;

  const isBanUser = await new Promise((resolve, reject) => {
    db().query(`select * from ban where user_idx = ?`, [userIdx], (e, rows) => {
      if (e) {
        console.log(e);
        reject(e);
      } else resolve(rows);
    });
  });

  res.json({
    success: true,
    isBanUser,
  });
});

router.get('/get/report/:userId', async (req, res) => {
  const { userId } = req.params;

  const isReportedUser = await new Promise((resolve, reject) => {
    db().query(`select * from report where target = ?`, [userId], (e, rows) => {
      if (e) {
        console.log(e);
        reject(e);
      } else resolve(rows);
    });
  });

  res.json({
    success: true,
    isReportedUser,
  });
});

module.exports = router;
