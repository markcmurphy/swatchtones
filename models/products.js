const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productBrand: String,
  productName: String,
  price: Number,
  imageLink: String,
  productLink: String,
  description: String,
  productType: String,
  productColors: []
})

const Products = mongoose.model('Product, productSchema');

module.exports = Products;
