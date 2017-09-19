const mongoose = require('mongoose');
const User = require('./users.js');
const Product = require('./products.js');
const Swatch = require('./swatches.js');

const swatchSchema = mongoose.Schema({
  imageLink: String,
  productColor: String,
  skinTone: String
})

const Swatches = mongoose.model('Swatch', swatchSchema);

module.exports = Swatches;
