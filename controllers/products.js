const express = require('express');
const router = express.Router();
const Products = require('../models/products.js')

router.get('/', (req, res)=> {
  Products.find((err, foundProducts)=>{
    res.json(foundProducts);
  });
});

module.exports = router;
