const router = require("express").Router();
const { db } = require("../../config");

router.get('/prayer/list', async (req, res) => {
    let prayers = await new Promise(resolve => {
        db().query(`select * from prayer;`, (e, rows) => {
            resolve(rows);
        });
    });
    if (prayers) {
        res.json({
            prayers: prayers
        })
    } else {
        res.json({
            prayers: []
        })
    }

});

router.get('/prayer/view/:idx', async (req, res) => {
    let prayer = await new Promise(resolve => {
        db().query(`select * from prayer where idx = ?;`, [req.params.idx], (e, rows) => {
            resolve(rows);
        });
    });
    if (prayer) {
        res.json({
            prayer: prayer
        })
    } else {
        res.json({
            prayer: []
        })
    }

});

router.put('/prayer/update/:idx', (req, res) => {
    db().query(`UPDATE prayer SET contents = ? WHERE idx = ?;`,
        [req.body.contents,
        req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
})

router.get('/prayerText', async (req, res) => {

    let texts = await new Promise(resolve => {
        db().query(`select * from prayer_text`, (e, rows) => {
            resolve(rows);
        });
    });
    if (texts) {
        res.json({
            texts: texts.map((item) => { return item.text })
        })
    } else {
        res.json({
            texts: []
        })
    }

});

router.post('/postText', async (req, res) => {

    let postText = await new Promise(resolve => {
        db().query(`insert into prayer_text set ?`, [{ text: req.body.inputText }], (e, rows) => {
            resolve(!e);
        });
    });
    if (postText) {
        res.json({
            success: true,
        })
    } else {
        res.json({
            success: false,
        })
    }

});

router.post('/postDeletePrayer', async (req, res) => {

    let isDeleted = await new Promise(resolve => {
        db().query(`delete from prayer where idx = ?`, [req.body.idx], (e, rows) => {
            resolve(!e);
        });
    });
    if (isDeleted) {
        res.json({
            success: true,
        })
    } else {
        res.json({
            success: false,
        })
    }

});


router.post('/registration', async (req, res) => {
    let inserted = await new Promise(resolve => {
        db().query(`insert into prayer set ?`, [req.body], (e, rows) => {
            resolve(!e);
        });
    });
    if (inserted) {
        res.json({
            success: true,
        })
    } else {
        res.json({
            success: false,
        })
    }

});

router.post('/update', async (req, res) => {
    let updated = await new Promise(resolve => {
        db().query(`update prayer set ? where idx = ?`, [req.body, req.body.idx], (e, rows) => {
            resolve(!e);
        });
    });
    if (updated) {
        res.json({
            success: true,
        })
    } else {
        res.json({
            success: false,
        })
    }

});

module.exports = router;