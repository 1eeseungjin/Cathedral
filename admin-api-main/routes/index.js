const router = require('express').Router();
const userMiddleware = require('../middleware/UserAuth');
const adminMiddleware = require('../middleware/AdminAuth');

router.use('/test', require('./test'));
router.use('/adminManage', require('./AdminManage'));
router.use('/manage', adminMiddleware, require('./UserManage'));
router.use('/userInfo', adminMiddleware, require('./userInfo'));
router.use('/auth', require('./auth'));
router.use('/stats', require('./stats'));
router.use('/community', require('./community'));
router.use('/general', require('./general'));
router.use('/report', adminMiddleware, require('./report'));
router.use('/smallprayroom', require('./smallPrayRoom'));
router.use('/prayroom', adminMiddleware, require('./prayroom'));

module.exports = router;
