const mongoose = require('mongoose');
const Product = require('./products.js');

const swatchSchema = mongoose.Schema({
  product: String,
  imageLink: String,
  userSubmitted: String,
  productColor: String,
  skinTone: String
})

const Swatches = mongoose.model('Swatch', swatchSchema);

module.exports = Swatches;
