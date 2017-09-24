const mongoose = require('mongoose');
const User = require('./users.js');
const Product = require('./products.js');
const Swatch = require('./swatches.js');

const swatchSchema = mongoose.Schema({
  imageLink: String,
  productColor: String,
  skinTone: String,
  colors: {
    vibrant: {rgb: [], isSkin: Boolean},
    lightVibrant: {rgb: [], isSkin: Boolean},
    darkVibrant: {rgb: [], isSkin: Boolean},
    muted: {rgb: [], isSkin: Boolean},
    lightMuted: {rgb: [], isSkin: Boolean},
    darkMuted: {rgb: [], isSkin: Boolean}
    }
});

const Swatches = mongoose.model('Swatch', swatchSchema);

module.exports = Swatches;
