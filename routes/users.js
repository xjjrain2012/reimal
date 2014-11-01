var express = require('express');
var router = express.Router();
var user = require('../app/home/controllers/user');
var common = require('../common/controllers/common');


/* GET users listing. */
router.get('/login', user.getLogin);
router.post('/login', user.postLogin);
router.get('/register', user.getRegister);
router.post('/register', user.postRegister);
router.get('/logout', common.loginRequired, user.logout);
router.get('/del/:id', common.loginRequired, common.adminRequired, user.del);
router.get('/list', common.loginRequired, common.adminRequired, user.list);
router.get('/forgotpwd', user.forgotpwd);


module.exports = router;
