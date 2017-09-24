const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const sessions = require('./sessions.js');
const jwt = require('jsonwebtoken');

router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        res.locals.user = req.decoded;
        // res.json(decoded);
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
      // currentUser = req.session.currentuser,
      user = foundUser
      res.json(foundUser);
    });
  });

router.post('/', function(req, res){
  const userId = res.locals.user.data._id;
  console.log(userId);
        User.findOne({_id: userId}).then(function(user){
            res.json(user);
        });
  });

module.exports = router;
