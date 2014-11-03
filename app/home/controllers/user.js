var User = require('../models/user');
exports.getLogin = function(req, res) {
	res.render('home/login', {title: '登录'});
};
exports.postLogin = function(req, res) {
	var _user = req.body.user;
	var email = _user.email;
	var pwd = _user.password;

	User.findByKey('email', email, function(err, user) {
		if(err) console.log(err);

		if(!user) return res.redirect('/users/register');

		user.comparePwd(pwd, function(err, isMatch) {
			if(err) console.log(err);

			if(isMatch){
				req.session.user = user;
				res.redirect('/');
			} else {
				res.redirect('/users/login')
			}
		});
	})
};
exports.getRegister = function(req, res) {
	res.render('home/register', {title: '注册新账户'});
};
exports.postRegister = function(req, res) {
	var _user = req.body.user;
	User.findByKey('email', _user.email, function(err, user) {
		if(err) console.log(err);

		if(user) {
			res.redirect('/users/login');
		} else {
			var user = new User(_user);
			user.save(function(err, user) {
				if(err) console.log(err);
				if(user) {
					req.session.user = user;
					res.redirect('/');
				} else {
					res.redirect('/users/register');
				}
				
			});
		}
	});
};
exports.logout = function(req, res) {
	delete req.session.user;
	res.redirect('/users/login');
};
exports.del = function(req, res) {
	var id = req.params.id;
	User.remove({_id: id}, function(err) {
		if(err) console.log(err);

		res.redirect(req.get('referrer'));
	});
};
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if(err) console.log(err);

		res.render('home/list', {
			title: '用户列表',
			users: users
		})
	});
};
exports.forgotpwd = function(req, res) {
	res.render('home/forgotpwd', {title: '忘记密码'});
};