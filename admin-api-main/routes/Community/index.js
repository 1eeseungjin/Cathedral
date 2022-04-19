const router = require("express").Router();
const { db } = require("../../config");

// 공지사항
router.get('/notice/list', (req, res) => {
    db().query(`SELECT * FROM notice ORDER BY idx DESC;`,
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        })
})

router.get('/notice/view/:idx', (req, res) => {
    //db().connect();
    db().query(`SELECT * FROM notice WHERE idx = ?`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        })
    //db().end();
})

router.post('/notice/add', (req, res) => {
    //db().connect();
    db().query(`INSERT INTO notice(title, member_name, contents, created_at)
        VALUES (?, ?, ?, default);`,
        [req.body.contents.title, req.body.contents.member_name, req.body.contents.contents],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.put('/notice/update/:idx', (req, res) => {
    //db().connect();
    db().query(`UPDATE notice SET title = ?, member_name = ?, contents = ? WHERE idx = ?;`,
        [req.body.contents.title, req.body.contents.member_name, req.body.contents.contents,
        req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.delete('/notice/delete/:idx', (req, res) => {
    db().query(`DELETE FROM notice WHERE idx = ?;`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json({ ...results, idx: parseInt(req.params.idx) });
        });
})

// 이벤트
router.get('/event/list', (req, res) => {
    //db().connect();
    db().query(`SELECT * FROM event ORDER BY idx DESC;`,
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        })
    //db().end();
})

router.get('/event/view/:idx', (req, res) => {
    //db().connect();
    db().query(`SELECT * FROM event WHERE idx = ?`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        })
    //db().end();
})

router.post('/event/add', (req, res) => {
    //db().connect();
    db().query(`INSERT INTO event(title, contents, member_name, term_start, term_end, created_at) 
                VALUES (?, ?, ?, ?, ?, default);`,
        [req.body.title, req.body.contents, req.body.member_name,
        req.body.term_start, req.body.term_end],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.put('/event/update/:idx', (req, res) => {
    //db().connect();
    db().query(`UPDATE event SET title = ?, contents = ?, member_name = ?, term_start = ?, term_end = ? 
    WHERE idx = ?;`,
        [req.body.title, req.body.contents, req.body.member_name,
        req.body.term_start, req.body.term_end, req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.delete('/event/delete/:idx', (req, res) => {
    //db().connect();
    db().query(`DELETE FROM event WHERE idx = ?;`, [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json({ ...results, idx: parseInt(req.params.idx) });
        });
    //db().end();
})

// 커뮤니티 게시판
router.get('/post/list', (req, res) => {
    //db().connect();
    db().query(`SELECT p.idx, p.views, p.created_at, p.title, p.contents, p.isBlind, 
    IFNULL(u.name, a.name) AS member_name,
    IFNULL(t.position, p.position) AS position, 
    IFNULL(r.region_position, null) AS parent_position 
    FROM post p 
    LEFT JOIN member m ON p.member_id = m.id 
    LEFT JOIN user u ON m.id = u.id LEFT JOIN admin a ON m.id = a.id
    LEFT JOIN temple t ON p.position = t.position
    LEFT JOIN region r ON t.region_idx = r.idx
    ORDER BY idx DESC;`,
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.get('/post/view/:idx', (req, res) => {
    //db().connect();
    db().query(`SELECT p.idx, p.views, p.created_at, p.member_id, p.title, p.contents, p.isBlind,
    IFNULL(u.name, a.name) AS member_name,
    IFNULL(t.position, p.position) AS position, 
    IFNULL(r.region_position, null) AS parent_position
    FROM post p LEFT JOIN member m ON p.member_id = m.id 
    LEFT JOIN user u ON m.id = u.id 
    LEFT JOIN admin a ON m.id = a.id 
    LEFT JOIN temple t ON p.position = t.position
    LEFT JOIN region r ON t.region_idx = r.idx
    WHERE p.idx = ?`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results[0]);
        })
    //db().end();
})

router.get('/post/position/:idx', (req, res) => {
    //db().connect();
    db().query(`SELECT position FROM post WHERE idx = ?;`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.post('/post/add', (req, res) => {
    db().query(`INSERT INTO post(member_id, title, contents, position, isBlind, created_at) 
                VALUES (?, ?, ?, ?, ?, default);`,
        [req.body.member_id, req.body.title, req.body.contents, req.body.position, req.body.isBlind],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
})

router.put('/post/update/:idx', (req, res) => {
    //db().connect();
    db().query(`UPDATE post SET title = ?, contents = ? WHERE idx = ?;`,
        [req.body.title, req.body.contents, req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.delete('/post/delete/:idx', (req, res) => {
    //db().connect();
    db().query(`DELETE FROM post WHERE idx = ?;`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json({ ...results, idx: parseInt(req.params.idx) });
        });
    //db().end();
})

// 댓글, 대댓글 조회
router.get('/comment/view/:idx', (req, res) => {
    //db().connect();
    db().query(`SELECT c.idx, u.name, u.profile_img, u.baptismal, c.contents 
    FROM comments c 
    LEFT JOIN member m ON c.member_id = m.id 
    LEFT JOIN user u ON m.id = u.id WHERE post_idx = ? ORDER BY c.idx ASC;`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

router.get('/recomment/view/:idx', (req, res) => {
    //db().connect();
    db().query(`SELECT r.idx, r.created_at, r.contents, u.name, u.baptismal, u.profile_img 
    FROM recomments r 
    LEFT JOIN member m ON r.member_id = m.id 
    LEFT JOIN user u ON m.id = u.id WHERE r.comments_idx = ? ORDER BY r.idx ASC;`,
        [req.params.idx],
        function (error, results, fields) {
            if (error) console.log(error);
            res.json(results);
        });
    //db().end();
})

module.exports = router;