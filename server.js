const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const Vibrant = require('node-vibrant');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

const productsController = require('./controllers/products.js');
app.use('/products', productsController);

const swatchesController = require('./controllers/swatches.js');
app.use('/swatches', swatchesController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/makeuplooks';
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connected to Mongo')
})

app.listen(PORT, () => {
  console.log('listening..')
})
