var CardConfigModel = require('../models/card_config');
var _ = require('underscore');
var hasCardConfig = false;
//配置 
exports.getConfig = function(req, res) {
	var user = req.session.user;
	
	CardConfigModel.findByKey('cid', user._id, function(err, cardconfig) {
		if(err) console.log(err);

		
		hasCardConfig = cardconfig ? true : false;
		res.render('home/cards/config', {title: '会员卡设置', card: cardconfig});
	});
	
};
exports.postConfig = function(req, res) {
	var cardObj = req.body.card;
	var user = req.session.user;
	
	cardObj.cid = req.session.user._id;
	if(req.uploadimg) {
		cardObj.bg = req.uploadimg;
	}

	CardConfigModel.findByKey('cid', user._id, function(err, cardconfig) {
		if(err) console.log(err);

		if(cardconfig) {
			
			CardConfigModel.findOneAndUpdate({_id: cardconfig._id}, {$set: cardObj}, {upsert: true, new: true}, function(err, doc) {
				if(err) console.log(err);
				

				res.render('home/cards/config', {
					title: '会员卡设置',
					card: doc
				});
			});
		} else {
			var cardconfig = new CardConfigModel(cardObj);

			cardconfig.save(function(err, cc) {
				if(err) console.log(err);
				res.render('home/cards/config', {
					title: '会员卡设置',
					card: cc
				});
			});
		}
		
		
	});

	
};