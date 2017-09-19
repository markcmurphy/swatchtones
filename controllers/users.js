const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/:id', (req,res)=> {
  User.findById(req.params.id, (err, foundUser)=> {
      currentUser = req.session.currentuser,
      user = foundUser
      res.json(foundUser);
    });
  });


router.get('/retrieve', function(req, res){ //any route will work
	if (req.session.body === "body"){
    console.log('worked!');
	} else {
  console.log('did not work :( ');
	}
});

router.post('/', function(req, res){
  console.log('router.post for users works');
    User.create(req.body, function(err, createdUser){
        res.redirect('/');
    });
});

module.exports = router;
