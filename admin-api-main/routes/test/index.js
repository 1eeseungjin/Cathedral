const router = require("express").Router();
const { db } = require("../../config");

router.get('/helloworld', (req, res) => {
    res.json({
        test : 'helloworld'
    })
});

module.exports = router;