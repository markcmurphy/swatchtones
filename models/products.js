const mongoose = require('mongoose');
const Swatch = require('./swatches.js');

const productSchema = mongoose.Schema({
  productBrand: String,
  productName: String,
  price: Number,
  imageLink: String,
  productLink: String,
  description: String,
  productType: String,
  productColor: String,
  swatches: [Swatch.schema]
})

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
