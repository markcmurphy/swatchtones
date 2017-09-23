const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
require('dotenv').config();

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})




router.get('/destroy-route', function(){ //any route will work
	req.session.destroy(function(err){
		if(err){
        console.log(err);
		} else {
      console.log('session destroyed');
		}
	});
});

router.post('/register', (req, res, next) => {
  const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.email = req.body.email;
  userDbEntry.password = passwordHash;

  User.create(userDbEntry, (err, user) => {
    console.log(user);
    // req.session.message  = '';
    // req.session.email = user.email;
    // req.session.logged = true;
		res.json(user);
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, foundUser) => {
		// console.log(foundUser);
    // console.log(req.body.email);
      if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
              console.log(foundUser);
              // console.log(req.session);
              // console.log(req.user);
					foundUser.email = req.body.email;

					// req.session.currentuser = foundUser;
					// req.session.logged = true;
					// console.log(req.session);

					var token = jwt.sign({data:foundUser}, process.env.JWT_SECRET, {
          expiresIn: Math.floor(new Date().getTime()/1000) + 7*24*60*60
        });
				// console.log("token:" + token);
        // res.json({
        //   success: true,
        //   message: 'Enjoy your token!',
        //   token: token,
				// 	foundUser: foundUser
				// 	});

        	// res.json(foundUser);
            }
            // else {
            //   console.log('else in bcrypt compare');
            //   req.session.message = 'email or password are incorrect';
            //   res.redirect('/sessions/login')
            // }
      }
      // else {
      //     req.session.message = 'email or password are incorrect';
      //     res.redirect('/sessions/login')
      //
      // }
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
