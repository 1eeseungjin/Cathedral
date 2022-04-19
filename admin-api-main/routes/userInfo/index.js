const router = require("express").Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
});

module.exports = router;