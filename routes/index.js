var express = require('express');
var router = express.Router();
var index = require('../app/home/controllers/index');
var common = require('../common/controllers/common');
var path = require('path');
var ueditor = require("ueditor");

/* GET home page. */
router.get('/', common.loginRequired, index.index);
router.get('/dashboard', common.loginRequired, index.dashboard);
router.use("/ueditor", ueditor(path.join(__dirname, '..', 'public'), function(req, res, next) {
  // ueditor 客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;
    var img_url = '/uploads/images/ueditor/'+date.getTime()+imgname;
    res.ue_up(img_url); // 执行保存图片 并且返回给客户端信息
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/uploads/images/ueditor/';
    res.ue_list(dir_url)
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/js/plugin/ueditor/ueditor.config.json')}
}));

module.exports = router;
