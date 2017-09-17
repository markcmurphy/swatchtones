const mongoose = require('mongoose');
const Swatch = require('./swatches.js');

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  skinTone: String,
  favorites: [],
  swatches: [Swatch.schema]
})

const Users = mongoose.model('User, userSchema');

module.exports = Users;
