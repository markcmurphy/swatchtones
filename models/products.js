const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productBrand: String,
  productName: String,
  price: Number,
  imageLink: String,
  productLink: String,
  description: String,
  productType: String,
  productColor: String,
  swatches: [ ]
})

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
