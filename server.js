const express = require('express');
const app = express();


const productsController = require('./controllers/products.js');
app.use('/products', productsController);

app.listen(3000, ()=> {
  console.log('listening on port 3000');
});
