var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORT_FACTOR = 10;
var UserSchema = new Schema({
	email: {
		unique: true,
		type: String
	},
	name: String,
	tel: String,
	password: String,
	role: {
		type: Number,
		default: 0
	},
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

UserSchema.pre('save', function(next) {
	var user = this;
	if(this.isNew) {
		this.meta.createAt = this.updateAt = Date.now();
	} else {
		this.updateAt = Date.now();
	}

	bcrypt.genSalt(SALT_WORT_FACTOR, function(err, salt) {
		if(err) next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) next(err);
			user.password = hash;
			next();
		});

	});

});

UserSchema.statics = {
	fetch: function(cb) {
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findByKey: function(kname, kval, cb, single) {
		var single = single == undefined ? true : single;
		var query = {};
		query['' + kname] = kval;
		return single ? this.findOne(query).exec(cb) : this.find(query).sort('meta.updateAt').exec(cb);
	}
};

UserSchema.methods = {
	comparePwd: function(pwd, cb) {
		bcrypt.compare(pwd, this.password, function(err, isMatch) {
			if(err) cb(err);
			cb(null, isMatch);
		});
	}
};
module.exports = UserSchema;
