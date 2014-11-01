var CardConfigModel = require('../models/card_config');
//配置 
exports.getConfig = function(req, res) {
	
	res.render('home/cards/config', {title: '会员卡设置', card: {}});
};
exports.postConfig = function(req, res) {
	var cardObj = req.body.card;
	//console.log(typeof req.session.user._id);
	cardObj.cid = req.session.user._id;

	if(req.uploadimg) {
		cardObj.bg = req.uploadimg;
	}
	//console.log(!cardObj.id);
	if(!cardObj.id) {
		delete cardObj.id;
		var cardconfig = new CardConfigModel(cardObj);
		console.log('cardconfig.......');
		console.log(cardconfig);

		cardconfig.save(function(err, cc) {
			if(err) console.log(err);
			console.log('cc......');
			console.log(cc);
			res.render('home/cards/config', {
				title: '会员卡设置',
				card: cc
			});
		});
	}

	

	//var card = req.body.card;
	//console.log('card......');
	//console.log(cardObj);
};