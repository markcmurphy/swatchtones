const express = require('express');
const router = express.Router();
const Products = require('../models/products.js')

// Index
router.get('/', (req, res)=> {
  Products.find((err, foundProducts)=>{
    res.json(foundProducts);
  });
});

//Create product
router.post('/', (req, res)=>{
  console.log(req.body);
  Products.create(req.body, (err, createdProduct)=>{
    res.json(createdProduct);
  });
});

//Delete product
router.delete('/:id', (req, res)=>{
  Products.findByIdAndRemove(req.params.id, (err, deletedProduct)=>{
    res.json(deletedProduct);
  })
})

//Update product
router.put('/:id', (req, res)=>{
  Products.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProduct)=>{
    res.json(updatedProduct);
  });
});


module.exports = router;
