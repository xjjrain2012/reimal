exports.index = exports.dashboard = function(req, res) {
	res.render('home/dashboard', {
		title: '仪表盘',
		name: 'jinjing.xia'
	})
}