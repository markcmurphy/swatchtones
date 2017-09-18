const express = require('express');
const router = express.Router();
const Products = require('../models/products.js');
const Swatches = require('../models/swatches.js');

// Index
router.get('/', (req, res)=> {
  Products.find((err, foundProducts)=>{
    res.json(foundProducts);
  });
});

// Get product by ID
router.get('/:id', (req, res)=>{
    Products.findById(req.params.id, (err, foundProducts)=>{
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
	Products.findByIdAndRemove(req.params.id, (err, foundProduct)=>{
		const swatchesIds = [];

		for (let i = 0; i < foundProduct.swatches.length; i++) {
			swatchesIds.push(foundProduct.swatches[i]._id);
		}
		Swatches.remove(
			{
				_id : {
					$in: swatchesIds
				}
			},
			(err, data)=>{
        console.log(swatchesIds);
        res.json(foundProduct)
			}
		);
	});
});

//edit product
router.put('/:id', (req, res)=>{
  Products.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProduct)=>{
    res.json(updatedProduct);
  });
});


module.exports = router;
