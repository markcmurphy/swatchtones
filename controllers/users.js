const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const sessions = require('./sessions.js');
const jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['token'];
  console.log(token);
  console.log(req.body);
  console.log(req.headers.test);
  console.log(req.query);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided!'
    });

  }
});


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
