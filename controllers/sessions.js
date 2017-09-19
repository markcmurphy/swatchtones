const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const fs = require('fs');
const app = express();
require('dotenv').config();

// authentication
// router.get('/retrieve', function(req, res){ //any route will work
// 	if (req.session.body === ){
//     console.log('worked!');
// 	} else {
//   console.log('did not work :( ');
// 	}
// });
//
// router.get('/update', function(req, res){ //any route will work
// 	req.session.anyProperty = 'changing anyProperty to this value';
// 	console.log(req.session.anyProperty);
// });

router.get('/destroy-route', function(){ //any route will work
	req.session.destroy(function(err){
		if(err){
        console.log(err);
		} else {
      console.log('session destroyed');
		}
	});
});

// router.post('/', function(req, res){
//     User.findOne({ email: req.body.email }, function(err, foundUser){
//         if(req.body.password == foundUser.password){
//             res.send('logged in');
//         } else {
//             res.send('wrong password');
//         }
//     });
// });

// router.post('/signup', passport.authenticate('local-signup', {
//         successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/signup', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));

router.post('/register', (req, res, next) => {
   // hash the password
  const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.email = req.body.email;
  userDbEntry.password = passwordHash;

  User.create(userDbEntry, (err, user) => {
    console.log(user);
    // set up session
    req.session.message  = '';
    req.session.email = user.email;
    req.session.logged   = true;
		res.json(user);
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, foundUser) => {
		console.log(foundUser);
      if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
					req.session.email = req.body.email;
					req.session.currentuser = foundUser;
					req.session.logged = true;

					var token = jwt.sign({data:foundUser}, process.env.JWT_SECRET, {
          expiresIn: 1440
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
					foundUser
					});

        	// res.json(foundUser);
            } else {
              console.log('else in bcrypt compare');
              req.session.message = 'email or password are incorrect';
              res.redirect('/sessions/login')
            }
      } else {
          req.session.message = 'email or password are incorrect';
          res.redirect('/sessions/login')

      }
  });

})

module.exports = router;
