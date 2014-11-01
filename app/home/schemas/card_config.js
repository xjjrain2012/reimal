var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CardConfig = new Schema({
	cid: String,
	verify: Boolean,
	name: String,
	bg: String,
	pname: String,
	plink: String,
	salutation: String,
	des: String,
	enables: Array,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});
CardConfig.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}
	next();
});
CardConfig.statics = {
	findByKey: function(kname, kval, cb, single) {
		var single = single == undefined ? true : single;
		var query = {};
		query['' + kname] = kval;
		return single ? this.findOne(query).exec(cb) : this.find(query).sort('meta.updateAt').exec(cb);
	}
}

module.exports = CardConfig;


