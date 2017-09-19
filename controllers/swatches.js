const express = require('express');
const router = express.Router();
const Products = require('../models/products.js')
const Swatches = require('../models/swatches.js')
const Vibrant = require('node-vibrant');

// Index
router.get('/', (req, res)=> {
  Swatches.find((err, foundSwatches)=>{
    res.json(foundSwatches);
  });
});

// Get swatch by ID
router.get('/:id', (req, res) => {
  Swatches.findById(req.params.id, (err, foundSwatches) => {
    Products.findOne({
      'swatches._id': req.params.id
    }, (err, foundProduct) => {
      console.log(foundProduct);
      let v = new Vibrant(foundSwatches.imageLink)
      v.getPalette().then((palette) => res.json({
        palette: palette,
        foundSwatches: foundSwatches
      }))
    })
  });
});

//Create Swatch
router.post('/', (req, res) => {
  Products.findById(req.body.productId, (err, foundProducts) => {
    console.log(req.body.productId);
    console.log(foundProducts);
    Swatches.create(req.body, (err, createdSwatch) => {
        res.json(createdSwatch);
        foundProducts.swatches.push(createdSwatch);
        foundProducts.save((err, data) => {
      });
    });
  });
});

//Delete Swatch
router.delete('/:id', (req, res)=>{
  Swatches.findByIdAndRemove(req.params.id, (err, deletedSwatch)=>{
    res.json(deletedSwatch);
  })
})

//Update Swatch
router.put('/:id', (req, res)=>{
  Swatches.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedSwatch)=>{
    res.json(updatedSwatch);
  });
});


module.exports = router;
