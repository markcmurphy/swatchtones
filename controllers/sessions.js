const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
require('dotenv').config();

router.post('/register', (req, res, next) => {
  const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.email = req.body.email;
  userDbEntry.password = passwordHash;

  User.create(userDbEntry, (err, user) => {
    console.log(user);
		res.json(user);
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, foundUser) => {
      if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
              console.log(foundUser);
					foundUser.email = req.body.email;

					var token = jwt.sign({data:foundUser}, process.env.JWT_SECRET, {
          expiresIn: Math.floor(new Date().getTime()/1000) + 7*24*60*60
        });
				console.log("token:" + token);
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
					foundUser: foundUser
					});
            }
      }
  });
})

router.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

module.exports = router;
