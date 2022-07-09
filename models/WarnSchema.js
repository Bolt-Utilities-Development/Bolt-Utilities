const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
   pass: String,
   userId: String,
   guildId: String,
   reason: String,
   modId: String,
   timestamp: Number
});

module.exports = mongoose.model('warnings', Schema);