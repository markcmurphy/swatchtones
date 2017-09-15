const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: String,
  image: String
})

const Products = mongoose.model('Product, productSchema');

module.exports = Products;
