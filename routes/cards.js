var express = require('express');
var router = express.Router();
var common = require('../common/controllers/common');
var card = require('../app/home/controllers/card');
var multipart = require('connect-multiparty')();

//配置
router.get('/config', common.loginRequired, card.getConfig);
router.post('/config', common.loginRequired, multipart, common.uploadImg, card.postConfig);

//


module.exports = router;