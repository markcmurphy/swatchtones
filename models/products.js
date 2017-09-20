const mongoose = require('mongoose');
const Swatch = require('./swatches.js');

const productSchema = mongoose.Schema({
  brand: String,
  name: String,
  price: Number,
  image_link: String,
  product_link: String,
  description: String,
  product_type: String,
  rating: Number,
  product_colors: [],
  tag_list: [],
  swatches: [Swatch.schema]
})

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
