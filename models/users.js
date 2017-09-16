const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  skintone: String,
  favorites: [],
  swatches: []  
})

const Users = mongoose.model('User, userSchema');

module.exports = Users;
