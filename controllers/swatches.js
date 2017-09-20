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
      res.json(foundSwatches);
    })
  });
});

//Create Swatch
router.post('/', (req, res) => {
  Products.findById(req.body.productId, (err, foundProducts) => {
    Swatches.create(req.body, (err, createdSwatch) => {
      let v = new Vibrant(createdSwatch.imageLink)
      v.getPalette()
      .then((palette) => {
      createdSwatch.colors.vibrant.push('rgb(' + palette.Vibrant._rgb.join(', ') + ')');
      createdSwatch.colors.lightVibrant.push('rgb(' + palette.LightVibrant._rgb.join(', ') + ')');
      createdSwatch.colors.darkVibrant.push('rgb(' + palette.DarkVibrant._rgb.join(', ') + ')');
      createdSwatch.colors.muted.push('rgb(' + palette.Muted._rgb.join(', ') + ')');
      createdSwatch.colors.lightMuted.push('rgb(' + palette.LightMuted._rgb.join(', ') + ')');
      createdSwatch.colors.darkMuted.push('rgb(' + palette.DarkMuted._rgb.join(', ') + ')');
      console.log(createdSwatch.colors);
      createdSwatch.save((err, data) => {
      });
    })
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
