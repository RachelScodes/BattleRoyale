'use strict'

let jwt = require('jsonwebtoken');
let express = require('express');
let User = require('../models/user');
// let secret = 'thissecretissofetch'; ///// Remember to pull out and place in our config.js file
let router = express.Router();
let expressjwt = require('express-jwt');
let app = express();
let config = require('../config');
app.set('soSecret', config.secret); // set secret variable

///// the '/' means '/user, see server.js'

///// create (POST http://localhost:3000/user/signup) ////////////////////////////////////////////////////////////////////////
router.post('/signup', function(req, res) { // call once hit submit // test in postman
  console.log("signup route hit");
  console.log(req.body);
  let userObj = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  userObj.save((err, user) => {
    if (err) {
      return res.status(401).send({message: err.errmsg});
    } else {
      return res.status(200).send(user);
    }
  });
})
////////////////////////////////////////////////////////////////////////////////

///// http://localhost:3000/user/authenticate //////////////////////////////////
router.get('/authenticate', function(req, res){
  console.log('hit /authenticate');
  res.send('/ hit /authenticate'); // test in postman
});

///// authentication (POST http://localhost:3000/user/authenticate) ////////////
///// code below allows us to check our user and password and passes back a token
///// in a JSON response. Mongoose is used to find the user and jsonwebtoken to create the token ////
router.post('/authenticate', function(req, res){
  User.findOne({
    name: req.body.name
  }, function(err, user){
    if (err) throw err;

    if(!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      ///// check if password matches
      if (user.password != req.body.password) {
        res.send({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        ///// if user is found and password correct
        let token = jwt.sign(user, app.get('soSecret'), {
          expiresIn: 31557600 //// expires in 1 year - seconds in a year
        });
        ///// return the information including token as json
        res.send({
          succes: true,
          message: 'Enjoy the token!',
          token: token
        });
      }
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///// todo: route middelware to verify tokens


///// show all users (GET http://localhost:3000/user/users) ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// this route also shows the entire user obj, inclusing encrypted passwords!
router.get('/users', function(req, res){ ///// working - no users returns empty array as expected
  User.find({}, function(err, users){
    res.send(users);
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////














module.exports = router;
