var fs = require('fs');
var path = require('path');
exports.loginRequired = function(req, res, next) {
	if(!req.session.user) {
		return res.redirect('/users/login');
	}
	next();
};

exports.adminRequired = function(req, res, next) {
	var user = req.session.user;
	if(user.role <= 50) {
		return res.redirect('/users/login');
	}
	next();
};
exports.uploadImg = function(req, res, next) {
	var imgData = req.files.uploadImg;
	var imgPath = imgData.path;
	var originalFilename = imgData.originalFilename;

	if(originalFilename) {
		fs.readFile(imgPath, function(err, data) {
			var timestamp = Date.now();
			var type = imgData.type.split('/')[1];
			var img = timestamp + '.' + type;
			var newPath = path.join(__dirname, '../../', '/public/uploads/' + img);

			fs.writeFile(newPath, data, function(err) {
				req.uploadimg = img;
				next();
			});
		});
	} else {
		next();
	}
};