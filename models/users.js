const mongoose = require('mongoose');
const Swatch = require('./swatches.js');

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  admin: Boolean,
  skinTone: String,
  favorites: []
})

const Users = mongoose.model('User', userSchema);

module.exports = Users;
