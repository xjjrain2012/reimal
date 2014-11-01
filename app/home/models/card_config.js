var mongoose = require('mongoose');
var CardConfigSchema = require('../schemas/card_config');
var CardConfigModel = mongoose.model('card_config', CardConfigSchema);

module.exports = CardConfigModel;