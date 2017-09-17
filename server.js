const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

const productsController = require('./controllers/products.js');
app.use('/products', productsController);

const swatchesController = require('./controllers/swatches.js');
app.use('/swatches', swatchesController);

mongoose.connect('mongodb://localhost:27017/swatches');
mongoose.connection.once('open', ()=> {
  console.log('connected to mongoose..');
});

app.listen(3000, ()=> {
  console.log('listening on port 3000');
});
