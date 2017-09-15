const express = require('express');
const app = express();
const mongoose = require('mongoose');


const productsController = require('./controllers/products.js');
app.use('/products', productsController);

mongoose.connect('mongodb://localhost:27017/swatches');
mongoose.connection.once('open', ()=> {
  console.log('connected to mongoose..');
});
app.listen(3000, ()=> {
  console.log('listening on port 3000');
});
