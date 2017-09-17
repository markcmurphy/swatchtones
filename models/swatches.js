const mongoose = require('mongoose');
// const User = require('./users.js');
const Product = require('./products.js');

const swatchSchema = mongoose.Schema({
  product: String,
  imageLink: String,
  productColor: String,
  skinTone: String
  // userSubmitted: [User.schema]
})

const Swatches = mongoose.model('Swatch', swatchSchema);

module.exports = Swatches;
