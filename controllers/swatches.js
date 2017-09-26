const express = require('express');
const router = express.Router();
const Products = require('../models/products.js')
const Swatches = require('../models/swatches.js')
const Vibrant = require('node-vibrant');
const isSkin = require('skintone');
const algorithmia = require("algorithmia");
const client = algorithmia("simuAhpRuawq4VrJSo1bqsp+gMd1");

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
  const skinvalue = {};
  Products.findById(req.body.productId, (err, foundProducts) => {
    Swatches.create(req.body, (err, createdSwatch) => {
      let v = new Vibrant(createdSwatch.imageLink)
      console.log('1 ' + createdSwatch);
      v.getPalette()
      .then((palette) => {
      createdSwatch.colors.vibrant.rgb.push('rgb(' + palette.Vibrant._rgb.join(', ') + ')');
      createdSwatch.colors.vibrant.isSkin = isSkin(palette.Vibrant._rgb[0],palette.Vibrant._rgb[1],palette.Vibrant._rgb[2]);
      createdSwatch.colors.lightVibrant.rgb.push('rgb(' + palette.LightVibrant._rgb.join(', ') + ')');
      createdSwatch.colors.lightVibrant.isSkin = isSkin(palette.Vibrant._rgb[0],palette.Vibrant._rgb[1],palette.Vibrant._rgb[2]);
      createdSwatch.colors.darkVibrant.rgb.push('rgb(' + palette.DarkVibrant._rgb.join(', ') + ')');
      createdSwatch.colors.darkVibrant.isSkin = isSkin(palette.Vibrant._rgb[0],palette.Vibrant._rgb[1],palette.Vibrant._rgb[2]);
      createdSwatch.colors.muted.rgb.push('rgb(' + palette.Muted._rgb.join(', ') + ')');
      createdSwatch.colors.muted.isSkin = isSkin(palette.Vibrant._rgb[0],palette.Vibrant._rgb[1],palette.Vibrant._rgb[2]);
      createdSwatch.colors.lightMuted.rgb.push('rgb(' + palette.LightMuted._rgb.join(', ') + ')');
      createdSwatch.colors.lightMuted.isSkin = isSkin(palette.Vibrant._rgb[0],palette.Vibrant._rgb[1],palette.Vibrant._rgb[2]);
      createdSwatch.colors.darkMuted.rgb.push('rgb(' + palette.DarkMuted._rgb.join(', ') + ')');
      createdSwatch.colors.darkMuted.isSkin = isSkin(palette.Vibrant._rgb[0],palette.Vibrant._rgb[1],palette.Vibrant._rgb[2]);
      console.log('2 ' + createdSwatch);
      createdSwatch.save((err, data) => {
      });
      foundProducts.swatches.push(createdSwatch);
      foundProducts.save((err, data) => {
    });
    })
    console.log('3 ' + createdSwatch);


      res.json(createdSwatch);
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
