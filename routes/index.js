var express = require('express');
var router = express.Router();
var index = require('../app/home/controllers/index');
var common = require('../common/controllers/common');

/* GET home page. */
router.get('/', common.loginRequired, index.index);
router.get('/dashboard', common.loginRequired, index.dashboard);

module.exports = router;
