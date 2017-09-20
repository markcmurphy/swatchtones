const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const Vibrant = require('node-vibrant');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
	  secret: "totaleclipse",
	  resave: false,
	  saveUninitialized: false
}));

const productsController = require('./controllers/products.js');
app.use('/products', productsController);

const swatchesController = require('./controllers/swatches.js');
app.use('/swatches', swatchesController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

// mongoose.connect('mongodb://localhost:27017/swatches');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/makeuplooks';
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=> {
  console.log('connected to mongoose..');
});

app.listen(3000, ()=> {
  console.log('listening on port 3000');
});
